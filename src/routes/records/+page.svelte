<script>
	import LinearProgress from '@smui/linear-progress';
	import { Records } from '$lib/components';

    export let data;
    const recordsInfo = data.recordsInfo;
</script>

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
