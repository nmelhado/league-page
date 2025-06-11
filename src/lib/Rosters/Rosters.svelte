<script>
	import { loadPlayers } from '$lib/utils/helper';
	import RosterSorter from './RosterSorter.svelte';
	import Textfield from '@smui/textfield'; // Import SMUI Textfield
	import IconButton from '@smui/icon-button'; // Import SMUI IconButton for clear

	export let leagueData, rosterData, leagueTeamManagers, playersInfo;

	let players = playersInfo.players;
	let searchTerm = '';

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

	.search-container {
		display: flex;
		align-items: center;
		max-width: 600px; /* Or adjust as needed */
		margin: 20px auto; /* Center the search bar */
		padding: 0 16px; /* Padding for smaller screens */
	}

	.search-textfield {
		flex-grow: 1;
	}
</style>

<div class="rosters">
	<div class="search-container">
		<Textfield
			bind:value={searchTerm}
			label="Search Player Name"
			outlined
			class="search-textfield"
		>
			<IconButton slot="leadingIcon" class="material-icons">search</IconButton>
			{#if searchTerm}
				<IconButton slot="trailingIcon" class="material-icons" on:click={() => searchTerm = ''}>clear</IconButton>
			{/if}
		</Textfield>
	</div>

	<RosterSorter
		rosters={rosterData.rosters}
		{players}
		{leagueTeamManagers}
		startersAndReserve={rosterData.startersAndReserve}
		{leagueData}
		{searchTerm}
	/>
</div>