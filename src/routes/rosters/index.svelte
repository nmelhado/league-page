<script context="module">
	import { getLeagueData, getLeagueRosters, getLeagueUsers, loadPlayers, waitForAll } from '$lib/utils/helper';

    export async function load() {
        const rostersInfo = waitForAll(
			getLeagueData(),
			getLeagueRosters(),
			getLeagueUsers(),
			loadPlayers(),
		)
	
		return {
			props: {
				rostersInfo
			}
		};
	}
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { Rosters } from '$lib/components'

	export let rostersInfo;
</script>

<style>
	.holder {
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

<div class="holder">
	{#await rostersInfo}
		<div class="loading">
			<p>Retrieving roster data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [leagueData, rosterData, users, players]}
		<!-- promise was fulfilled -->
		<Rosters {leagueData} {rosterData} {users} {players} /> <!-- displays rosters -->
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
