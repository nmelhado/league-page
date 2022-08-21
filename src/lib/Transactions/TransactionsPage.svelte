<script>
	import Textfield from '@smui/textfield';
  	import Icon from '@smui/textfield/icon';
	import Transaction from './Transaction.svelte';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Pagination from '../Pagination.svelte';
	import { match } from 'fuzzyjs';
	import { goto } from '$app/navigation';
	import { getLeagueTransactions, loadPlayers } from '$lib/utils/helper';

	export let masterOffset = 0, show, playersInfo, query, queryPage, transactions, currentManagers, stale, perPage, postUpdate=false;
	const oldQuery = query;
	let page = queryPage || 0;

	const refreshTransactions = async () => {
		const newTransactions = await getLeagueTransactions(false, true);
		transactions = newTransactions.transactions;
		currentManagers = newTransactions.currentManagers;
	}

	if(stale) {
		refreshTransactions();
	}

	let players = playersInfo.players;

	const refreshPlayers = async () => {
		const newPlayersInfo = await loadPlayers(true);
		players = newPlayersInfo.players;
	}

	if(playersInfo.stale) {
		refreshPlayers();
	}

	// filtered subset based on search
	let subsetTransactions = [];

	let totalTransactions = 0;

	const setFilter = (filterBy, transactions) => {
		if(filterBy == "both") {
			return transactions;
		} else {
			return transactions.filter( transaction => transaction.type == filterBy);
		}
	}

	// filtered subset based on filter
	$: filteredTransactions = setFilter(show, transactions);

	const setQuery = (query, filteredTransactions) => {
		if(!filteredTransactions) {
			return [];
		}
		if(query && query.trim() != "") {
			subsetTransactions = filteredTransactions.filter( transaction => checkForQuery(transaction));
			totalTransactions = subsetTransactions.length;
		} else {
			subsetTransactions = filteredTransactions;
			totalTransactions = subsetTransactions.length;
		}

		const start = page * perPage;
		const end = (page + 1) * perPage;
		return subsetTransactions.slice(start, end);
	}
	$: displayTransactions = setQuery(query, filteredTransactions);

	const changePage = (dest, pageChange = false) => {
		if(queryPage == dest && pageChange) return;
		page = dest;
		if(dest > (filteredTransactions.length / perPage) || dest < 0) {
			page = 0;
		}
		displayTransactions = setQuery(query, filteredTransactions);
		if(postUpdate) {
			setTimeout(() => {goto(`/transactions?show=${show}&query=${query}&page=${page+1}`, {noscroll: true,  keepfocus: true})}, 800);
		}
	}

	let lastUpdate = new Date;

	const search = () => {
		lastUpdate = new Date;
		query = query.trimLeft();
		if(query.trim() == oldQuery) return;
		page = 0;
		if(postUpdate) {
			updateQueryParam(false);
		}
	}

	let called = false;

	const updateQueryParam = (stack = true) => {
		if(called && !stack) {
			return;
		}
		called = true;
		const FIVE_SECONDS = 5 * 1000; /* five seconds */
		if(((new Date) - lastUpdate) > FIVE_SECONDS) {
			called = false;
			goto(`/transactions?show=${show}&query=${query.trim()}&page=${page+1}`, {noscroll: true,  keepfocus: true});
			return;
		}
		return setTimeout(updateQueryParam, 2000); // check every 2 seconds
	}

	const clearSearch = () => {
		query = "";
		if(postUpdate) {
			goto(`/transactions?show=${show}&query=&page=${page+1}`, {noscroll: true,  keepfocus: true});
		}
	}
	
	const checkMatch = (query, name) => {
		const nameMatch = match(query, name)
		if(nameMatch.match && nameMatch.score > 0) {
			(nameMatch.score);
			return true;
		}
	}

	const checkForQuery = (transaction) => {
		const moves = transaction.moves;
		for(const move of moves) {
			for(const col of move) {
				if(!col?.player) continue;
				return checkMatch(query, `${players[col.player].fn} ${players[col.player].ln}`);
			}
		}
		return false;
	}

	$: changePage(page, true);

	$: setQuery(query);

    let el;

    $: top = el?.getBoundingClientRect() ? el?.getBoundingClientRect().top  : 0;

	const setShow = (val) => {
		show = val;
		page = 0;
		changePage(0);
	}
</script>

