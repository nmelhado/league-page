<script>
	import { loadPlayers } from '$lib/utils/helper';
	import RosterSorter from './RosterSorter.svelte'

	export let leagueData, rosterData, leagueTeamManagers, playersInfo;

	let players = playersInfo.players;

	const refreshPlayers = async () => {
		const newPlayersInfo = await loadPlayers(null, true);
		players = newPlayersInfo.players;
	}

	if(playersInfo.stale) {
		refreshPlayers();
	}
</script>

<style>
	.rosters {
		position: relative;
		z-index: 1;
	}
</style>

<div class="rosters">
	<RosterSorter rosters={rosterData.rosters} {players} {leagueTeamManagers} startersAndReserve={rosterData.startersAndReserve} {leagueData} />
</div>