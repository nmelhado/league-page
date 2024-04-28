import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from "./nflState"
import { getLeagueData } from "./leagueData"
import { getLeagueRosters } from "./leagueRosters"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {standingsStore} from '$lib/stores';
import { round } from './universalFunctions';

export const getLeagueStandings = async () => {
	if(get(standingsStore).standingsInfo) {
		return get(standingsStore);
	}

	const [nflState, leagueData, rostersData] = await waitForAll(
		getNflState(),
		getLeagueData(),
		getLeagueRosters(),
	).catch((err) => { console.error(err); });

	const yearData = leagueData.season;
	const regularSeasonLength = leagueData.settings.playoff_week_start - 1;
	const divisions = leagueData.settings.divisions && leagueData.settings.divisions > 1;
    const rosters = rostersData.rosters;

	// if the season hasn't started, standings can't be created
	if((leagueData.status != "in_season" && leagueData.status != "post_season" && leagueData.status != "complete") || nflState.week < 1) {
		return null;
	}

	let standings = {};
    for(const rosterID in rosters) {
        const roster = rosters[rosterID];
        standings[rosterID] = {
            rosterID,
            wins: roster.settings.wins,
            losses: roster.settings.losses,
            ties: roster.settings.ties,
            fpts: round(roster.settings.fpts + (roster.settings.fpts_decimal / 100)),
            fptsAgainst: round(roster.settings.fpts_against + (roster.settings.fpts_against_decimal / 100)),
            streak: roster.metadata?.streak || 0,
            divisionWins: divisions ? 0 : null,
            divisionLosses: divisions ? 0 : null,
            divisionTies: divisions ? 0 : null,
        }
    }

    if(divisions) {
        let week = 0;
        if(nflState.season_type == 'regular') {
            // max the week out at end of regular season
            week = nflState.display_week > regularSeasonLength ? regularSeasonLength + 1 : nflState.display_week;
        } else if(nflState.season_type == 'post') {
            week = regularSeasonLength + 1;
        }

        // if at least one week hasn't been completed, then standings can't be created
        if(week < 2) {
            return null;
        }

        // pull in all matchup data for the season
        const matchupsPromises = [];
        for(let i = week - 1; i > 0; i--) {
            matchupsPromises.push(fetch(`https://api.sleeper.app/v1/league/${leagueID}/matchups/${i}`, {compress: true}))
        }
        const matchupsRes = await waitForAll(...matchupsPromises);

        // convert the json matchup responses
        const matchupsJsonPromises = [];
        for(const matchupRes of matchupsRes) {
            const data = matchupRes.json();
            matchupsJsonPromises.push(data)
            if (!matchupRes.ok) {
                throw new Error(data);
            }
        }
        const matchupsData = await waitForAll(...matchupsJsonPromises).catch((err) => { console.error(err); }).catch((err) => { console.error(err); });

        // process all the matchups
        for(const matchup of matchupsData) {
            standings = processStandings(matchup, standings, rosters);
        }
    }

	const response = {
		standingsInfo: standings,
		yearData,
	}
	
	standingsStore.update(() => response);

	return response;
}

const processStandings = (matchup, standingsData, rosters) => {
	const matchups = {};
	for(const match of matchup) {
		if(!matchups[match.matchup_id]) {
			matchups[match.matchup_id] = [];
		}
		const rosterID = match.roster_id;

		matchups[match.matchup_id].push({
			rosterID,
			division: rosters[rosterID].settings.division,
			points: match.points,
		})
	}

	for(const matchupKey in matchups) {
		const teamA = matchups[matchupKey][0];
		const teamB = matchups[matchupKey][1];
	
		const divisionMatchup = teamA.division && teamB.division && teamA.division == teamB.division;

        if(divisionMatchup) {
            if(teamA.points > teamB.points) {
                standingsData[teamA.rosterID].divisionWins ++;
                standingsData[teamB.rosterID].divisionLosses ++;
                continue;
            } else if(teamB.points > teamA.points) {
                standingsData[teamB.rosterID].divisionWins ++;
                standingsData[teamA.rosterID].divisionLosses ++;
                continue;
            } else {
                standingsData[teamA.rosterID].divisionTies ++;
                standingsData[teamB.rosterID].divisionTies ++;
            }
        }
	}
	return standingsData;
}
