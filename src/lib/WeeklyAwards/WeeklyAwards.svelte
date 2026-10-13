<script>
	import { gotoManager } from '$lib/utils/helper';
	import { getAvatarFromTeamManagers, getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

	export let weeklyAwards, leagueTeamManagers;

	const { year, weeks, latestWeek, tally } = weeklyAwards;

	let selectedWeek = latestWeek;

	$: currentWeek = weeks.find((w) => w.week === selectedWeek);

	const teamName = (rosterID) => getTeamNameFromTeamManagers(leagueTeamManagers, rosterID, year);
	const teamAvatar = (rosterID) => getAvatarFromTeamManagers(leagueTeamManagers, rosterID, year);
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
	}

	.weekPicker {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 24px;
		flex-wrap: wrap;
	}

	select {
		font-size: 1em;
		padding: 6px 10px;
		border-radius: 6px;
		border: 1px solid var(--bbb);
		background-color: var(--fff);
		color: var(--g555);
		cursor: pointer;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
		gap: 18px;
	}

	.card {
		position: relative;
		background-color: var(--fff);
		border: 1px solid var(--bbb);
		border-radius: 10px;
		padding: 16px 16px 18px;
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
		display: flex;
		flex-direction: column;
	}

	.awardHeader {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 4px;
	}

	.emoji {
		font-size: 1.8em;
		line-height: 1;
	}

	.title {
		font-weight: 700;
		font-size: 1.05em;
	}

	.blurb {
		font-size: 0.82em;
		color: var(--bbb);
		margin: 0 0 14px;
		min-height: 2.2em;
	}

	.winner {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		margin-top: auto;
	}

	.avatar {
		width: 44px;
		height: 44px;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		background-color: var(--fff);
		flex-shrink: 0;
	}

	.winnerInfo {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.winnerName {
		font-weight: 600;
		line-height: 1.15;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.stat {
		font-size: 0.85em;
		color: var(--bbb);
	}

	.vs {
		font-size: 0.78em;
		color: var(--bbb);
		font-style: italic;
	}

	.nothing {
		text-align: center;
		margin: 60px auto;
		color: var(--bbb);
	}

	.tallySection {
		margin-top: 48px;
	}

	.tallyWrap {
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
	}

	thead th {
		font-size: 0.9em;
		position: sticky;
		top: 0;
		background-color: var(--fff);
	}

	.emojiHead {
		font-size: 1.25em;
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

	.tallyAvatar {
		width: 30px;
		height: 30px;
		border-radius: 100%;
		border: 1px solid var(--bbb);
		flex-shrink: 0;
	}

	.tallyName {
		font-weight: 600;
		max-width: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.zero {
		color: var(--bbb);
		opacity: 0.4;
	}

	.totalCol {
		font-weight: 700;
		border-left: 1px solid var(--bbb);
	}

	tbody tr:last-child td {
		border-bottom: none;
	}
</style>

<div class="wrapper">
	<h3>🏆 Weekly Awards</h3>
	<p class="subhead">Auto-generated superlatives, dished out every week</p>

	{#if !weeks.length}
		<p class="nothing">No completed weeks yet this season — check back after Week 1 is in the books!</p>
	{:else}
		<div class="weekPicker">
			<label for="weekSelect">Week</label>
			<select id="weekSelect" bind:value={selectedWeek}>
				{#each weeks as w}
					<option value={w.week}>Week {w.week}{w.week === latestWeek ? ' (latest)' : ''}</option>
				{/each}
			</select>
			<span class="stat">{year} season</span>
		</div>

		{#if currentWeek}
			<div class="grid">
				{#each currentWeek.awards as award (award.key)}
					<div class="card">
						<div class="awardHeader">
							<span class="emoji">{award.emoji}</span>
							<span class="title">{award.title}</span>
						</div>
						<p class="blurb">{award.blurb}</p>
						<div class="winner" onclick={() => gotoManager({ year, leagueTeamManagers, rosterID: award.rosterID })}>
							<img class="avatar" src={teamAvatar(award.rosterID)} alt={teamName(award.rosterID)} />
							<div class="winnerInfo">
								<span class="winnerName">{teamName(award.rosterID)}</span>
								<span class="stat">{award.stat}</span>
								{#if award.opponentRosterID != null}
									<span class="vs">vs. {teamName(award.opponentRosterID)}</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		{#if tally && tally.rows.length}
			<div class="tallySection">
				<h3>📊 Season Tally</h3>
				<p class="subhead">Who's racking up the most hardware ({year})</p>
				<div class="tallyWrap">
					<table>
						<thead>
							<tr>
								<th class="teamCol">Team</th>
								{#each tally.awardTypes as type}
									<th title={type.title}><span class="emojiHead">{type.emoji}</span></th>
								{/each}
								<th class="totalCol">Total</th>
							</tr>
						</thead>
						<tbody>
							{#each tally.rows as row (row.rosterID)}
								<tr>
									<td class="teamCol">
										<div class="teamCell" onclick={() => gotoManager({ year, leagueTeamManagers, rosterID: row.rosterID })}>
											<img class="tallyAvatar" src={teamAvatar(row.rosterID)} alt={teamName(row.rosterID)} />
											<span class="tallyName">{teamName(row.rosterID)}</span>
										</div>
									</td>
									{#each tally.awardTypes as type}
										<td class={row.counts[type.key] ? '' : 'zero'}>{row.counts[type.key] || 0}</td>
									{/each}
									<td class="totalCol">{row.total}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	{/if}
</div>
