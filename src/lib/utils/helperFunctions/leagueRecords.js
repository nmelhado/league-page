import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueUsers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {records} from '$lib/stores';
import { round } from './universalFunctions';

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
		if(localRecords.leagueWeekHighs) {
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

	let leagueRosterRecords = {}; // every full season stat point (for each year and all years combined)
	let seasonWeekRecords = []; // highest weekly points within a single season
	let leagueWeekRecords = []; // keeps track of weekly points within a single season
	let seasonLongPoints = []; // keeps track of season long points
	let allTimeMatchupDifferentials = []; // the difference in scores for every matchup (for all years combined)

	// loop through each season until the previous_league_id becomes null (or in some cases 0)
	while(curSeason && curSeason != 0) {
		const {
			originalManagers,
			season,
			year,
			interSeasonEntry,
			matchupDifferentials,
			lRR,
			mSLP
		} = await processRegularSeason({curSeason, week, leagueRosterRecords, seasonLongPoints, leagueWeekRecords})

		leagueRosterRecords = lRR
		seasonLongPoints = mSLP

		lastYear = year;
		if(!currentManagers) {
			currentManagers = originalManagers;
		}

		allTimeMatchupDifferentials = allTimeMatchupDifferentials.concat(matchupDifferentials);

		if(interSeasonEntry.seasonPointsRecords.length > 0) {
			if(!currentYear) {
				currentYear = year;
			}
			seasonWeekRecords.push(interSeasonEntry)
		};

		curSeason = season;
	}

	// sort allTimeMatchupDifferentials and return the biggest blowouts and narrowest victories
	const [allTimeBiggestBlowouts, allTimeClosestMatchups] = sortHighAndLow(allTimeMatchupDifferentials, 'differential')

	// sort leagueWeekRecords and return the highest weekly scores and lowest weekly scores
	const [leagueWeekHighs, leagueWeekLows] = sortHighAndLow(leagueWeekRecords, 'fpts')

	// sort seasonLongPoints and return the highest season-long scores and lowest season-long scores
	const [mostSeasonLongPoints, leastSeasonLongPoints] = sortHighAndLow(seasonLongPoints, 'fptsPerGame')

	const recordsData = {
		allTimeBiggestBlowouts,
		allTimeClosestMatchups,
		leastSeasonLongPoints,
		mostSeasonLongPoints,
		leagueWeekLows,
		leagueWeekHighs,
		seasonWeekRecords,
		leagueRosterRecords,
		currentManagers,
		currentYear,
		lastYear
	};

	// update localStorage
	localStorage.setItem("records", JSON.stringify(recordsData));

	records.update(() => recordsData);

	return recordsData;
}

/**
 * takes an array and array field, sorts the array, and returns
 * the 10 highest and lowest members of the array in desc and asc order respectively
 * @param {Object[]} arr the array to be sorted
 * @param {string} field the field to sort on
 * @returns {arr|arr} [high, low] an array where the first element is the 10 highest records and the second is the 10 lowest elements
 */
const sortHighAndLow = (arr, field) => {
	const sorted = arr.sort((a, b) => b[field] - a[field]);
	const high = sorted.slice(0, 10);
	const low = sorted.slice(-10).reverse();
	return [high, low]
}

/**
 * processes a regular season by calling Sleeper APIs to get the data fro a season and turn
 * it into league records (both season records and all-time records)
 * @param {Object} regularSeason an object with the function arguments needed to process a regular season
 * @param {string} regularSeason.curSeason the league ID of the current season
 * @param {int} regularSeason.week the week to start analyzing (most recently completed week)
 * @param {Object} regularSeason.leagueRosterRecords the global record of league roster records (will be updated and returned in this function)
 * @param {Object[]} regularSeason.seasonLongPoints the global array of season-long records
 * @param {any} regularSeason.leagueWeekRecords the global array of single week records
 * @returns {Object} { interSeasonEntry, season: (curSeason), year, originalManagers, matchupDifferentials, lRR: (leagueRosterRecords), mSLP: (seasonLongPoints), lWR: (leagueWeekRecords)}
 */
