import { getLeagueRecords, getLeagueTeamManagers, getLeagueTransactions, waitForAll } from '$lib/utils/helpers/helper';

export async function load() {
    const recordsInfo = waitForAll(
        getLeagueRecords(false),
        getLeagueTransactions(false),
        getLeagueTeamManagers(),
    )

    return {
        recordsInfo
    };
}