<script>
	import LinearProgress from '@smui/linear-progress';
	import { TransactionsPage } from '$lib/components'
    import { waitForAll } from '$lib/utils/helper';

    export let data;
    const {show, query, page, playersData, transactionsData} = data;

    let el, masterOffset;

    const resize = (w) => {
        masterOffset = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
    }
	const perPage = 10;

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
    {:then [{transactions, currentTeams, stale}, playersInfo]}
        <TransactionsPage {playersInfo} {stale} {transactions} {currentTeams} {masterOffset} {show} {query} queryPage={page} {perPage} postUpdate={true} />
    {:catch error}
        <p class="center">Something went wrong: {error.message}</p>
    {/await}
</div>