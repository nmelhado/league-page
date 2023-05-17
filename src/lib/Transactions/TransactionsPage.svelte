<script>
	import Textfield from '@smui/textfield';
  	import Icon from '@smui/textfield/icon';
	import TradeTransaction from './TradeTransaction.svelte';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Pagination from '../Pagination.svelte';
	import { goto } from '$app/navigation';
	import { getLeagueTransactions, loadPlayers } from '$lib/utils/helper';
	import WaiverTransaction from './WaiverTransaction.svelte';
	import MostTradedTransaction from './MostTradedTransaction.svelte';
    import AllManagers from '$lib/Managers/AllManagers.svelte';
    import AllTimeRecords from '$lib/Records/AllTimeRecords.svelte';

	export let show, playersInfo, query, queryPage, transactions, stale, perPage, postUpdate=false, leagueTeamManagers;
	const oldQuery = query;
	let page = queryPage || 0;

	const refreshTransactions = async () => {
		const newTransactions = await getLeagueTransactions(false, true);
		transactions = newTransactions.transactions;
	}

	if(stale) {
		refreshTransactions();
	}

	let players = playersInfo.players;

	const refreshPlayers = async () => {
		const newPlayersInfo = await loadPlayers(null, true);
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
		} else if (filterBy == "most_traded_players") {
			return mostTradedPlayers();
		}  else {
			return transactions.filter( transaction => transaction.type == filterBy);
		}
	}

	// filtered subset based on filter
	$: filteredTransactions = setFilter(show, transactions);

	const setQuery = (query, filteredTransactions) => {
		if(!filteredTransactions) {
			return [];
		}
		if (show == "most_traded_players")
		{
			subsetTransactions = filteredTransactions;
			totalTransactions = Object.keys(filteredTransactions).length

			const start = page * perPage;
			const end = (page + 1) * perPage;
			return Object.entries(filteredTransactions).slice(start, end);
		} else{
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
	}
	$: displayTransactions = setQuery(query, filteredTransactions);

	const mostTradedPlayers = (transaction) => {
		transaction = transactions.filter( transaction => transaction.type == "trade");
		if(transaction.length === 0) return null;
		var playersTradedCount = {};
        var playersTraded = []
		for (var i = 0; i < transaction.length; i++)
		{
			for (var k = 0; k < transaction[i].moves.length; k++)
			{	
				for (var j = 0; j <transaction[i].moves[k].length; j++)
				{
					if (transaction[i].moves[k][j].player) {
						playersTraded.push(transaction[i].moves[k][j].player)
					}
				}
			}
		}

		for (const num of playersTraded)
		{
			playersTradedCount[num] = playersTradedCount[num] ? playersTradedCount[num] + 1 : 1;
		}
		playersTraded = playersTradedCount;
		return playersTraded;
	}

    let playersTraded2 = mostTradedPlayers(transactions);

	const changePage = (dest, pageChange = false) => {
		if (show != "most_traded_players")
		{
			if(queryPage == dest && pageChange) return;
			page = dest;
			if(dest > (filteredTransactions.length / perPage) || dest < 0) {
				page = 0;
			}
			filteredTransactions = setFilter(show, transactions);
			displayTransactions = setQuery(query, filteredTransactions);
			if(postUpdate) {
				goto(`/transactions?show=${show}&query=${query}&page=${page+1}`, {noscroll: true,  keepfocus: true});
			}
		} 
		else
		{
			if(postUpdate) {
				goto(`/transactions?show=${show}`, {noscroll: true,  keepfocus: true});
			}
		}
	}

	let lastUpdate = new Date;

    let timer;

	const debounce = (dest) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
            goto(dest,{noscroll: true,  keepfocus: true});
		}, 750);
	}

	const search = () => {
		lastUpdate = new Date;
		query = query.trimLeft();
		if(query.trim() == oldQuery) return;
		page = 0;
		if(postUpdate) {
            const dest = `/transactions?show=${show}&query=${query.trim()}&page=${page+1}`;
            debounce(dest);
		}
	}

	const clearSearch = () => {
		query = "";
		if(postUpdate) {
			goto(`/transactions?show=${show}&query=&page=${page+1}`, {noscroll: true,  keepfocus: true});
		}
	}

	const checkForQuery = (transaction) => {
		const moves = transaction.moves;
		for(const move of moves) {
			for(const col of move) {
				if(!col?.player) continue;

				name = `${players[col.player].fn} ${players[col.player].ln}`
				query = query.toLowerCase().replace(/\s+/g, '')
				name = name.toLowerCase().replace(/\s+/g, '');
				const nameMatch = name.includes(query)

				if(nameMatch) {
					return true;
				}
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
		<Button class="{show == "most_traded_players" ? "disabled" : ""}" color="primary" on:click={() => setShow("most_traded_players")} variant="{show == "most_traded_players" ? "raised" : "outlined"}" touch>
			<Label>Most Traded Players</Label>
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
		<Button class="{show == "most_traded_players" ? "disabled" : ""}" color="primary" on:click={() => setShow("most_traded_players")} variant="{show == "most_traded_players" ? "raised" : "outlined"}" touch>
			<Label>Most Traded Players</Label>
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
		<Button class="{show == "most_traded_players" ? "disabled" : ""}" color="primary" on:click={() => setShow("most_traded_players")} variant="{show == "most_traded_players" ? "raised" : "outlined"}" touch>
			<Label>Most Traded Players</Label>
		</Button>
	</div>
	<div class="buttons {show == "most_traded_players" ? "" : "invis-buttons"}">
		<Button class="{show == "trade" ? "disabled" : ""}" color="primary" on:click={() => setShow("trade")} variant="{show == "trade" ? "raised" : "outlined"}" touch>
			<Label>Trades</Label>
		</Button>
		<Button class="{show == "waiver" ? "disabled" : ""}" color="primary" on:click={() => setShow("waiver")} variant="{show == "waiver" ? "raised" : "outlined"}" touch>
			<Label>Waivers</Label>
		</Button>
		<Button class="{show == "both" ? "disabled" : ""}" color="primary" on:click={() => setShow("both")} variant="{show == "both" ? "raised" : "outlined"}" touch>
			<Label>Both</Label>
		</Button>
		<Button class="{show == "most_traded_players" ? "disabled" : ""}" color="primary" on:click={() => setShow("most_traded_players")} variant="{show == "most_traded_players" ? "raised" : "outlined"}" touch>
			<Label>Most Traded Players</Label>
		</Button>
	</div>
	<!--{#if show != "most_traded_players"}-->
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
	<!--{/if}-->

	<div class="transactions" bind:this={el}>
		{#if show == "both"}
			<!-- trades -->
			<h5>Recent Transactions</h5>
		{:else if show == "trade"}
			<!-- trades -->
			<h5>Recent Trades</h5>
		{:else if show == "waiver"}
			<!-- waiver -->
			<h5>Recent Waivers</h5>
		{:else}
			<!-- Most Traded Players -->
			<h5>Most Traded Players</h5>
		{/if}

		{#if show == "most_traded_players"}
			<div class="transactions-child">
				<MostTradedTransaction {players} {playersTraded2} />
			</div>
		{:else}
			<Pagination {perPage} total={totalTransactions} bind:page={page} target={top} scroll={false} />
			<div class="transactions-child">
					{#each displayTransactions as transaction (transaction.id)}
						{#if transaction.type == "waiver"}
							<WaiverTransaction {players} {transaction} {leagueTeamManagers} />
						{:else}
							<TradeTransaction {players} {transaction} {leagueTeamManagers} />
						{/if}
					{/each}
			</div>
			<Pagination {perPage} total={totalTransactions} bind:page={page} target={top} scroll={true} />
		{/if}
	</div>

	{#if totalTransactions == 0}
		{#if show == "trade"}
			<p class="empty">{query.trim() != "" ? "No trades match your search" : "Nobody has made any trades yet... that's just sad" }</p>
		{:else if show == "waiver"}
			<p class="empty">{query.trim() != "" ? "No waivers match your search" : "Nobody has made any waiver wire moves yet... that's just sad" }</p>
		{:else if show == "both"}
			<p class="empty">{query.trim() != "" ? "No transactions match your search" : "Nobody has made any moves yet... that's just sad" }</p>
		{:else}
			<p class="empty">{query.trim() != "" ? "No trades match your search" : "Nobody has been traded yet... that's just sad" }</p>
		{/if}
	{/if}
</div>