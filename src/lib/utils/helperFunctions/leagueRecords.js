import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueTeamManagers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { records } from '$lib/stores';
import { getManagers, getTeamData, round, sortHighAndLow } from './universalFunctions';
import { Records } from '$lib/utils/dataClasses';
import { getBrackets } from './leagueBrackets';
import { browser } from '$app/environment';

/**
 * getLeagueRecords obtains all the record for a league since it was first created
 * @param {bool} refresh if set to false, getLeagueRecords returns the records stored in localStorage
 * @returns {Object} { allTimeBiggestBlowouts, allTimeClosestMatchups, leastSeasonLongPoints, mostSeasonLongPoints, leagueWeekLows, leagueWeekHighs, seasonWeekRecords, leagueManagerRecords, currentTeams, currentYear, lastYear}
 */
export const getLeagueRecords = async (refresh = false) => {
	// records temporarily cached for an individual session
	if(get(records).leagueWeekHighs) {
		return get(records);
	}

	// if this isn't a refresh data call, check if there are already
	// transactions stored in localStorage (long term)
	if(!refresh && browser) {
		let localRecords = await JSON.parse(localStorage.getItem("records"));
		// check if transactions have been saved to localStorage before
		if(localRecords && localRecords.playoffData) {
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
	
	// currentTeams is a placeholder that will eventually
	// hold the most recent season's manager info. This is used
	// on the front end to tie old team names to the current one,
	// so that it's easier to track the continuity of records
	let currentTeams;

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

		// on first run, week is provided above from nflState,
		// after that get the final week of regular season from leagueData
		if(leagueData.status == 'complete' || week > leagueData.settings.playoff_week_start - 1) {
			week = 99; // set it high
		}

		// regular season data
		const {
			originalManagers,
			season,
			year,
			rS
		} = await processRegularSeason({leagueData, users, rosters, curSeason, week, regularSeason})

		regularSeason = rS; // update the regular season record

		// post season data
		const pS = await processPlayoffs({year, originalManagers, curSeason, week, playoffRecords})

		if(pS) {
			playoffRecords = pS; // update the regular season records
		}

		lastYear = year;
		if(!currentTeams) {
			currentTeams = originalManagers;
		}

		if(!currentYear && year) {
			currentYear = year;
		}

		curSeason = season;
	}

	playoffRecords.currentYear = regularSeason.currentYear;
	playoffRecords.lastYear = regularSeason.lastYear;
	playoffRecords.currentTeams = regularSeason.currentTeams;

	regularSeason.finalizeAllTimeRecords({currentTeams, currentYear, lastYear});
	playoffRecords.finalizeAllTimeRecords({currentTeams, currentYear, lastYear});
	
	const regularSeasonData = regularSeason.returnRecords()
	const playoffData = playoffRecords.returnRecords()

	const recordsData = {regularSeasonData, playoffData};

    if(browser) {
        // update localStorage
        localStorage.setItem("records", JSON.stringify(recordsData));
    
        records.update(() => recordsData);
    }

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
 * @returns {Object} { interSeasonEntry, season: (curSeason), year, originalManagers, matchupDifferentials, lRR: (leagueManagerRecords), mSLP: (seasonLongPoints), lWR: (leagueWeekRecords)}
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
		const {sPR, r, mD, sW} =  processMatchups({rosters, matchupWeek, originalManagers, seasonPointsRecord, record: regularSeason, startWeek, matchupDifferentials, year})
		seasonPointsRecord = sPR;
		regularSeason = r;
		matchupDifferentials = mD;
		startWeek = sW;
	}

	// sort matchup differentials
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
    // team name and logo are tied to the ownerID
    const ownerID = roster.owner_id;

    const managers = getManagers(roster);

    originalManagers[ownerID] = getTeamData(users, ownerID);

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
		team: originalManagers[ownerID],
		year,
	}

	// update the roster records for this roster ID
	regularSeason.updateManagerRecord(managers, rosterRecords)

	// add season long points entry
	regularSeason.addSeasonLongPoints({
		managers,
		fpts: fptsFor,
		fptsPerGame,
		year,
		team: originalManagers[ownerID]
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
 * @param {Object[]} matchupData.rosters the rosters in the league
 * @param {Object[]} matchupData.matchupWeek the week being analyzed
 * @param {Object} matchupData.originalManagers
 * @param {Object[]} matchupData.seasonPointsRecord
 * @param {Records} matchupData.regularSeason
 * @param {int} matchupData.startWeek
 * @param {Object[]} matchupData.matchupDifferentials
 * @param {int} matchupData.year
 * @returns {any}
 */
const processMatchups = ({rosters, matchupWeek, originalManagers, seasonPointsRecord, record, startWeek, matchupDifferentials, year}) => {
	let matchups = {};

	// only used when building post season record
	let pSD = {};

	for(const matchup of matchupWeek) {
        // exit if there's no roster ID
        const rosterID = matchup.roster_id;
        if(!rosterID) continue;

        const roster = rosters.find(r => r.roster_id = rosterID);

        // team name and logo are tied to the ownerID
        const ownerID = roster.owner_id;
        const managers = getManagers(roster);

        let mID = matchup.matchup_id;

        if(!mID) {
            for(const managerID of managers) {
                if(!pSD[managerID]) {
                    pSD[managerID] = {
                        wins: 0,
                        losses: 0,
                        ties: 0,
                        fptsFor: 0,
                        fptsAgainst: 0,
                        potentialPoints: 0,
                        fptspg: 0,
                        pOGames: 0,
                        byes: 0,
                        team: originalManagers[ownerID],
                    }
                }
                pSD[managerID].pOGames = 1;
                const m = matchup.m;
                if(!m) {
                    pSD[managerID].byes = 1;
                    continue;
                }
                mID = `PS:${m}`
            }
        
            const entry = {
                team: originalManagers[ownerID],
                fpts: matchup.points,
                week: startWeek,
                year,
                managers
            }

            // add each entry to the matchup object
            if(!matchups[mID]) {
                matchups[mID] = [];
            }
            matchups[mID].push(entry);
            if(managerID == ownerID) {
                // only use the owner ID for single week scoring record
                const ownerEntry = {...entry};
                ownerEntry.managerID = ownerID;
                record.addLeagueWeekRecord(ownerEntry);
                seasonPointsRecord.push(ownerEntry);
            }
        }
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
				team: home.team,
				fpts: home.fpts,
				managerIDs: home.managers,
			},
			away: {
				team: away.team,
				fpts: away.fpts,
				managerIDs: away.managers,
			},
			differential: home.fpts - away.fpts
		}
		matchupDifferentials.push(matchupDifferential);

		// handle post-season data
		if(matchupKey.split(":")[0] == "PS") {
            for(const managerID of home.managers) {
                pSD[managerID].wins = 1;
                pSD[managerID].fptsFor = home.fpts;
                pSD[managerID].fptsAgainst = away.fpts;
            }
            for(const managerID of away.managers) {
                pSD[managerID].losses = 1;
                pSD[managerID].fptsFor = away.fpts;
                pSD[managerID].fptsAgainst = home.fpts;
            }
		}
	}

	return {
		sPR: seasonPointsRecord,
		r: record,
		mD: matchupDifferentials,
		sW: startWeek,
		pSD
	}
}

