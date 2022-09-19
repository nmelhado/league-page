import { getLeagueRecords, getLeagueTransactions, waitForAll } from '$lib/utils/helper';

export async function load() {
    const recordsInfo = waitForAll(
        getLeagueRecords(false),
        getLeagueTransactions(false),
    )

    return {
        recordsInfo
    };
}