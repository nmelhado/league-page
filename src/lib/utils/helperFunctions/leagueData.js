import { get } from 'svelte/store';
import { leagueData } from '$lib/stores';
import { leagueID } from '$lib/utils/leagueInfo';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

export const getLeagueData = async (queryLeagueID = leagueID) => {
	// Check if data is already in the store
	if(get(leagueData)[queryLeagueID]) {
		return get(leagueData)[queryLeagueID];
	}

	// Use cached fetch with automatic store updating
	const result = await cacheManager.cachedFetch(
		`https://api.sleeper.app/v1/league/${queryLeagueID}`,
		(data) => {
			leagueData.update(ld => {
				ld[queryLeagueID] = data;
				return ld;
			});
		},
		CACHE_DURATIONS.LEAGUE_DATA,
		'league_data',
		{ leagueID: queryLeagueID }
	);

	return result.data;
}