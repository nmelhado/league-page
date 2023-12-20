import { get } from 'svelte/store';
import { supabase } from "$lib/utils/supabase"
import {leagueData} from '$lib/stores';
import { leagueID } from '$lib/utils/leagueInfo';

export const getLeagueData = async (queryLeagueID = leagueID) => {
	if(get(leagueData)[queryLeagueID]) {
		return get(leagueData)[queryLeagueID];
	}
	const res = await supabase.from('view_league').select('*').eq('league_id', queryLeagueID).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		leagueData.update(ld => {ld[queryLeagueID] = data; return ld});
		return data;
	} else {
		throw new Error(data);
	}
}