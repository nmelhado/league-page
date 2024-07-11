<script>
	import { MatchupsAndBrackets } from '$lib/components';
	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

    let isAuthenticated = false;
    onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });

	export let data;
	const {queryWeek, matchupsData, bracketsData, playersData, leagueTeamManagersData} = data;
</script>

{#if isAuthenticated}
    <style>
        #main {
            position: relative;
            z-index: 1;
        }
    </style>

    <div id="main">
        <MatchupsAndBrackets {queryWeek} {matchupsData} {bracketsData} {playersData} {leagueTeamManagersData} />
    </div>
{/if}