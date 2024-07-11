<script>
	import LinearProgress from '@smui/linear-progress';
	import { Records } from '$lib/components';
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
    const recordsInfo = data.recordsInfo;
</script>

{#if isAuthenticated}
    <style>
        #main {
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
{/if}

<div id="main">
    {#await recordsInfo}
        <!-- promise is pending -->
        <div class="loading">
            <p>Loading league records...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [leagueData, {totals, stale}, leagueTeamManagers]}
        <Records {leagueData} {totals} {stale} {leagueTeamManagers} />
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
