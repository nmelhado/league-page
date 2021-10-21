import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueUsers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {records} from '$lib/stores';
import { round } from './universalFunctions';

export const getLeagueRecords = async (refresh = false) => {
	if(get(records).seasonWeekRecords) {
		return get(records);
	}

	// if this isn't a refresh data call, check if there are already transactions stored in localStorage
	if(!refresh) {
		let localRecords = await JSON.parse(localStorage.getItem("records"));
		// check if transactions have been saved to localStorage before
		if(localRecords) {
			localRecords.stale = true;
			return localRecords;
		}
	}

	const nflState = await getNflState().catch((err) => { console.error(err); });
	let week = 0;
	if(nflState.season_type == 'regular') {
		week = nflState.week - 1;
	} else if(nflState.season_type == 'post') {
		week = 18;
	}

	let curSeason = leagueID;
	
	let currentManagers;

	let currentYear;
	let lastYear;

	let allTimeMatchupDifferentials = [];

	let leagueRosterRecords = {}; // every full season stat point (for each year and all years combined)
	let seasonWeekRecords = []; // highest weekly points within a single season
	let leagueWeekRecords = []; // highest weekly points within a single season
	let mostSeasonLongPoints = []; // 10 highest full season points
	let allTimeBiggestBlowouts = []; // 10 biggest blowouts
	let allTimeClosestMatchups = []; // 10 closest matchups

	while(curSeason && curSeason != 0) {
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

		lastYear = year;
	
		const rosters = rosterRes.rosters;
	
		const originalManagers = {};
	
		for(const roster of rosters) {
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

			if(roster.settings.wins == 0 && roster.settings.ties == 0 && roster.settings.losses == 0) continue;

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

			mostSeasonLongPoints.push({
				rosterID,
				fpts,
				fptsPerGame: round(fptsPerGame),
				year,
				manager: originalManagers[rosterID]
			})
		}
		
		if(!currentManagers) {
			currentManagers = originalManagers;
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

		const seasonPointsRecord = [];
		let matchupDifferentials = [];
		
		// process all the matchups
		for(const matchupWeek of matchupsData) {
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
				allTimeMatchupDifferentials.push(matchupDifferential);
				matchupDifferentials.push(matchupDifferential);
			}
		}

		matchupDifferentials = matchupDifferentials.sort((a, b) => b.differential - a.differential);
		const biggestBlowouts = matchupDifferentials.slice(0, 10);

		const closestMatchups = [];
		for(let i = 0; i < 10; i++) {
			closestMatchups.push(matchupDifferentials.pop());
		}

		const interSeasonEntry = {
			year,
			biggestBlowouts,
			closestMatchups,
			seasonPointsRecords: seasonPointsRecord.sort((a, b) => b.fpts - a.fpts).slice(0, 10)
		}

		if(interSeasonEntry.seasonPointsRecords.length > 0) {
			if(!currentYear) {
				currentYear = year;
			}
			seasonWeekRecords.push(interSeasonEntry)
		};
	}

	allTimeMatchupDifferentials = allTimeMatchupDifferentials.sort((a, b) => b.differential - a.differential)
	allTimeBiggestBlowouts = allTimeMatchupDifferentials.slice(0, 10);

	for(let i = 0; i < 10; i++) {
		allTimeClosestMatchups.push(allTimeMatchupDifferentials.pop());
	}

	leagueWeekRecords = leagueWeekRecords.sort((a, b) => b.fpts - a.fpts).slice(0, 10);
	mostSeasonLongPoints = mostSeasonLongPoints.sort((a, b) => b.fpts - a.fpts).slice(0, 10);

	const recordsData = {
		allTimeBiggestBlowouts,
		allTimeClosestMatchups,
		mostSeasonLongPoints,
		leagueWeekRecords,
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
