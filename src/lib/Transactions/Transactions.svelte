<script>
	import { goto } from '$app/navigation';
	import { getLeagueTransactions, loadPlayers, waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';
	import { onMount } from 'svelte';
	import Transaction from './Transaction.svelte';

	export let masterOffset = 0;

	let loading = true;
	let players;
	let transactions, currentTeams;

	onMount(async () => {
		const [transactionsData, playersData] = await waitForAll(getLeagueTransactions(true),loadPlayers(null));
		players = playersData.players;
		transactions = transactionsData.transactions;
		currentTeams = transactionsData.currentTeams;
		loading = false;

		if(transactionsData.stale) {
			const newTransactions = await getLeagueTransactions(true, true);
			transactions = newTransactions.transactions;
			currentTeams = newTransactions.currentTeams;
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
		z-index: 1;
	}

	p {
		text-align: center;
	}

	h5 {
		text-align: center;
		margin: 10px auto 16px;
	}

	.link {
		cursor: pointer;
		color: #888;
		padding: 10px 20px;
		margin-bottom: 10px;
	}

	.link:hover {
		color: #00316b;
	}

	.nothingYet {
		margin: 5em 0;
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
				<Transaction {players} {transaction} {masterOffset} {currentTeams} />
			{/each}

			<p on:click={() => goto("/transactions?show=waiver&query=&page=1")} class="link">( view more )</p>
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
				<Transaction {players} {transaction} {masterOffset} currentTeams={currentTeams} />
			{/each}

			<p on:click={() => goto("/transactions?show=trade&query=&page=1")} class="link">( view more )</p>
		{:else}
			<p class="nothingYet">No trades have been made yet...</p>
		{/if}
	{/if}
</div>