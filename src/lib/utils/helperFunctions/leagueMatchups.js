import { getLeagueData } from "./leagueData"
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from "./nflState"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { matchupsStore } from '$lib/stores';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

export const getLeagueMatchups = async () => {
	if(get(matchupsStore).matchupWeeks) {
		return get(matchupsStore);
	}

	const [nflState, leagueData] = await waitForAll(
		getNflState(),
		getLeagueData(),
	).catch((err) => { console.error(err); });

	let week = 1;
	if(nflState.season_type == 'regular') {
		week = nflState.display_week;
	} else if(nflState.season_type == 'post') {
		week = 18;
	}
	const year = leagueData.season;
	const regularSeasonLength = leagueData.settings.playoff_week_start - 1;

	// pull in all matchup data for the season using cached requests
	const matchupsPromises = [];
	for(let i = 1; i < leagueData.settings.playoff_week_start; i++) {
		matchupsPromises.push(
			cacheManager.cachedFetch(
				`https://api.sleeper.app/v1/league/${leagueID}/matchups/${i}`,
				null, // no store updater needed here
				CACHE_DURATIONS.MATCHUPS,
				'league_matchups',
				{ leagueID, week: i }
			)
		);
	}
	const matchupsResults = await waitForAll(...matchupsPromises);

	// Extract data from cache results
	const matchupsData = matchupsResults.map(result => result.data);

	const matchupWeeks = [];
	// process all the matchups
	for(let i = 1; i < matchupsData.length + 1; i++) {
		const processed = processMatchups(matchupsData[i - 1], i);
		if(processed) {
			matchupWeeks.push({
				matchups: processed.matchups,
				week: processed.week
			});
		}
	}

	const matchupsResponse = {
		matchupWeeks,
		year,
		week,
		regularSeasonLength
	}
	
	matchupsStore.update(() => matchupsResponse);

	return matchupsResponse;
}

const processMatchups = (inputMatchups, week) => {
	if(!inputMatchups || inputMatchups.length == 0) {
		return false;
	}
	const matchups = {};
	for(const match of inputMatchups) {
		if(!matchups[match.matchup_id]) {
			matchups[match.matchup_id] = [];
		}
		matchups[match.matchup_id].push({
			roster_id: match.roster_id,
			starters: match.starters,
			points: match.starters_points,
		})
	}
	return {matchups, week};
}
