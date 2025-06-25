import { leagueID } from '$lib/utils/leagueInfo';
import { leagueHistory } from '$lib/stores';
import { get } from 'svelte/store';
import { getLeagueData } from './leagueData';

export const getLeagueHistory = async () => {
    if (get(leagueHistory).length > 0) {
        return get(leagueHistory);
    }

    const history = [];
    let current = leagueID;

    while (current && current != 0) {
        const data = await getLeagueData(current).catch((err) => {
            console.error(err);
        });
        if (!data) break;
        history.push({ season: data.season, league_id: current });
        current = data.previous_league_id;
    }

    leagueHistory.set(history);
    return history;
};
