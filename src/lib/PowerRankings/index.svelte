<script>
    import {getNflState, getLeagueRosters, getLeagueUsers, waitForAll, getLeagueRecords, loadPlayers, getLeagueData} from '$lib/utils/helper';
    import PowerRankingsDisplay from './PowerRankingsDisplay.svelte';
    import LinearProgress from '@smui/linear-progress';
    import { leagueData } from '$lib/stores';
    
    const helperPromises = waitForAll(
        getNflState(),
        getLeagueRosters(),
        getLeagueUsers(),
        getLeagueRecords(),
        getLeagueData(),
        loadPlayers(),
    );

</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

{#await helperPromises}
    <!-- promise is pending -->
    <div class="loading">
        <p>Calculating power rankings...</p>
        <LinearProgress indeterminate />
    </div>
{:then [nflState, rostersData, users, records, leagueData, players]}
    <PowerRankingsDisplay {nflState} {rostersData} {users} {leagueData} {records} {players} />
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}



