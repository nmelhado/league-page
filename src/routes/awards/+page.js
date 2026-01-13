import { getAwards, getLeagueTeamManagers } from '$lib/utils/helpers/helper';

export async function load() {
    const awardsData = getAwards();
    const teamManagersData = getLeagueTeamManagers();

    return {
        awardsData,
        teamManagersData,
    };
}