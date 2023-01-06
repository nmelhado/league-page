import { getLeagueStandings, getLeagueTeamManagers } from '$lib/utils/helper';

export async function load() {

    const standingsData = getLeagueStandings();
    const leagueTeamManagersData = getLeagueTeamManagers();

    return {
        standingsData,
        leagueTeamManagersData,
    };
}