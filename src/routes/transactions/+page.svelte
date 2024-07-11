<script>
	import LinearProgress from '@smui/linear-progress';
	import { TransactionsPage } from '$lib/components'
    import { waitForAll } from '$lib/utils/helper';
	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

    export let data;
    const {show, query, page, playersData, transactionsData, leagueTeamManagersData} = data;

	const perPage = 20;
    let isAuthenticated = false;
    onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });
</script>

{#if isAuthenticated}
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

    <div id="main">
        {#await waitForAll(transactionsData, playersData, leagueTeamManagersData)}
            <div class="loading" >
                <p>Loading league transactions...</p>
                <LinearProgress indeterminate />
            </div>
        {:then [{transactions, currentTeams, stale}, playersInfo, leagueTeamManagers]}
            <TransactionsPage {playersInfo} {stale} {transactions} {currentTeams} {show} {query} queryPage={page} {perPage} postUpdate={true} {leagueTeamManagers} />
        {:catch error}
            <p class="center">Something went wrong: {error.message}</p>
        {/await}
    </div>
{/if}