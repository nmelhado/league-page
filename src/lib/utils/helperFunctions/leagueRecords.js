import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueUsers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {records} from '$lib/stores';
import { round, sortHighAndLow } from './universalFunctions';
import { Records } from '$lib/utils/dataClasses';

/**
 * getLeagueRecords obtains all the record for a league since it was first created
 * @param {bool} refresh if set to false, getLeagueRecords returns the records stored in localStorage
 * @returns {Object} { allTimeBiggestBlowouts, allTimeClosestMatchups, leastSeasonLongPoints, mostSeasonLongPoints, leagueWeekLows, leagueWeekHighs, seasonWeekRecords, leagueRosterRecords, currentManagers, currentYear, lastYear}
 */
export const getLeagueRecords = async (refresh = false) => {
	// records temporarily cached for an individual session
	if(get(records).leagueWeekHighs) {
		return get(records);
	}

	// if this isn't a refresh data call, check if there are already
	// transactions stored in localStorage (long term)
	if(!refresh) {
		let localRecords = await JSON.parse(localStorage.getItem("records"));
		// check if transactions have been saved to localStorage before
		if(localRecords && localRecords.leagueWeekHighs) {
			localRecords.stale = true;
			return localRecords;
		}
	}

	// get info about the current NFL season (week and season type)
	const nflState = await getNflState().catch((err) => { console.error(err); });
	let week = 0;
	if(nflState.season_type == 'regular') {
		week = nflState.week - 1;
	} else if(nflState.season_type == 'post') {
		week = 18;
	}

	// initiate current season to be your current
	// league page leagueID
	let curSeason = leagueID;
	
	// currentManagers is a placeholder that will eventually
	// hold the most recent season's manager info. This is used
	// on the front end to tie old team names to the current one,
	// so that it's easier to track the continuity of records
	let currentManagers;

	// currentYear will eventually be assigned as the most recent year
	// that has record information (current season if past week 1,
	// previous season if not)
	let currentYear;

	// lastYear gets updated as it loops through each season, so that
	// it will eventually be set to the last year that records exist
	let lastYear;

	// regularSeason is a Records class that stores all the data
	// necessary to display regular season records
	let regularSeason = new Records();

	// playoffRecords is a Records class that stores all the data
	// necessary to display playoff records
	let playoffRecords = new Records();

	// loop through each season until the previous_league_id becomes null (or in some cases 0)
	while(curSeason && curSeason != 0) {
		const [rosterRes, users, leagueData] = await waitForAll(
			getLeagueRosters(curSeason),
			getLeagueUsers(curSeason),
			getLeagueData(curSeason),
		).catch((err) => { console.error(err); });

		const rosters = rosterRes.rosters;

		const {
			originalManagers,
			season,
			year,
			rS
		} = await processRegularSeason({leagueData, users, rosters, curSeason, week, regularSeason})

		regularSeason = rS; // update the regular season records

		lastYear = year;
		if(!currentManagers) {
			currentManagers = originalManagers;
		}

		if(!currentYear && year) {
			currentYear = year;
		}

		curSeason = season;
	}

	regularSeason.finalizeAllTimeRecords({currentManagers, currentYear, lastYear});
	
	const recordsData = regularSeason.returnRecords()
	// update localStorage
	localStorage.setItem("records", JSON.stringify(recordsData));

	records.update(() => recordsData);

	return recordsData;
}

/**
 * processes a regular season by calling Sleeper APIs to get the data fro a season and turn
 * it into league records (both season records and all-time records)
 * @param {Object} regularSeasonInfo an object with the function arguments needed to process a regular season
 * @param {Object[]} regularSeasonInfo.rosters the rosters of the league that year
 * @param {Object} regularSeasonInfo.leagueData the basic info for the league that season
 * @param {Object[]} regularSeasonInfo.users the users in the league that season (the managers)
 * @param {string} regularSeasonInfo.curSeason the league ID of the current season
 * @param {int} regularSeasonInfo.week the week to start analyzing (most recently completed week)
 * @param {Records} regularSeasonInfo.regularSeason the global regularSeason record object
 * @returns {Object} { interSeasonEntry, season: (curSeason), year, originalManagers, matchupDifferentials, lRR: (leagueRosterRecords), mSLP: (seasonLongPoints), lWR: (leagueWeekRecords)}
 */
