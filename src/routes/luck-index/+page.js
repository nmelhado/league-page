import { getLuckIndex, getLeagueTeamManagers } from '$lib/utils/helper';

export async function load() {
    const luckIndexData = getLuckIndex();
    const teamManagersData = getLeagueTeamManagers();

    return {
        luckIndexData,
        teamManagersData,
    };
}
