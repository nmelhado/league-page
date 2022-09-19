import { getLeagueTransactions, loadPlayers } from '$lib/utils/helper';

export async function load({ url, fetch }) {
    const show = url?.searchParams?.get('show');
    const query = url?.searchParams?.get('query');
    const curPage = url?.searchParams?.get('page');

    const transactionsData = getLeagueTransactions(false);

    const playersData = loadPlayers(fetch);

    const bannedValued = [
        'undefined',
    ]

    const props = {
        show: "both",
        query: "",
        playersData,
        transactionsData,
        page: 0,
    }
    if(show && (show == "trade" || show == "waiver" || show == "both")) {
        props.show = show;
    }
    if(query && !bannedValued.includes(query)) {
        props.query = query;
    }
    if(curPage && !isNaN(curPage)) {
        props.page = parseInt(curPage) - 1;
    }
    return props;
}