import { getLeagueStandings, getLeagueUsers } from '$lib/utils/helper';

export async function load() {

    const standingsData = getLeagueStandings();
    const usersData = getLeagueUsers();

    return {
        standingsData,
        usersData,
    };
}