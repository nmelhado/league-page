import { get } from 'svelte/store';
import {leagueData} from '$lib/stores';

export const leagueID = "728116681330794496"; // your league ID
export const leagueName = "[foot]BALL IS LIFE!"; // your league name
export const dues = 75; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper

export const getLeagueData = async (queryLeagueID = leagueID) => {
	if(get(leagueData)[queryLeagueID]) {
		return get(leagueData)[queryLeagueID];
	}
    const res = await fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		leagueData.update(ld => {ld[queryLeagueID] = data; return ld});
		return data;
	} else {
		throw new Error(data);
	}
}