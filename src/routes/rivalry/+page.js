import { getLeagueTeamManagers, loadPlayers, getLeagueTransactions, getLeagueRecords } from '$lib/utils/helper';

export async function load({url, fetch}) {

    const playerOne = url?.searchParams?.get('player_one');
    const playerTwo = url?.searchParams?.get('player_two');

    return {
        leagueTeamManagerData: getLeagueTeamManagers(),
        playersData: loadPlayers(fetch),
        transactionsData: getLeagueTransactions(),
        recordsData: getLeagueRecords(),
        playerOne,
        playerTwo,
    };
}