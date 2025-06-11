<script>
	import { gotoManager } from '$lib/utils/helper';
  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/icon-button';
	import RosterRow from "./RosterRow.svelte"
	
	export let roster, leagueTeamManagers, startersAndReserve, players, rosterPositions, division, expanded, searchTerm = ''; // Added searchTerm

	$: team = leagueTeamManagers.teamManagersMap[leagueTeamManagers.currentSeason][roster.roster_id].team;

	let i = 0;

	const digestData = (passedPlayers, rawPlayers, startingPlayers = false, reserve = false, currentSearchTerm = '') => {
		let digestedRoster = [];
		const lowerSearchTerm = currentSearchTerm.toLowerCase();
	
		for(const singlePlayer of rawPlayers) {
			if(!startingPlayers && !reserve && startersAndReserve.includes(singlePlayer)) {
				continue;
			}
			let player = {};
			let slot = "BN"
			if(startingPlayers) {
				slot = rosterPositions[i] == "WRRB_FLEX" ? "WR/RB" : rosterPositions[i];
			}

			if(singlePlayer == "0") {
				// Always include "Empty" slots if search term is blank, otherwise filter them
				if(lowerSearchTerm === '') {
					player = {
						name: "Empty",
						poss: null,
						team: null,
						avatar: null,
						slot: slot
					}
					i++;
					digestedRoster.push(player);
				}
				continue;
			}

			// Filter by player name if search term is present
			const playerName = `${passedPlayers[singlePlayer].fn} ${passedPlayers[singlePlayer].ln}`;
			const playerNickname = roster.metadata && roster.metadata[`p_nick_${singlePlayer}`] ? roster.metadata[`p_nick_${singlePlayer}`] : '';

			if (lowerSearchTerm &&
				!playerName.toLowerCase().includes(lowerSearchTerm) &&
				!playerNickname.toLowerCase().includes(lowerSearchTerm)) {
				if(startingPlayers) i++; // Still need to increment slot counter for starters if player is filtered out
				continue;
			}

			let injury = null;
			switch (passedPlayers[singlePlayer].is) {
				case "Questionable":
					injury = "Q";
					break;
				case "Out":
					injury = "OUT";
					break;
				case "PUP":
					injury = "PUP";
					break;
				case "IR":
					injury = "IR";
					break;
			
				default:
					break;
			}
			player = {
				name: `${passedPlayers[singlePlayer].fn} ${passedPlayers[singlePlayer].ln}${injury ? `<span class="injury ${injury}">${injury}</span>` : ""}`,
                nickname: roster.metadata && roster.metadata[`p_nick_${singlePlayer}`] ? roster.metadata[`p_nick_${singlePlayer}`] : null,
				poss: passedPlayers[singlePlayer].pos,
				team: passedPlayers[singlePlayer].t,
				avatar: passedPlayers[singlePlayer].pos == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${singlePlayer.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${singlePlayer}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
				slot: slot
			}
			i++;
			digestedRoster.push(player);
		}
		i = 0;

		return digestedRoster;
	}

	// Reactive statements to re-calculate rosters when searchTerm changes
	$: finalStarters = digestData(players, roster.starters, true, false, searchTerm);

	let finalBench = [];
	$: if(roster.players) {
		finalBench = digestData(players, roster.players, false, false, searchTerm);
	}

	let finalIR = null;
	$: if(roster.reserve) { // Check if roster.reserve is defined before calling digestData
		finalIR = digestData(players, roster.reserve, false, true, searchTerm);
	}

	const buildRecord = (newRoster) => {
		const innerRecord = [];
		// Check to make sure that record exists
		if(!newRoster.metadata || !newRoster.metadata.record) return innerRecord;
		// simplify record
		for (const c of newRoster.metadata.record) {
			switch (c) {
				case "W":
					innerRecord.push("green");
					break;
				case "L":
					innerRecord.push("red");
					break;
			
				default:
					innerRecord.push("gray");
					break;
			}
		}
		return innerRecord;
	}

	$: record = buildRecord(roster);

	let selected = "0px";
	let status = "minimized";
	const toggleSelected = () => {
		selected = selected == "0px" ? calcHeight() + "px" : "0px";
		status = status == "minimized" ? "expanded" : "minimized";
	}

	let innerWidth;

	const calcHeight = () => {
		const multiplier = 52;
		const benchLength = finalBench.length * multiplier + 53;
		let irLength = 0;
		if(finalIR) {
			irLength = finalIR.length * multiplier + 52;
		}
		return benchLength + irLength;
	}

	$: {
		selected = expanded ? calcHeight() + "px" : "0px";
		status = expanded ? "expanded" : "minimized";
	}

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	h5 {
    text-align: center;
		margin: 0.2em auto;
	}
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 40px;
		margin-right: 15px;
		border: 0.25px solid #777;
	}

	.team {
		margin: 4px 10px 10px;
	}

	:global(.clickable) {
		cursor: pointer;
	}

	.roster-table-wrapper { /* New class for the div.team */
		overflow-x: auto;
		position: relative; /* For scroll cues */
		padding-bottom: 1px; /* Prevent child margin collapse cutting shadow */
	}

	/* Visual cue for horizontal scroll */
	.roster-table-wrapper.is-scrollable::after { /* Assuming JS adds 'is-scrollable' if scrollWidth > clientWidth */
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 30px;
        pointer-events: none;
        background: linear-gradient(to left, rgba(0,0,0,0.07), transparent);
    }
	/* Fallback simple cue if no JS */
	.roster-table-wrapper:not(.is-scrollable)::after { /* Show if JS doesn't manage it, but might show when not needed */
		content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 30px;
        pointer-events: none;
        background: linear-gradient(to left, rgba(0,0,0,0.07), transparent);
		/* This would ideally be controlled by JS checking scrollWidth > clientWidth */
		/* For now, it will appear if overflow-x is auto and table is wide. */
	}


	:global(.roster-table-wrapper .mdc-data-table__header-cell) {
        position: sticky;
        top: 0;
        background-color: var(--surface, #ffffff);
        z-index: 1; /* Lower z-index than team owner header if that's also sticky */
		font-weight: bold;
		font-size: 0.85em;
		text-align: center;
    }

	/* Alternating row colors for RosterRow */
    :global(.roster-table-wrapper .mdc-data-table__row:nth-child(even)) {
        background-color: var(--f8f8f8); /* Or a dedicated theme variable */
    }
    :global(.roster-table-wrapper .mdc-data-table__row:hover) {
        background-color: var(--ebebeb); /* Example hover color */
    }

	:global(.teamInner) {
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
		display: block;
	    margin: 0 auto;
	}

	.rosterBench{
		overflow: hidden;
		width: 100%;
		display: block;
		transition: max-height 0.7s ease-in-out;
	}

	:global(.r_1) {
		text-align: center;
		background-color: var(--r1);
	}

	:global(.r_2) {
		text-align: center;
		background-color: var(--r2);
	}

	:global(.r_3) {
		text-align: center;
		background-color: var(--r3);
	}

	.record {
		width: 100%;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-around;
	}

	.result {
		width: 11px;
	}

	h3 {
		font-size: 1.5em;
		font-weight: 500;
		margin: 12px 0;
	}

	h5 {
		font-size: 1.2em;
		text-align: center;
	}

	@media (max-width: 500px) {
		.team {
			font-size: 0.9em;
		}
		.result {
			width: 9px;
		}

		h3 {
			font-size: 1.3em;
			margin: 3px 0;
		}

		h5 {
			font-size: 1.1em;
		}
	}

	@media (max-width: 340px) {
		h3 {
			font-size: 1.1em;
			margin: 6px 0;
		}

		h5 {
			font-size: 1em;
		}
	}

	@media (max-width: 400px) {
		.team {
			margin: 4px auto 10px;
		}
	}

	:global(.icon) {
		vertical-align: middle;
	}

	.italic {
		color: #aaa;
		font-style: italic;
	}

	:global(.interactive) {
		vertical-align: middle;
		cursor: pointer;
	}

	:global(.bench) {
		background-color: var(--ir);
	}

	/* Sticky Team Owner Header Cell */
	:global(.team-owner-header-cell) {
		position: sticky;
		top: 0;
		z-index: 2 !important; /* Higher z-index for team owner header */
		background-color: var(--r1); /* Use its original background or theme surface */
	}
	:global(.r_2.team-owner-header-cell) {
		background-color: var(--r2);
	}
	:global(.r_3.team-owner-header-cell) {
		background-color: var(--r3);
	}

</style>

<div class="team roster-table-wrapper"> {/* Added roster-table-wrapper for overflow and cues */}
	<DataTable class="teamInner" table$aria-label="Team Roster Starters" style="width: {innerWidth * 0.95 > 380 ? 380 : innerWidth * 0.95}px;" >
		<Head>
			<Row>
				{/* Make team owner header cell sticky */}
				<Cell colspan=4 class="r_{division} clickable team-owner-header-cell">
					<h3 on:click={() => gotoManager({leagueTeamManagers, rosterID: roster.roster_id})}>
						<img alt="team avatar" class="teamAvatar" src="{team ? team.avatar : 'https://sleepercdn.com/images/v2/icons/player_default.webp'}" />
						{team?.name ? team.name : 'No Manager'}
					</h3>
					<div class="record">
						{#each record as result}
							<img alt="match result" class="result" src="/{result}.png" />
						{/each}
					</div>
				</Cell>
			</Row>
			<Row class="data-header-row"> {/* New Data Header Row for Starters */}
				<Cell style="width: 60px;">Slot</Cell> {/* Adjusted width */}
				<Cell style="width: 65px;">Player</Cell> {/* Adjusted width */}
				<Cell colspan=2>Details</Cell>
			</Row>
		</Head>
		<Body>
				<!-- Starters -->
			{#if finalStarters.length > 0}
				{#each finalStarters as starter, idx}
					<RosterRow player={starter} />
				{/each}
			{:else if searchTerm}
				<Row><Cell colspan=3>No starters match search.</Cell></Row>
			{/if}
			<Row class="interactive" on:click={toggleSelected}>
				<Cell colspan=4 class="{division}"><h5><Icon class="material-icons icon">king_bed</Icon> Bench <span class="italic">({status})</span></h5></Cell>
			</Row>
		</Body>
	</DataTable>
	<div class="rosterBench" style="max-height: {selected}">
		<DataTable class="teamInner" table$aria-label="Team Roster Bench and IR" style="width: 380px" >
			<Head> {/* Added Head for Bench/IR for consistency if headers desired here too */}
				<Row class="data-header-row"> {/* New Data Header Row for Bench/IR */}
					<Cell style="width: 60px;">Slot</Cell>
					<Cell style="width: 65px;">Player</Cell>
					<Cell colspan=2>Details</Cell>
				</Row>
			</Head>
			<Body class="bench">
				<!-- Bench -->
				{#if finalBench.length > 0}
					{#each finalBench as bench, idx}
						<RosterRow player={bench} />
					{/each}
				{:else if searchTerm}
					<Row><Cell colspan=3>No bench players match search.</Cell></Row>
				{/if}
				
				<!-- IR -->
				{#if finalIR && finalIR.length > 0}
					<Row>
						<Cell colspan=4 ><h5><Icon class="material-icons icon">healing</Icon> Injured Reserve</h5></Cell>
					</Row>
					{#each finalIR as ir, idx}
						<RosterRow player={ir} />
					{/each}
				{:else if finalIR && searchTerm} {#comment Hides IR section if search term exists and IR is empty as a result of search - may want to show "No IR players match search" #}
					<Row><Cell colspan=3>No IR players match search.</Cell></Row>
				{/if}
				<Row class="interactive" on:click={toggleSelected}>
					<Cell colspan=4 class="{division}"><h5><Icon class="material-icons icon">close_fullscreen</Icon>Close Bench</h5></Cell>
				</Row>
			</Body>
		</DataTable>
	</div>
</div>