<style>
	.transactionsParent {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		width: 100%;
		z-index: 1;
		overflow-y: hidden;
	}

    @media (max-width: 1000px) {
    }

	.transactions {
		flex-grow: 1;
		padding: 0 15px;
	}

	p {
		text-align: center;
	}

	h5 {
		text-align: center;
		margin: 30px auto 16px;
	}

	.buttons {
		margin: 40px auto 0;
	}

	:global(.disabled) {
		pointer-events: none;
	}

	.invis-buttons {
		display: none !important;
	}

	.searchContainer {
		width: 100%;
		text-align: center;
		margin: 2em 0 .5em;
	}

	.clearPlaceholder {
		width: 48px;
		display: inline-block;
	}
	
	.empty {
		width: 100%;
		font-style: italic;
		text-align: center;
		color: #999;
	}
</style>

<div class="transactionsParent">
	<div class="buttons {show == "trade" ? "" : "invis-buttons"}">
		<Button class="{show == "trade" ? "disabled" : ""}" color="primary" on:click={() => setShow("trade")} variant="{show == "trade" ? "raised" : "outlined"}" touch>
			<Label>Trades</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers</Label>
		</Button>
		<Button class="{show == "both" ? "disabled" : ""}" color="primary" on:click={() => setShow("both")} variant="{show == "both" ? "raised" : "outlined"}" touch>
			<Label>Both</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers Costs</Label>
		</Button>
	</div>
	<div class="buttons {show == "waiver" ? "" : "invis-buttons"}">
		<Button class="{show == "trade" ? "disabled" : ""}" color="primary" on:click={() => setShow("trade")} variant="{show == "trade" ? "raised" : "outlined"}" touch>
			<Label>Trades</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers</Label>
		</Button>
		<Button class="{show == "both" ? "disabled" : ""}" color="primary" on:click={() => setShow("both")} variant="{show == "both" ? "raised" : "outlined"}" touch>
			<Label>Both</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers Costs</Label>
		</Button>
	</div>
	<div class="buttons {show == "both" ? "" : "invis-buttons"}">
		<Button class="{show == "trade" ? "disabled" : ""}" color="primary" on:click={() => setShow("trade")} variant="{show == "trade" ? "raised" : "outlined"}" touch>
			<Label>Trades</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers</Label>
		</Button>
		<Button class="{show == "both" ? "disabled" : ""}" color="primary" on:click={() => setShow("both")} variant="{show == "both" ? "raised" : "outlined"}" touch>
			<Label>Both</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers Costs</Label>
		</Button>
	</div>
	<div class="buttons {show == "waiver claims" ? "" : "invis-buttons"}">
		<Button class="{show == "trade" ? "disabled" : ""}" color="primary" on:click={() => setShow("trade")} variant="{show == "trade" ? "raised" : "outlined"}" touch>
			<Label>Trades</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers</Label>
		</Button>
		<Button class="{show == "both" ? "disabled" : ""}" color="primary" on:click={() => setShow("both")} variant="{show == "both" ? "raised" : "outlined"}" touch>
			<Label>Both</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver claims" ? "raised" : "outlined"}" touch>
			<Label>Waivers Costs</Label>
		</Button>
	</div>
	<div class="searchContainer">
		<span class="clearPlaceholder" />
		<Textfield
			class="shaped-outlined"
			variant="outlined"
			bind:value={query}
			label="Search for a player..."
			on:input={() => search()}
		>
			<Icon class="material-icons" slot="leadingIcon">search</Icon>
		</Textfield>
		{#if query.length > 0}
			  <IconButton class="material-icons" on:click={() => clearSearch()}>clear</IconButton>
		{:else}
			<span class="clearPlaceholder" />
		{/if}
	</div>

	<div class="transactions" bind:this={el}>
		{#if show == "both"}
			<!-- trades -->
			<h5>Recent Transactions</h5>
		{:else if show == "trade"}
			<!-- trades -->
			<h5>Recent Trades</h5>
		{:else}
			<!-- waiver -->
			<h5>Recent Waivers</h5>
		{/if}

		<Pagination {perPage} total={totalTransactions} bind:page={page} target={top} scroll={false} />
		<div class="transactions-child">
			{#each displayTransactions as transaction (transaction.id)}
				<Transaction {players} {transaction} masterOffset={masterOffset + 15} {currentManagers} />
			{/each}
		</div>
		<Pagination {perPage} total={totalTransactions} bind:page={page} target={top} scroll={true} />

	</div>

	{#if totalTransactions == 0}
		{#if show == "trade"}
			<p class="empty">{query.trim() != "" ? "No trades match your search" : "Nobody has made any trades yet... that's just sad" }</p>
		{:else if show == "waiver"}
			<p class="empty">{query.trim() != "" ? "No waivers match your search" : "Nobody has made any waiver wire moves yet... that's just sad" }</p>
		{:else}
			<p class="empty">{query.trim() != "" ? "No transactions match your search" : "Nobody has made any moves yet... that's just sad" }</p>
		{/if}
	{/if}
</div>