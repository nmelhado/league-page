<script>
	import { goto } from '$app/navigation';
	import { getLeagueTransactions, getLeagueTeamManagers, loadPlayers, waitForAll } from '$lib/utils/helpers/helper';
	import LinearProgress from '@smui/linear-progress';
	import { onMount } from 'svelte';
	import TradeTransaction from './TradeTransaction.svelte';
	import WaiverTransaction from './WaiverTransaction.svelte';

	let loading = true;
	let players;
	let transactions;
    let leagueTeamManagers;

	onMount(async () => {
		const [transactionsData, playersData, leagueTeamManagersData] = await waitForAll(getLeagueTransactions(true),loadPlayers(null), getLeagueTeamManagers());
		players = playersData.players;
		transactions = transactionsData.transactions;
        leagueTeamManagers = leagueTeamManagersData;
		loading = false;

		if(transactionsData.stale) {
			const newTransactions = await getLeagueTransactions(true, true);
			transactions = newTransactions.transactions;
		}

		if(playersData.stale) {
			const newPlayersData = await loadPlayers(true);
			players = newPlayersData.players;
		}
	})
</script>

<style>
	.transactions {
		position: relative;
		width: 100%;
		padding: 2rem 1rem;
		max-width: 900px;
		margin: 0 auto;
		color: #f0f0f0;
		font-family: 'Inter', sans-serif;
	}

	p {
		text-align: center;
		font-size: 0.95rem;
		color: var(--ccc);
	}

	h5 {
		text-align: center;
		margin: 2rem auto 1rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #ffffff;
		letter-spacing: 0.5px;
	}

	.link {
		cursor: pointer;
		color: #888;
		padding: 0.5rem 1rem;
		margin-top: 1rem;
		font-weight: 500;
		text-align: center;
		display: inline-block;
		transition: color 0.3s ease;
	}

	.link:hover {
		color: #00bfff;
		text-decoration: underline;
	}

	.nothingYet {
		margin: 4rem 0;
		font-size: 1rem;
		color: var(--g999);
	}
</style>

<div class="transactions">
	{#if loading}
		<p>Loading league transactions...</p>
		<LinearProgress indeterminate />
	{:else}
		<!-- waiver -->
		{#if transactions.waivers.length}
			<h5>Recent Waiver Moves</h5>
			{#each transactions.waivers as transaction }
				<WaiverTransaction {players} {transaction} {leagueTeamManagers} />
			{/each}

			<p onclick={() => goto("/transactions?show=waiver&query=&page=1")} class="link">( view more )</p>
		{:else}
			<p class="nothingYet">No waiver moves have been made yet...</p>
		{/if}

		{#if transactions.waivers.length && transactions.trades.length}
			<br />
		{/if}

		<!-- trades -->
		{#if transactions.trades.length}
			<h5>Recent Trades</h5>
			{#each transactions.trades as transaction }
				<TradeTransaction {players} {transaction} {leagueTeamManagers} />
			{/each}

			<p onclick={() => goto("/transactions?show=trade&query=&page=1")} class="link">( view more )</p>
		{:else}
			<p class="nothingYet">No trades have been made yet...</p>
		{/if}
	{/if}
</div>
