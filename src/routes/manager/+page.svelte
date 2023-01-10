<script>
	import LinearProgress from '@smui/linear-progress';
    import {Manager} from '$lib/components';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	const {managers, manager, managersInfo} = data;

    onMount(() => {
        if(!managers.length) goto('/');
        if(manager < 0) goto("/managers");
    })
</script>

<style>
	.main {
		position: relative;
		z-index: 1;
	}
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<div class="main">
        {#await managersInfo}
            <!-- promise is pending -->
            <div class="loading">
                <p>Retrieving managers...</p>
                <LinearProgress indeterminate />
            </div>
        {:then [rostersData, leagueTeamManagers, leagueData, transactionsData, awards, records]}
            {#if managers.length && manager > -1}
                <Manager {awards} {records} {manager} {managers} {rostersData} {leagueTeamManagers} rosterPositions={leagueData.roster_positions} {transactionsData} />
            {/if}
        {:catch error}
            <!-- promise was rejected -->
            <p>Something went wrong: {error.message}</p>
        {/await}
</div>