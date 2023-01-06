import { getLeagueStandings, getLeagueTeamManagers } from '$lib/utils/helper';

export async function load() {

    const standingsData = getLeagueStandings();
    const usersData = getLeagueTeamManagers();

    return {
        standingsData,
        usersData,
    };
}