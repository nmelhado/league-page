<script context="module">
	import { getBrackets, getLeagueMatchups, loadPlayers } from '$lib/utils/helper';
    export async function load({ page }) {
        const queryWeek = page.query.get('week');
		return {
			props: {
				queryWeek: isNaN(queryWeek) ? null : queryWeek,
				matchupsData: getLeagueMatchups(),
				bracketsData: getBrackets(),
				playersData: loadPlayers(),
			}
		};
	}
</script>

<script>
	import { MatchupsAndBrackets } from '$lib/components';

	export let queryWeek, matchupsData, bracketsData, playersData;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<div id="main">
    <MatchupsAndBrackets {queryWeek} {matchupsData} {bracketsData} {playersData} />
</div>