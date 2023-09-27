import { getUpcomingDraft, getPreviousDrafts, getLeagueTeamManagers, loadPlayers } from '$lib/utils/helper';

export async function load({ fetch }) {
    const upcomingDraftData = getUpcomingDraft();
    const previousDraftsData = getPreviousDrafts();
    const leagueTeamManagersData = getLeagueTeamManagers();
    const playersData = loadPlayers(fetch);

    return {
        upcomingDraftData,
        previousDraftsData,
        leagueTeamManagersData,
        playersData,
    };
}