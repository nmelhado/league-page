import { leagueID } from "./leagueData"
import { get } from 'svelte/store';
import {users} from '$lib/stores';

export const getLeagueUsers = async (queryLeagueID = leagueID) => {
	if(get(users)[queryLeagueID]) {
		return get(users)[queryLeagueID];
	}
	const res = await fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/users`, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		const usersData = processUsers(data);
		users.update(u => {u[queryLeagueID] = usersData; return u});
		return usersData;
	} else {
		throw new Error(data);
	}
}

const processUsers = (rawUsers) => {
	let finalUsers = {};
	for(const user of rawUsers) {
		finalUsers[user.user_id] = user;
	}
	return finalUsers;
}