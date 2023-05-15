import { getLeagueTeamManagers } from '$lib/utils/helper';

export async function load({ url, fetch }) {

    const playerOne = url?.searchParams?.get('player_one');

    const playerTwo = url?.searchParams?.get('player_two');

    return {
        leagueTeamManagerData: getLeagueTeamManagers(),
        playerOne,
        playerTwo
    };
}