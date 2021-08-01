<script>
  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/icon-button';
	import RosterRow from "./RosterRow.svelte"
	
	export let roster, users, startersAndReserve, players, rosterPositions, division, expanded;

	$: user = users[roster.owner_id];

	let i = 0;

	const digestData = (rawPlayers, startingPlayers = false, reserve = false) => {
		let digestedRoster = [];
	
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
				player = {
					name: "Empty",
					positions: null,
					team: null,
					avatar: null,
					slot: slot
				}
				i++;
				digestedRoster.push(player);
				continue;
			}

			let injury = null;
			switch (players[singlePlayer].injury_status) {
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
				name: `${players[singlePlayer].first_name} ${players[singlePlayer].last_name}${injury ? `<span class="injury ${injury}">${injury}</span>` : ""}${roster.metadata[`p_nick_${singlePlayer}`] ? `<br /><span class="nickname">"${roster.metadata[`p_nick_${singlePlayer}`]}"</span>` : ""}`,
				positions: players[singlePlayer].position,
				team: players[singlePlayer].team,
				avatar: players[singlePlayer].position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${singlePlayer.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${singlePlayer}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
				slot: slot
			}
			i++;
			digestedRoster.push(player);
		}
		i = 0;

		return digestedRoster;
	}

	$: finalStarters = digestData(roster.starters, true);
	$: finalBench = digestData(roster.players);
	let finalIR = null;
	if(roster.reserve) {
		finalIR = digestData(roster.reserve, false, true);
	}

	const buildRecord = (newRoster) => {
		 const innerRecord = [];
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
		selected = selected == "0px" ? "1200px" : "0px";
		status = status == "minimized" ? "expanded" : "minimized";
	}

	$: {
		selected = expanded ? "1200px" : "0px";
		status = expanded ? "expanded" : "minimized";
	}

    let innerWidth;
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

	:global(.teamInner) {
		box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
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
		background-color: #f7f9fd;
	}

	:global(.r_2) {
		text-align: center;
		background-color: #fbf7f7;
	}

	:global(.r_3) {
		text-align: center;
		background-color: #f7fbf7;
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
		background-color: #eee;
	}
</style>

<div class="team">
	<DataTable class="teamInner" table$aria-label="Team Name" style="width: {innerWidth * 0.95 > 380 ? 380 : innerWidth * 0.95}px;" >
		<Head> <!-- Team name  -->
			<Row>
				<Cell colspan=4 class="r_{division}">
					<h3>
						<img alt="team avatar" class="teamAvatar" src="https://sleepercdn.com/avatars/thumbs/{user.avatar}" />
						{user.metadata.team_name ? user.metadata.team_name : user.display_name}
					</h3>

					<div class="record">
						{#each record as result}
							<img alt="match result" class="result" src="./{result}.png" />
						{/each}
					</div>
				</Cell>
			</Row>
		</Head>
		<Body>
			<!-- 	Starters	 -->
			{#each finalStarters as starter}
				<RosterRow player={starter} />
			{/each}
			<Row class="interactive" on:click={toggleSelected}>
				<Cell colspan=4 class="{division}"><h5><Icon class="material-icons icon">king_bed</Icon> Bench <span class="italic">({status})</span></h5></Cell>
			</Row>
		</Body>
	</DataTable>
	<div class="rosterBench" style="max-height: {selected}">
		<DataTable class="teamInner" style="width: 380px" >
			<Body class="bench">
				<!-- 	Bench	 -->
				{#each finalBench as bench}
					<RosterRow player={bench} />
				{/each}
				
				<!-- 	IR	 -->
				{#if finalIR}
					<Row>
							<Cell colspan=4 ><h5>IR:</h5></Cell>
					</Row>
					{#each finalIR as ir}
						<RosterRow player={ir} />
					{/each}
				{/if}
				<Row class="interactive" on:click={toggleSelected}>
					<Cell colspan=4 class="{division}"><h5><Icon class="material-icons icon">close_fullscreen</Icon>Close Bench</h5></Cell>
				</Row>
			</Body>
		</DataTable>
	</div>
</div>
