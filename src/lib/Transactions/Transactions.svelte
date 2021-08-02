<script>
	import { goto } from '$app/navigation';
	import { getLeagueTransactions } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';
	import Transaction from './Transaction.svelte';

	export let masterOffset = 0;

	let transactionsData = getLeagueTransactions(true);
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
	{#await transactionsData}
		<p>Loading league transactions...</p>
		<LinearProgress indeterminate />
	{:then {transactions, currentManagers}}
		<!-- waiver -->
		{#if transactions.waivers.length}
			<h5>Recent Waiver Moves</h5>
			{#each transactions.waivers as transaction }
				<Transaction {transaction} {masterOffset} {currentManagers} />
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
				<Transaction {transaction} {masterOffset} currentManagers={currentManagers} />
			{/each}

			<p on:click={() => goto("/transactions?show=trade&query=&page=1")} class="link">( view more )</p>
		{:else}
			<p class="nothingYet">No trades have been made yet...</p>
		{/if}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>