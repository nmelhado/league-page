import { get } from 'svelte/store';
import { players } from '$lib/stores';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

export const loadPlayers = async (servFetch, refresh = false) => {     
	if(get(players)[1426] && !refresh) {
		return {
            players: get(players),
            stale: false
        };
	}

    const smartFetch = servFetch ?? fetch;
    
    // If refresh is requested, clear the cache first
    if (refresh) {
        cacheManager.remove('players_info');
    }

    try {
        // Use the cache manager's cachedFetch method
        const result = await cacheManager.cachedFetch(
            `/api/fetch_players_info`,
            (data) => {
                players.update(() => data);
            },
            CACHE_DURATIONS.PLAYERS,
            'players_info'
        );

        return {
            players: result.data,
            stale: result.isStale || false
        };
        
    } catch (error) {
        console.error('Failed to load players:', error);
        
        // Fallback: try to get stale data from cache
        const cached = cacheManager.get('players_info', {}, CACHE_DURATIONS.PLAYERS);
        if (cached && cached.data) {
            players.update(() => cached.data);
            return {
                players: cached.data,
                stale: true
            };
        }
        
        throw error;
    }
}