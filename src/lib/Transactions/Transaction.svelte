<script>
	import {cleanName, gotoManager} from '$lib/utils/helper';
  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import TransactionMove from './TransactionMove.svelte';

	export let transaction, masterOffset, currentManagers, players;
</script>

<style>
	:global(.transaction) {
		display: block;
		width: 100%;
		margin: 15px auto;
		border: 1px solid var(--ccc);
		box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
	}

	:global(.transaction table) {
		table-layout:fixed !important;
		width: 100%;
	}

	:global(.transactTeam) {
		text-align: center;
		padding: 5px 0;
		background-color: var(--transactHeader);
	}

	:global(.transact-date) {
		text-align: center;
		padding: 5px 0;
		background-color: var(--transactHeader);
		color: #888;
		font-style: italic;
	}

	.avatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 25px;
		width: 25px;
		margin: 0;
		border: 0.25px solid #777;
	}

	.currentOwner {
		display: block;
		font-style: italic;
		font-size: 0.8em;
		color: #aaa;
	}

	.clickable {
		cursor: pointer;
	}
</style>

<DataTable class="transaction">
	<Head class="teams">
		<Row>
			{#each transaction.rosters as owner, ix}
				<Cell class="transactTeam">
					{#if transaction.previousOwners && cleanName(transaction.previousOwners[ix].name) != cleanName(currentManagers[owner].name)}
						<img class="avatar clickable" on:click={() => gotoManager(owner)} src="{transaction.previousOwners[ix].avatar}" alt="{transaction.previousOwners[ix].name} avatar"/>
						<br /><span class="clickable" on:click={() => gotoManager(owner)}>{transaction.previousOwners[ix].name}</span>
						<span class="currentOwner">({currentManagers[owner].name})</span>
					{:else}
						<img class="avatar clickable" on:click={() => gotoManager(owner)} src="{currentManagers[owner].avatar}" alt="{currentManagers[owner].name} avatar"/>
						<br /><span class="clickable" on:click={() => gotoManager(owner)}>{currentManagers[owner].name}</span>
					{/if}
				</Cell>
			{/each}
		</Row>
	</Head>
	<Body class="moves">
		{#each transaction.moves as move}
			<TransactionMove {players} {move} type={transaction.type} {masterOffset} {currentManagers} />
		{/each}
		<Row>
			<Cell class="transact-date" colspan={transaction.rosters.length}>{transaction.date}</Cell>
		</Row>
	</Body>
</DataTable>