const processRegularSeason = async ({rosters, leagueData, users, curSeason, week, regularSeason}) => {
	let year = parseInt(leagueData.season);

	// on first run, week is provided above from nflState,
	// after that get the final week of regular season from leagueData
	if(leagueData.status == 'complete' || week > leagueData.settings.playoff_week_start - 1) {
		week = leagueData.settings.playoff_week_start - 1;
	}

	let originalManagers = {};

	for(const roster of rosters) {
		const {oM, rS} = analyzeRosters({year, roster, users, regularSeason, originalManagers})
		regularSeason = rS;
		originalManagers = oM;
	}

	// loop through each week of the season
	const matchupsPromises = [];
	let startWeek = parseInt(week);
	while(week > 0) {
		matchupsPromises.push(fetch(`https://api.sleeper.app/v1/league/${curSeason}/matchups/${week}`, {compress: true}))
		week--;
	}

	const matchupsRes = await waitForAll(...matchupsPromises).catch((err) => { console.error(err); });

	// convert the json matchup responses
	const matchupsJsonPromises = [];
	for(const matchupRes of matchupsRes) {
		const data = matchupRes.json();
		matchupsJsonPromises.push(data)
		if (!matchupRes.ok) {
			throw new Error(data);
		}
	}
	const matchupsData = await waitForAll(...matchupsJsonPromises).catch((err) => { console.error(err); });

	// now that we've used the current season ID for everything we need, set it to the previous season
	curSeason = leagueData.previous_league_id;

	let seasonPointsRecord = [];
	let matchupDifferentials = [];
	
	// process all the matchups
	for(const matchupWeek of matchupsData) {
		const {sPR, rS, mD, sW} =  processMatchups({matchupWeek, originalManagers, seasonPointsRecord, regularSeason, startWeek, matchupDifferentials, year})
		seasonPointsRecord = sPR;
		regularSeason = rS;
		matchupDifferentials = mD;
		startWeek = sW;
	}

	// sort season point records
	const [biggestBlowouts, closestMatchups] = sortHighAndLow(matchupDifferentials, 'differential')

	// sort season point records
	const [seasonPointsHighs, seasonPointsLows] = sortHighAndLow(seasonPointsRecord, 'fpts')

	// add matchupDifferentials to tha all time  records
	regularSeason.addAllTimeMatchupDifferentials(matchupDifferentials);


	if(seasonPointsHighs.length > 0) {
		regularSeason.addSeasonWeekRecord({
			year,
			biggestBlowouts,
			closestMatchups,
			seasonPointsLows,
			seasonPointsHighs,
		});
	} else {
		year = null;
	}

	return {
		season: curSeason,
		year,
		originalManagers,
		rS: regularSeason
	}
}


/**
 * Analyzes an individual roster and adds entries for that roster's
 * individual records as well as updating the league season long points.
 * @param {Object} rosterData the roster data to be analyzed
 * @param {int} rosterData.year the year being analyzed
 * @param {Object} rosterData.roster the roster being analyzed
 * @param {Object[]} rosterData.users all users for that season
 * @param {Records} rosterData.regularSeason the global regularSeason object that will be updated and returned
 * @param {Object} rosterData.originalManagers the originalManagers object for that season
 * @returns {Object} {rS: RegularSeason, oM: originalManagers}
 */
const analyzeRosters = ({year, roster, users, regularSeason, originalManagers}) => {
	const rosterID = roster.roster_id;
	const user = users[roster.owner_id];

	if(user) {
		originalManagers[rosterID] = {
			avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
			name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
		}
	} else {
		originalManagers[rosterID] = {
			avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
			name: 'Unknown Manager',
		}
	}

	// season hasn't started, no records to obtain
	if(roster.settings.wins == 0 && roster.settings.ties == 0 && roster.settings.losses == 0) return {rS: regularSeason, oM: originalManagers};

	// fptsFor and fptsPerGame are used for both rosterRecords and seasonLongPoints
	const fptsFor = roster.settings.fpts + (roster.settings.fpts_decimal / 100);
	const fptsPerGame = round(fptsFor / (roster.settings.wins + roster.settings.losses + roster.settings.ties))

	const rosterRecords = {
		wins:  roster.settings.wins,
		losses:  roster.settings.losses,
		ties:  roster.settings.ties,
		fptsFor,
		fptsAgainst:  roster.settings.fpts_against + (roster.settings.fpts_against_decimal / 100),
		fptsPerGame,
		potentialPoints:  roster.settings.ppts + (roster.settings.ppts_decimal / 100),
		manager: originalManagers[rosterID],
		year,
	}

	// update the roster records for this roster ID
	regularSeason.updateRosterRecord(rosterID, rosterRecords)

	// add season long points entry
	regularSeason.addSeasonLongPoints({
		rosterID,
		fpts: fptsFor,
		fptsPerGame,
		year,
		manager: originalManagers[rosterID]
	})

	return {
		rS: regularSeason,
		oM: originalManagers
	}
}

/**
 * Processes the matchups for a given week of a season. Calculates weekly points,
 * differentials, and adds the points to the season-long points
 * @param {Object} matchupData the data needed to process a matchup
 * @param {Object[]} matchupData.matchupWeek the week being analyzed
 * @param {Object} matchupData.originalManagers
 * @param {Object[]} matchupData.seasonPointsRecord
 * @param {Records} matchupData.regularSeason
 * @param {int} matchupData.startWeek
 * @param {Object[]} matchupData.matchupDifferentials
 * @param {int} matchupData.year
 * @returns {any}
 */
