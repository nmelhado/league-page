import { getBrackets, getLeagueMatchups, loadPlayers } from '$lib/utils/helper';

export async function load({ url, fetch }) {
    const queryWeek = url?.searchParams?.get('week');
    return {
        queryWeek: isNaN(queryWeek) ? null : queryWeek,
        matchupsData: getLeagueMatchups(),
        bracketsData: getBrackets(),
        playersData: loadPlayers(fetch),
    };
}