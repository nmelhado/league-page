import { get } from 'svelte/store';
import {playersStore} from '$lib/stores';
import { browser } from '$app/environment';

export const loadPlayers = async (servFetch, refresh = false) => {
	if(get(playersStore)[1426]) {
		return {
            players: get(playersStore),
            stale: false
        };
	}

    const smartFetch = servFetch ?? fetch;
    
    const now = Math.round(new Date().getTime() / 1000);
    let playersInfo = null;
    let expiration = null;
    if(browser) {
        playersInfo = JSON.parse(localStorage.getItem("playersInfo"));
        expiration = parseInt(localStorage.getItem("expiration"));
    }

    if(playersInfo && playersInfo[1426] && expiration && now > expiration && !refresh) {
        return {
            players: playersInfo,
            stale: true
        }
    }
    
    if(!playersInfo || !expiration || now > expiration) {
        const res = await smartFetch(`/api/fetch_players_info`, {compress: true});
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data);
        }

        if(browser) {
            localStorage.setItem("playersInfo", JSON.stringify(data))

            const ts = Math.round(new Date().getTime() / 1000);
            const newExpiration = ts + (24 * 3600);

            localStorage.setItem("expiration", newExpiration)

            playersStore.update(() => data);
        }

        return {
            players: data,
            stale: false
        };
    }
    playersStore.update(() => playersInfo);
    return {
        players: playersInfo,
        stale: false
    };
}