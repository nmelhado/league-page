import { leagueID } from '$lib/utils/leagueInfo';
import { get } from 'svelte/store';
import { rostersStore } from '$lib/stores';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

export const getLeagueRosters = async (queryLeagueID = leagueID) => {
    const storedRoster = get(rostersStore)[queryLeagueID];
	if(
        storedRoster
        && typeof storedRoster.rosters === 'object' &&
        !Array.isArray(storedRoster.rosters) &&
        storedRoster.rosters !== null
    ) {
		return storedRoster;
	}

	// Use cached fetch with automatic store updating
	const result = await cacheManager.cachedFetch(
		`https://api.sleeper.app/v1/league/${queryLeagueID}/rosters`,
		(data) => {
			const processedRosters = processRosters(data);
			rostersStore.update(r => {
				r[queryLeagueID] = processedRosters;
				return r;
			});
		},
		CACHE_DURATIONS.ROSTERS,
		'league_rosters',
		{ leagueID: queryLeagueID }
	);

	// Process the data if it wasn't already processed
	let processedData = result.data;
	if (Array.isArray(result.data)) {
		processedData = processRosters(result.data);
		// Update the store with processed data if it came from cache
		if (result.fromCache) {
			rostersStore.update(r => {
				r[queryLeagueID] = processedData;
				return r;
			});
		}
	}

	return processedData;
}

const processRosters = (rosters) => {
	const startersAndReserve = [];
    const rosterMap = {};
	for(const roster of rosters) {
		for(const starter of roster.starters) {
			startersAndReserve.push(starter);
		}
		if(roster.reserve) {
			for(const ir of roster.reserve) {
				startersAndReserve.push(ir);
			}
		}
        rosterMap[roster.roster_id] = roster;
	}
	return {rosters: rosterMap, startersAndReserve};
}