import { getWeeklyAwards, getLeagueTeamManagers } from '$lib/utils/helper';

export async function load() {
    const weeklyAwardsData = getWeeklyAwards();
    const teamManagersData = getLeagueTeamManagers();

    return {
        weeklyAwardsData,
        teamManagersData,
    };
}
