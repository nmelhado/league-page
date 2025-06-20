import { get } from 'svelte/store';
import { nflState } from '$lib/stores';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

export const getNflState = async () => {
	if(get(nflState).season) {
		return get(nflState);
	}

	// Use cached fetch with automatic store updating
	const result = await cacheManager.cachedFetch(
		`https://api.sleeper.app/v1/state/nfl`,
		(data) => {
			nflState.update(() => data);
		},
		CACHE_DURATIONS.NFL_STATE,
		'nfl_state'
	);

	return result.data;
}