const processRegularSeason = async ({curSeason, week, leagueRosterRecords, seasonLongPoints, leagueWeekRecords}) => {
	const [rosterRes, users, leagueData] = await waitForAll(
		getLeagueRosters(curSeason),
		getLeagueUsers(curSeason),
		getLeagueData(curSeason),
	).catch((err) => { console.error(err); });

	let year = parseInt(leagueData.season);

	// on first run, week is provided above from nflState,
	// after that get the final week of regular season from leagueData
	if(leagueData.status == 'complete' || week > leagueData.settings.playoff_week_start - 1) {
		week = leagueData.settings.playoff_week_start - 1;
	}

	const rosters = rosterRes.rosters;

	let originalManagers = {};

	for(const roster of rosters) {
		const {lRR, mSLP, oM} = analyzeRosters({year, roster, users, leagueRosterRecords, seasonLongPoints, originalManagers})
		leagueRosterRecords = lRR;
		seasonLongPoints = mSLP;
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
		const {sPR, lWR, mD, sW} =  processMatchups({matchupWeek, originalManagers, seasonPointsRecord, leagueWeekRecords, startWeek, matchupDifferentials, year})
		seasonPointsRecord = sPR;
		leagueWeekRecords = lWR;
		matchupDifferentials = mD;
		startWeek = sW;
	}

	matchupDifferentials = matchupDifferentials.sort((a, b) => b.differential - a.differential);
	const biggestBlowouts = matchupDifferentials.slice(0, 10);

	const closestMatchups = matchupDifferentials.slice(-10).reverse();

	// sort season point records
	const [seasonPointsRecords, seasonPointsLows] = sortHighAndLow(seasonLongPoints, 'fpts')

	const interSeasonEntry = {
		year,
		biggestBlowouts,
		closestMatchups,
		seasonPointsLows,
		seasonPointsRecords,
	}

	return {
		interSeasonEntry,
		season: curSeason,
		year,
		originalManagers,
		matchupDifferentials,
		lRR: leagueRosterRecords,
		mSLP: seasonLongPoints,
		lWR: leagueWeekRecords
	}
}


/**
 * Analyzes an individual roster and adds entries for that roster's
 * individual records as well as updating the league season long points.
 * @param {Object} rosterData the roster data to be analyzed
 * @param {int} rosterData.year the year being analyzed
 * @param {Object} rosterData.roster the roster being analyzed
 * @param {Object[]} rosterData.users all users for that season
 * @param {Object[]} rosterData.leagueRosterRecords the global leagueRosterRecords object that will be updated and returned
 * @param {Object[]} rosterData.seasonLongPoints the global seasonLongPoints object that will be updated and returned
 * @param {Object} rosterData.originalManagers the originalManagers object for that season
 * @returns {Object} {lRR: leagueRosterRecords, mSLP: seasonLongPoints, oM: originalManagers}
 */
const analyzeRosters = ({year, roster, users, leagueRosterRecords, seasonLongPoints, originalManagers}) => {
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

	if(roster.settings.wins == 0 && roster.settings.ties == 0 && roster.settings.losses == 0) return {lRR: leagueRosterRecords, mSLP: seasonLongPoints, oM: originalManagers};

	if(!leagueRosterRecords[rosterID]) {
		leagueRosterRecords[rosterID] = {
			wins: 0,
			losses: 0,
			ties: 0,
			fptsFor: 0,
			fptsAgainst: 0,
			potentialPoints: 0,
			years: []
		}
	}

	const fpts = roster.settings.fpts + (roster.settings.fpts_decimal / 100);
	const fptsAgainst = roster.settings.fpts_against + (roster.settings.fpts_against_decimal / 100);
	const fptsPerGame = fpts / (roster.settings.wins + roster.settings.losses + roster.settings.ties);
	const potentialPoints = roster.settings.ppts + (roster.settings.ppts_decimal / 100);

	// add records to league roster record record
	leagueRosterRecords[rosterID].wins += roster.settings.wins;
	leagueRosterRecords[rosterID].losses += roster.settings.losses;
	leagueRosterRecords[rosterID].ties += roster.settings.ties;
	leagueRosterRecords[rosterID].fptsFor += fpts;
	leagueRosterRecords[rosterID].fptsAgainst += fptsAgainst;
	leagueRosterRecords[rosterID].potentialPoints += potentialPoints;

	// add singleSeason info [`${year}fptsFor`]
	const singleYearInfo = {
		wins: roster.settings.wins,
		losses: roster.settings.losses,
		ties: roster.settings.ties,
		fpts,
		fptsAgainst,
		fptsPerGame,
		potentialPoints,
		manager: originalManagers[rosterID],
		year
	}

	leagueRosterRecords[rosterID].years.push(singleYearInfo);

	seasonLongPoints.push({
		rosterID,
		fpts,
		fptsPerGame: round(fptsPerGame),
		year,
		manager: originalManagers[rosterID]
	})

	return {
		lRR: leagueRosterRecords,
		mSLP: seasonLongPoints,
		oM: originalManagers
	}
}

/**
 * Processes the matchups for a given week of a season. Calculates weekly points,
 * differentials, and adds the points to the season-long points
 * @param {Object} matchupData the data needed to process a matchup
 * @param {any} matchupData.matchupWeek the week being analyzed
 * @param {any} matchupData.originalManagers
 * @param {any} matchupData.seasonPointsRecord
 * @param {any} matchupData.leagueWeekRecords
 * @param {any} matchupData.startWeek
 * @param {any} matchupData.matchupDifferentials
 * @param {any} matchupData.year
 * @returns {any}
 */
const  processMatchups = ({matchupWeek, originalManagers, seasonPointsRecord, leagueWeekRecords, startWeek, matchupDifferentials, year}) => {
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
		leagueWeekRecords.push(entry);
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
		lWR: leagueWeekRecords,
		mD: matchupDifferentials,
		sW: startWeek
	}
}
