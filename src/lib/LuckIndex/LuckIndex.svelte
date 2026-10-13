<script>
	import { gotoManager } from '$lib/utils/helper';
	import { getAvatarFromTeamManagers, getTeamNameFromTeamManagers, round } from '$lib/utils/helperFunctions/universalFunctions';

	export let luckIndex, leagueTeamManagers;

	const { year, weeksCounted, teams } = luckIndex;

	const teamName = (rosterID) => getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year);
	const teamAvatar = (rosterID) => getAvatarFromTeamManagers(leagueTeamManagers, rosterID, year);

	const record = (w, l, t) => t > 0 ? `${w}-${l}-${t}` : `${w}-${l}`;
	const pct = (p) => (p).toFixed(3).replace(/^0/, '');
	const signed = (n) => `${n > 0 ? '+' : ''}${round(n)}`;

	// luckiest and unluckiest for the callout cards
	$: luckiest = teams.length ? [...teams].sort((a, b) => b.luck - a.luck)[0] : null;
	$: unluckiest = teams.length ? [...teams].sort((a, b) => a.luck - b.luck)[0] : null;
</script>

<style>
	* {
		color: var(--g555);
	}

	.wrapper {
		display: block;
		width: 100%;
	}

	h3 {
		text-align: center;
		margin: 0.5em 0 0.2em;
	}

	.subhead {
		text-align: center;
		font-style: italic;
		color: var(--bbb);
		margin: 0 0 1.4em;
		font-size: 0.9em;
		padding: 0 1em;
	}

	.callouts {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 26px;
	}

	.callout {
		flex: 1 1 240px;
		max-width: 320px;
		border: 1px solid var(--bbb);
		border-radius: 10px;
		background-color: var(--fff);
		padding: 14px 16px;
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
	}

	.calloutLabel {
		font-size: 0.85em;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 10px;
	}

	.calloutTeam {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}

	.calloutAvatar {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		flex-shrink: 0;
	}

	.calloutName {
		font-weight: 600;
		line-height: 1.15;
	}

	.calloutStat {
		font-size: 0.85em;
		color: var(--bbb);
	}

	.tableWrap {
		overflow-x: auto;
		border: 1px solid var(--bbb);
		border-radius: 10px;
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
	}

	table {
		border-collapse: collapse;
		width: 100%;
		background-color: var(--fff);
	}

	th, td {
		padding: 10px 12px;
		text-align: center;
		white-space: nowrap;
		border-bottom: 1px solid var(--eee, #eaeaea);
		font-size: 0.92em;
	}

	thead th {
		font-size: 0.82em;
		position: sticky;
		top: 0;
		background-color: var(--fff);
	}

	.teamCol {
		text-align: left;
		position: sticky;
		left: 0;
		background-color: var(--fff);
		z-index: 1;
	}

	.teamCell {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}

	.rowAvatar {
		width: 30px;
		height: 30px;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		flex-shrink: 0;
	}

	.rowName {
		font-weight: 600;
		max-width: 170px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rank {
		color: var(--bbb);
		font-weight: 700;
		width: 1em;
	}

	.lucky {
		color: #2e9c4f;
		font-weight: 700;
	}

	.unlucky {
		color: #d13b3b;
		font-weight: 700;
	}

	.neutral {
		color: var(--bbb);
	}

	.legend {
		font-size: 0.8em;
		color: var(--bbb);
		text-align: center;
		margin: 16px auto 0;
		max-width: 640px;
		line-height: 1.5;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	.nothing {
		text-align: center;
		margin: 60px auto;
		color: var(--bbb);
	}
</style>

<div class="wrapper">
	<h3>🍀 Luck Index &amp; All-Play Standings</h3>
	<p class="subhead">How every team would rank if they played the entire league each week — and who the schedule has been kind (or cruel) to</p>

	{#if !teams.length}
		<p class="nothing">No completed weeks yet this season — check back after Week 1 is in the books!</p>
	{:else}
		<div class="callouts">
			{#if luckiest}
				<div class="callout">
					<div class="calloutLabel">🍀 Luckiest Team</div>
					<div class="calloutTeam" onclick={() => gotoManager({ year, leagueTeamManagers, rosterID: luckiest.rosterID })}>
						<img class="calloutAvatar" src={teamAvatar(luckiest.rosterID)} alt={teamName(luckiest.rosterID)} />
						<div>
							<div class="calloutName">{teamName(luckiest.rosterID)}</div>
							<div class="calloutStat">{signed(luckiest.luck)} wins vs. expected</div>
						</div>
					</div>
				</div>
			{/if}
			{#if unluckiest}
				<div class="callout">
					<div class="calloutLabel">💔 Unluckiest Team</div>
					<div class="calloutTeam" onclick={() => gotoManager({ year, leagueTeamManagers, rosterID: unluckiest.rosterID })}>
						<img class="calloutAvatar" src={teamAvatar(unluckiest.rosterID)} alt={teamName(unluckiest.rosterID)} />
						<div>
							<div class="calloutName">{teamName(unluckiest.rosterID)}</div>
							<div class="calloutStat">{signed(unluckiest.luck)} wins vs. expected</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="tableWrap">
			<table>
				<thead>
					<tr>
						<th class="teamCol">All-Play Rank</th>
						<th title="Actual head-to-head record">Record</th>
						<th title="Record vs. every team, every week">All-Play</th>
						<th title="All-play win percentage">All-Play %</th>
						<th title="Wins your all-play % says you should have">Exp. Wins</th>
						<th title="Actual wins minus expected wins">Luck</th>
						<th title="Total points scored">PF</th>
					</tr>
				</thead>
				<tbody>
					{#each teams as team, i (team.rosterID)}
						<tr>
							<td class="teamCol">
								<div class="teamCell" onclick={() => gotoManager({ year, leagueTeamManagers, rosterID: team.rosterID })}>
									<span class="rank">{i + 1}</span>
									<img class="rowAvatar" src={teamAvatar(team.rosterID)} alt={teamName(team.rosterID)} />
									<span class="rowName">{teamName(team.rosterID)}</span>
								</div>
							</td>
							<td>{record(team.wins, team.losses, team.ties)}</td>
							<td>{record(team.allWins, team.allLosses, team.allTies)}</td>
							<td>{pct(team.allPlayPct)}</td>
							<td>{round(team.expectedWins)}</td>
							<td class={team.luck > 0.5 ? 'lucky' : team.luck < -0.5 ? 'unlucky' : 'neutral'}>{signed(team.luck)}</td>
							<td>{round(team.pointsFor)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<p class="legend">
			Through {weeksCounted} scored {weeksCounted === 1 ? 'week' : 'weeks'} of {year}.
			<b>All-Play</b> counts each team against every other team every week, removing schedule luck.
			<b>Luck</b> is actual wins minus expected wins — <span class="lucky">green means lucky</span> (winning more than your scores deserve),
			<span class="unlucky">red means unlucky</span>.
		</p>
	{/if}
</div>
