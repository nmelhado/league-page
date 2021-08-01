import { get } from 'svelte/store';
import {players} from '$lib/stores';

export const loadPlayers = async () => {     
	if(get(players)[1426]) {
		return get(players);
	} 
    
    const now = Math.round(new Date().getTime() / 1000);
    const playersInfo = JSON.parse(localStorage.getItem("playersInfo"));
    let expiration = parseInt(localStorage.getItem("expiration"));
    
    if(!playersInfo || !expiration || now > expiration) {
        const res = await fetch(`/api/fetch_players_info`, {compress: true});
        const data = await res.json();


        if (!res.ok) {
            throw new Error(data);
        }
        localStorage.setItem("playersInfo", JSON.stringify(data))

        const ts = Math.round(new Date().getTime() / 1000);
        const newExpiration = ts + (24 * 3600);

        localStorage.setItem("expiration", newExpiration)  

		players.update(() => data);

        return data;
    }
    players.update(() => playersInfo);
    return playersInfo;
}