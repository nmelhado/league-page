<script>
	import { MatchupsAndBrackets } from '$lib/components';

	export let data;
	const {queryWeek, matchupsData, bracketsData, playersData, leagueTeamManagersData} = data;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<div id="main">
    <MatchupsAndBrackets {queryWeek} {matchupsData} {bracketsData} {playersData} {leagueTeamManagersData} />
</div>