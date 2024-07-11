<script>
	import LinearProgress from '@smui/linear-progress';
    import {Manager} from '$lib/components';
    import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';
        
	export let data;
	const {managers, manager, managersInfo} = data;
    
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
{/if}