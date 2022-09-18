<script>
	import LinearProgress from '@smui/linear-progress';
    import {Manager} from '$lib/components';

	export let data;
	const {managers, manager, managersInfo} = data;
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
    {:then [rostersData, users, leagueData, transactionsData, awards, records]}
        <Manager {awards} {records} {manager} {managers} {rostersData} {users} rosterPositions={leagueData.roster_positions} {transactionsData} />
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>