<script>
	import RosterSorter from './RosterSorter.svelte'

	export let leagueData, rosterData, users, players;
</script>

<style>
	.rosters {
		position: relative;
		z-index: 1;
	}
</style>

<div class="rosters">
	<RosterSorter rosters={rosterData.rosters} {players} {users} startersAndReserve={rosterData.startersAndReserve} {leagueData} />
</div>