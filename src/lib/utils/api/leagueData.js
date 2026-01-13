import { get } from 'svelte/store';
import {leagueDataStore} from '$lib/stores';
import { leagueID } from '$lib/utils/leagueInfo';

export const getLeagueData = async (queryLeagueID = leagueID) => {
	if(get(leagueDataStore)[queryLeagueID]) {
		return get(leagueDataStore)[queryLeagueID];
	}
    const res = await fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });

	if (res.ok) {
		leagueDataStore.update(ld => {ld[queryLeagueID] = data; return ld});
		return data;
	} else {
		throw new Error(data);
	}
}