import { getLeagueData, getLeagueRosters, getLeagueUsers, loadPlayers, waitForAll } from '$lib/utils/helper';

export async function load({fetch}) {
    const rostersInfo = waitForAll(
        getLeagueData(),
        getLeagueRosters(),
        getLeagueUsers(),
        loadPlayers(fetch),
    )

    return {
        rostersInfo
    };
}