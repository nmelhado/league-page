<script context="module">
	import { getLeagueMatchups, loadPlayers, waitForAll } from '$lib/utils/helper';
    export async function load({ page }) {
		const matchupsData = waitForAll(
            getLeagueMatchups(),
            loadPlayers(),
        )
        const queryWeek = page.query.get('week');
		return {
			props: {
				queryWeek: isNaN(queryWeek) ? null : queryWeek,
				matchupsData
			}
		};
	}
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { MatchupWeeks } from '$lib/components';

	export let queryWeek, matchupsData;
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
    {#await matchupsData}
        <!-- promise is pending -->
        <div class="loading">
            <p>Loading league matchups...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [{matchupWeeks, year, week, regularSeasonLength}, players]}
		<MatchupWeeks {players} {queryWeek} {matchupWeeks} {regularSeasonLength} {year} {week} />
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>