const processPlayoffs = async ({originalManagers, curSeason, playoffRecords, year, week}) => {
	const {
        playoffsStart,
        playoffRounds,
        champs,
    } = await getBrackets(curSeason);

	if(week <= playoffsStart || !year) {
		return null;
	}

	let seasonPointsRecord = [];
	let matchupDifferentials = [];
	let postSeasonData = {};

	// process all the championship matches
	const champBracket = digestBracket({bracket: champs.bracket, playoffsStart, matchupDifferentials, postSeasonData, playoffRecords, playoffRounds, consolation: false, seasonPointsRecord, originalManagers, year});

	postSeasonData = champBracket.postSeasonData;
	seasonPointsRecord = champBracket.seasonPointsRecord;
	playoffRecords = champBracket.playoffRecords;
	matchupDifferentials = champBracket.matchupDifferentials;

	// process all the consolation matches
	const consolationBracket = digestBracket({bracket: champs.consolations, playoffsStart, matchupDifferentials, postSeasonData, playoffRecords, playoffRounds, consolation: true, seasonPointsRecord, originalManagers, year});

	postSeasonData = consolationBracket.postSeasonData;
	seasonPointsRecord = consolationBracket.seasonPointsRecord;
	playoffRecords = consolationBracket.playoffRecords;
	matchupDifferentials = consolationBracket.matchupDifferentials;

	for(const managerID in postSeasonData) {
		// update the roster records for this roster ID
		const pSD = postSeasonData[managerID];
		const fptsPerGame = round(pSD.fptsFor / (pSD.wins + pSD.losses + pSD.ties));
		pSD.fptsPerGame = fptsPerGame;
		pSD.year = year;

		playoffRecords.updateManagerRecord([managerID], pSD);

		// add season long points entry
		playoffRecords.addSeasonLongPoints({
			managers: [managerID],
			fpts: pSD.fptsFor,
			fptsPerGame,
			year,
			team: originalManagers[managerID]
		})
	}

	// sort matchup differentials
	const [biggestBlowouts, closestMatchups] = sortHighAndLow(matchupDifferentials, 'differential')

	// sort season point records
	const [seasonPointsHighs, seasonPointsLows] = sortHighAndLow(seasonPointsRecord, 'fpts')

	// add matchupDifferentials to the all time records
	playoffRecords.addAllTimeMatchupDifferentials(matchupDifferentials);


	if(seasonPointsHighs.length > 0) {
		playoffRecords.addSeasonWeekRecord({
			year,
			biggestBlowouts,
			closestMatchups,
			seasonPointsLows,
			seasonPointsHighs,
		});
	}
	
	return playoffRecords;
}

