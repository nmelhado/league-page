import { leagueID, getLeagueData } from './leagueData';
import { getNflState } from './nflState';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueUsers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {records} from '$lib/stores';

export const getLeagueRecords = async () => {
	if(get(records).seasonWeekRecords) {
		return get(records);
	}
	const nflState = await getNflState().catch((err) => { console.error(err); });
	let week = nflState.week;

	let curSeason = leagueID;
	
	let currentManagers;

	let currentYear;
	let lastYear;

	let leagueRosterRecords = {}; // every full season stat point (for each year and all years combined)
	let seasonWeekRecords = []; // highest weekly points within a single season
	let leagueWeekRecords = []; // highest weekly points within a single season
	let mostSeasonLongPoints = []; // 10 highest full season points

	while(curSeason) {
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
				potentialPoints,
				manager: originalManagers[rosterID],
				year
			}

			leagueRosterRecords[rosterID].years.push(singleYearInfo);

			mostSeasonLongPoints.push({
				rosterID,
				fpts,
				year,
				manager: originalManagers[rosterID]
			})
		}
		
		if(!currentManagers) {
			currentManagers = originalManagers;
		}

		// loop through each week of the season
		const matchupsPromises = [];
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
		// process all the matchups
		for(let matchupWeek = 0; matchupWeek < matchupsData.length; matchupWeek++) {
			for(const matchup of matchupsData[matchupWeek]) {
				const entry = {
					manager: originalManagers[matchup.roster_id],
					fpts: matchup.points,
					week: matchupWeek + 1,
					year,
					rosterID: matchup.roster_id
				}
				seasonPointsRecord.push(entry);
				leagueWeekRecords.push(entry);
			}
		}
		const interSeasonEntry = {
			year,
			seasonPointsRecords: seasonPointsRecord.sort((a, b) => b.fpts - a.fpts).slice(0, 10)
		}

		if(interSeasonEntry.seasonPointsRecords.length > 0) {
			if(!currentYear) {
				currentYear = year;
			}
			seasonWeekRecords.push(interSeasonEntry)
		};
	}

	leagueWeekRecords = leagueWeekRecords.sort((a, b) => b.fpts - a.fpts).slice(0, 10);
	mostSeasonLongPoints = mostSeasonLongPoints.sort((a, b) => b.fpts - a.fpts).slice(0, 10);

	const recordsData = {
		mostSeasonLongPoints,
		leagueWeekRecords,
		seasonWeekRecords,
		leagueRosterRecords,
		currentManagers,
		currentYear,
		lastYear
	};

	records.update(() => recordsData);

	return recordsData;
}