const processMatchups = ({matchupWeek, originalManagers, seasonPointsRecord, regularSeason, startWeek, matchupDifferentials, year}) => {
	let matchups = {};
	for(const matchup of matchupWeek) {
		const entry = {
			manager: originalManagers[matchup.roster_id],
			fpts: matchup.points,
			week: startWeek,
			year,
			rosterID: matchup.roster_id
		}
		seasonPointsRecord.push(entry);
		regularSeason.addLeagueWeekRecord(entry);
		// add each entry to the matchup object
		if(!matchups[matchup.matchup_id]) {
			matchups[matchup.matchup_id] = [];
		}
		matchups[matchup.matchup_id].push(entry);

	}
	startWeek--;

	// create matchup differentials from matchups obj
	for(const matchupKey in matchups) {
		const matchup = matchups[matchupKey];
		let home = matchup[0];
		let away = matchup[1];
		if(matchup[0].fpts < matchup[1].fpts) {
			home = matchup[1];
			away = matchup[0];
		}
		const matchupDifferential = {
			year: home.year,
			week: home.week,
			home: {
				manager: home.manager,
				fpts: home.fpts,
				rosterID: home.rosterID,
			},
			away: {
				manager: away.manager,
				fpts: away.fpts,
				rosterID: away.rosterID,
			},
			differential: home.fpts - away.fpts
		}
		matchupDifferentials.push(matchupDifferential);
	}

	return {
		sPR: seasonPointsRecord,
		rS: regularSeason,
		mD: matchupDifferentials,
		sW: startWeek
	}
}

const getPlayoffLength = (playoffType, numPOTeams) => {
	let playoffLength = 3;

	if(numPOTeams == 4) {
		return playoffLength--;
	}
	
	if(playoffType == 1) {
		return playoffLength++;
	}
	
	if(playoffType == 2) {
		return playoffLength *= 2;
	}

	return playoffLength
}

const processPlayoffMatchups = (matchups, playoffLength, playoffType) => {
	// process all the matchups
	for(const matchupWeek of matchups) {
		const {sPR, rS, mD, sW} =  processMatchups({matchupWeek, originalManagers, seasonPointsRecord, regularSeason, startWeek, matchupDifferentials, year})
		seasonPointsRecord = sPR;
		regularSeason = rS;
		matchupDifferentials = mD;
		startWeek = sW;
	}

}

const processPlayoffs = async ({originalManagers, rosters, leagueData, users, curSeason, week, regularSeason}) => {
	let year = parseInt(leagueData.season);

	// variables for playoff records
	let numPOTeams = parseInt(leagueData.settings.playoff_teams);
	let playoffStart = parseInt(leagueData.settings.playoff_week_start);
	let playoffType;
	let playoffCase;	   // for determining relevant (ie. PO bracket) matches

	// before 2020, 1 week/round was only option; in 2020, 2 weeks/rounds added; in 2021, 1 week/round + 2 champ
	if(year > 2019) {
		playoffType = parseInt(leagueData.settings.playoff_round_type);
	} else {
		playoffType = 0;
	}

	if(year == 2020) {
		if(playoffType == 1) playoffType++;
	}

	const playoffLength = getPlayoffLength(playoffType, numPOTeams)

	const POrecordsWeek = playoffStart + playoffLength - 1;

	for(const roster of rosters) {
		if(!playoffRosterRecords[recordManID]) {
			playoffRosterRecords[recordManID] = {
				wins: 0,
				losses: 0,
				ties: 0,
				fptsFor: 0,
				fptsAgainst: 0,
				potentialPoints: 0,
				fptspg: 0,
				POgames: 0,
				manager: originalManagers[recordManID],
				years: {},
				recordManID,
			}
		}

		playoffRosterRecords[recordManID].years[year] = {
			wins: 0,
			losses: 0,
			ties: 0,
			fpts: 0,
			fptsAgainst: 0,
			potentialPoints: 0,
			fptspg: 0,
			POgames: 0,
			manager: originalManagers[recordManID],
			year,
			recordManID,
		}
	}

	const POmatchupsPromises = [];
	let POstartWeek = parseInt(POrecordsWeek);

	while(POrecordsWeek > playoffStart - 1) {
		POmatchupsPromises.push(fetch(`https://api.sleeper.app/v1/league/${curSeason}/matchups/${POrecordsWeek}`, {compress: true}))
		POrecordsWeek--;
	}

	const POmatchupsRes = await waitForAll(...POmatchupsPromises).catch((err) => { console.error(err); });

	const POmatchupsJsonPromises = [];
	for(const POmatchupRes of POmatchupsRes) {
		const POdata = POmatchupRes.json();
		POmatchupsJsonPromises.push(POdata)
		if (!POmatchupRes.ok) {
			throw new Error(POdata);
		}
	}
	const POmatchupsData = await waitForAll(...POmatchupsJsonPromises).catch((err) => { console.error(err); });
	
	// process all the matchups
	for(const matchupWeek of POmatchupsData) {
		const {sPR, rS, mD, sW} =  processMatchups({matchupWeek, originalManagers, seasonPointsRecord, regularSeason, startWeek, matchupDifferentials, year})
		seasonPointsRecord = sPR;
		regularSeason = rS;
		matchupDifferentials = mD;
		startWeek = sW;
	}

}
