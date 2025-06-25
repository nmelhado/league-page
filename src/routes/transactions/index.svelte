<script context="module">
	import { getLeagueTransactions, loadPlayers, waitForAll } from '$lib/utils/helper';

    export async function load({ page }) {
        const show = page.query.get('show');
        const query = page.query.get('query');
        const curPage = page.query.get('page');
        const team = page.query.get('team');

        const transactionsData = getLeagueTransactions(false);

        const playersData = loadPlayers();

        const bannedValued = [
            'undefined',
        ]

        const props = {
            show: "both",
            query: "",
            playersData,
            transactionsData,
            page: 0,
            team: 0,
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
        if(team && !isNaN(team)) {
            props.team = parseInt(team);
        }
                return { props };
        }
    
	const perPage = 10;
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { TransactionsPage } from '$lib/components'

    export let show, query, page, team, playersData, transactionsData;

    let el, masterOffset;

    const resize = (w) => {
        masterOffset = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
    }

    $: resize(innerWidth);

    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    #main {
        position: relative;
        z-index: 1;
        display: block;
        margin: 30px auto;
		width: 95%;
		max-width: 1000px;
        overflow-y: hidden;
    }

	.loading {
		display: block;
		position: relative;
		z-index: 1;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<div id="main" bind:this={el}>


    {#await waitForAll(transactionsData, playersData)}
        <div class="loading" >
            <p>Loading league transactions...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [{transactions, currentManagers, stale}, playersInfo]}
        <TransactionsPage {playersInfo} {stale} {transactions} {currentManagers} {masterOffset} {show} {query} team={team} queryPage={page} {perPage} postUpdate={true} />
    {:catch error}
        <p class="center">Something went wrong: {error.message}</p>
    {/await}
</div>