<script context="module">
	import { getLeagueTransactions } from '$lib/utils/helper';
    export async function load({ page }) {
        const show = page.query.get('show');
        const query = page.query.get('query');
        const curPage = page.query.get('page');

        getLeagueTransactions() // This is done to prefetch the data, since the results are cached

        const bannedValued = [
            'undefined',
        ]

        const props = {
            show: "both",
            query: "",
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
		return { props };
	}
    
	const perPage = 10;
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { TransactionsPage } from '$lib/components'

    export let show, query, page;

    const transactionsData = getLeagueTransactions(false);

	$: masterOffset = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;

    let el;
</script>

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


    {#await transactionsData}
        <div class="loading" >
            <p>Loading league transactions...</p>
            <LinearProgress indeterminate />
        </div>
    {:then {transactions, currentManagers}}
        <TransactionsPage {transactions} {currentManagers} {masterOffset} {show} {query} {page} {perPage} postUpdate={true} />
    {:catch error}
        <p class="center">Something went wrong: {error.message}</p>
    {/await}
</div>