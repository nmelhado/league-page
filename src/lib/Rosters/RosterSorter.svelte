<script>
    import Button, { Label } from '@smui/button';
	import Roster from './Roster.svelte';
	
	export let rosters, leagueTeamManagers, startersAndReserve, leagueData, players;

	const rosterPositions = leagueData.roster_positions;


	const numDivisions = leagueData.settings.divisions || 1;

	const divisions = [];

	for(let i = 0; i < numDivisions; i++) {
		divisions.push({
			name: leagueData.metadata ? leagueData.metadata[`division_${i + 1}`] : null,
			rosters: [],
		})
	}

	for(const rosterID in rosters) {
        const roster = rosters[rosterID];
        const division = !roster.settings.division || roster.settings.division > numDivisions ? 0 : roster.settings.division - 1;
		divisions[division].rosters.push(roster);
	}

	let expanded = false;
</script>

<style>
	.division {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 10px auto 20px;
		width: 95%;
	}

	.banner {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 140px;
		width: 400px;
		border-radius: 40px;
		margin: 10px auto;
		background-repeat: no-repeat;
		background-size: auto 140px;
	}

	.banner-D-1 {
		background-image: url("/division-1-banner.png");
		background-position: left; 
	}

	.banner-D-2 {
		background-image: url("/division-2-banner.png");
		background-position: right; 
	}

	.banner-D-3 {
		background-image: url("/division-3-banner.png");
		background-position: left; 
	}

	h2 {
		text-align: center;
		font-size: 3em;
	}

	@media (max-width: 460px) {
		.banner {
			height: 110px;
			width: 315px;
			background-repeat: no-repeat;
			background-size: auto 110px;
		}

		h2 {
			font-size: 2.5em;
		}
	}

	@media (max-width: 360px) {
		.banner {
			height: 90px;
			width: 258px;
			background-repeat: no-repeat;
			background-size: auto 90px;
		}

		h2 {
			font-size: 2em;
		}
	}

	.banner h2 {
		text-shadow: var(--fff) 0px 0px 3px, var(--fff) 0px 0px 3px, var(--fff) 0px 0px 3px,
            		 var(--fff) 0px 0px 3px, var(--fff) 0px 0px 3px, var(--fff) 0px 0px 3px;
		-webkit-font-smoothing: antialiased;
	}

	.minExp {
		display: block;
		text-align: center;
		margin: 10px 0;
		cursor: pointer;
	}

	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}

	.expandButton {
		margin: 5em auto 2em;
    	text-align: center;
	}
</style>

<div class="expandButton">
	<Button on:click={() => {expanded = !expanded}} variant="outlined">
		<Label>{expanded ? "Minimize" : "Expand"} All Benches</Label>
	</Button>
</div>

{#each divisions as division, ix}
	{#if division.name}
		<div class="banner banner-D-{ix + 1}">
			<h2>{division.name}</h2>
		</div>
	{/if}
	<div class="division">
		{#each division.rosters as roster}
			<Roster division={ix + 1} {expanded} {rosterPositions} {roster} {leagueTeamManagers} {players} {startersAndReserve} />
		{/each}
	</div>
{/each}