const digestBracket = ({bracket, playoffRecords, playoffRounds, matchupDifferentials, postSeasonData, consolation, seasonPointsRecord, playoffsStart, originalManagers, year}) => {
	for(let i = 0; i < bracket.length; i++) {
		const startWeek = getStartWeek(i + (playoffRounds - bracket.length), playoffRounds, consolation, playoffsStart);
		const matchupWeek = [];

		for(let matchups of bracket[i]) {
			if(consolation) {
				// consolation matchups are nested within an additional array, we need to flatten them before proceeding
				matchups = matchups.flat();
			}
			for(const matchup of matchups) {
				if(matchup.r) {
					const newMatchup = {...matchup}
					let points = 0;
					for(const k in newMatchup.points) {
						points += newMatchup.points[k].reduce((t, nV) => t + nV, 0);
					}
					newMatchup.points = points;
					matchupWeek.push(newMatchup);
				}
			}
		}
		const {sPR, r, mD, pSD} =  processMatchups({matchupWeek, originalManagers, seasonPointsRecord, record: playoffRecords, startWeek, matchupDifferentials, year})

		postSeasonData = meshPostSeasonData(postSeasonData, pSD);

		postSeasonData = meshPostSeasonData(postSeasonData, pSD);
		seasonPointsRecord = sPR;
		playoffRecords = r;
		matchupDifferentials = mD;
	}

	return {postSeasonData, seasonPointsRecord, playoffRecords, matchupDifferentials}
}

const meshPostSeasonData = (postSeasonData, pSD) => {
	for(const key in pSD) {
		if(!postSeasonData[key]) {
			postSeasonData[key] = pSD[key];
			continue;
		}
		for(const k in pSD[key]) {
			if(k == 'manager') continue;
			postSeasonData[key][k] += pSD[key][k];
		}
	}

	return postSeasonData;
}

const getStartWeek = (i, playoffRounds, consolation, playoffsStart) => {
	if (consolation) {
		return `(C) Week ${playoffsStart + i}`;
	}

	switch (playoffRounds - i) {
		case 1:
			return "Finals";
		case 2:
			return "Semi-Finals"
		case 3:
			return "Quarter-Finals"
	
		default:
			return "Qualifiers";
	}
}