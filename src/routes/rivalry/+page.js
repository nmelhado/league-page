import { getLeagueTeamManagers, getRivalryMatchups, loadPlayers } from '$lib/utils/helper';

export async function load({url, fetch}) {

    const playerOne = url?.searchParams?.get('player_one');
    const playerTwo = url?.searchParams?.get('player_two');
    let rivalryData = null;
    if(playerOne && playerTwo) {
        rivalryData = getRivalryMatchups(playerOne, playerTwo);
    }

    return {
        leagueTeamManagerData: getLeagueTeamManagers(),
        playersData: loadPlayers(fetch),
        rivalryData,
    };
}