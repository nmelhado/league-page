import { getLeagueTeamManagers, loadPlayers } from '$lib/utils/helper';

export async function load({fetch}) {

    return {
        leagueTeamManagerData: getLeagueTeamManagers(),
        playersData: loadPlayers(fetch),
    };
}