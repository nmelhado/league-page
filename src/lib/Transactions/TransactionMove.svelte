<script>
	import {cleanName} from '$lib/utils/helper';
  	import { Row, Cell } from '@smui/data-table';
	import { Icon } from '@smui/tab';

	export let move, type, masterOffset, currentTeams, players;
	
	let trade = false;
	
	if(type == "trade") {
		trade = true;
	}

	const getAvatar = (pos, player) => {
		if(pos == 'DEF') {
			return `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)`;
		}
		return `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`;
	}

	let origin, destination;

	const offset = 18;
	const originOffset = 10;



	let x1, x2;
    let innerWidth;

    const resize = (width) => {
		x1 = origin?.getBoundingClientRect() && destination?.getBoundingClientRect() ? (destination?.getBoundingClientRect().left > origin?.getBoundingClientRect().left ? origin?.getBoundingClientRect().right + originOffset - masterOffset : origin?.getBoundingClientRect().left - originOffset - masterOffset)  : 0;
		x2 = origin?.getBoundingClientRect() && destination?.getBoundingClientRect() ? (destination?.getBoundingClientRect().left > origin?.getBoundingClientRect().left ? destination?.getBoundingClientRect().left - offset - masterOffset : destination?.getBoundingClientRect().right + offset - masterOffset)  : 0;
    }

    $: resize(innerWidth);
    $: resize(masterOffset);

	const y = -28;
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	:global(.move) {
		text-align: center;
	}

	:global(.originalOwner) {
		color: #aaa;
		font-style: italic;
	}

	:global(.trade) {
		background-color: var(--fff);
	}

	:global(.Added) {
		background-color: var(--waiverAdd);
	}

	:global(.Dropped) {
		background-color: var(--waiverDrop);
	}

	.lineParent {
		position: absolute;
		overflow: visible;
		width: 1px;
		height: 1px;
		pointer-events: none;
	}

	.line{
		position: absolute;
		z-index: 2;
	}

	.playerAvatar {
		display: inline-block;
		vertical-align: middle;
		height: 35px;
		width: 35px;
		background-position: center;
		border-radius: 100%;
		background-repeat: no-repeat;
		background-size: auto 35px;
	}

	.name {
		white-space: normal;
	}

	.pos {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		width: 32px;
		height: 24px;
	}

	:global(.QB) {
		background-color: var(--QB);
	}

	:global(.WR) {
		background-color: var(--WR);
	}

	:global(.RB) {
		background-color: var(--RB);
	}

	:global(.TE) {
		background-color: var(--TE);
	}

	:global(.FLEX) {
		background: linear-gradient(to right, var(--WR), var(--WR) 33.33%, var(--RB) 33.33%, var(--RB) 66.66%, var(--TE) 66.66%);
	}

	:global(.WRRB) {
		background: linear-gradient(to right, var(--WR), var(--WR) 50%, var(--RB) 50%);
	}

	:global(.K) {
		background-color: var(--K);
	}

	:global(.DEF) {
		background-color: var(--DEF);
	}

	:global(.indicator) {
		vertical-align: middle;
	}

	.nameHolder {
		margin: 6px 0;
    	display: inline-block;
	}

	.destination {
		display: block;
		margin: 0 auto;
		width: 0px;
		height: 2px;
	}
</style>

<Row>
	{#each move as cell}
		{#if cell && cell.player}
			<Cell class="move {cell.type}">
				<span class="nameHolder">
					{#if cell.type == "Added"}
						<Icon class="indicator material-icons">arrow_drop_up</Icon>
					{:else if cell.type == "Dropped"}
						<Icon class="indicator material-icons">arrow_drop_down</Icon>
					{/if}
					{cell.type == "Added" || cell.type == "Dropped" ?  cell.type + `${cell.bid ? " " + cell.bid + "$" : ""}` : ""}
					{#if cell.type == "Added"}
						<Icon class="indicator material-icons">arrow_drop_up</Icon><br />
					{:else if cell.type == "Dropped"}
						<Icon class="indicator material-icons">arrow_drop_down</Icon><br />
					{/if}
					<span class="pos {players[cell.player].pos}">{players[cell.player].pos}</span> 
					<div class="playerAvatar" style="{getAvatar(players[cell.player].pos, cell.player)}" />
					<br />
					<span class="name" bind:this={origin}>{`${players[cell.player].fn} ${players[cell.player].ln}`}</span>
				</span>
			</Cell>
		{:else if cell && cell.pick}
			<Cell class="move {cell.type}"><span bind:this={origin} class="name">{cell.pick.season} Round {cell.pick.round}{@html cell.pick.original_owner ?  `<br /><span class="originalOwner">(${cell.pick.original_owner.original && cleanName(cell.pick.original_owner.original) != cleanName(currentTeams[cell.pick.original_owner.current].name) ? `${cell.pick.original_owner.original} [` : ''}${currentTeams[cell.pick.original_owner.current].name}${cell.pick.original_owner.original && cleanName(cell.pick.original_owner.original) != cleanName(currentTeams[cell.pick.original_owner.current].name)  ? ']' : ''})</span>` : ""}</span></Cell>
		{:else if cell && cell.budget}
			<Cell class="move {cell.type}"><span bind:this={origin} class="name">{cell.budget.amount}</span></Cell>
		{:else if cell && cell == "destination"}
			<Cell class="move trade"><span class="destination" bind:this={destination} /></Cell>
		{:else}
			<Cell class="trade"/>
		{/if}
	{/each}
</Row>

{#if trade}
	<svg class="lineParent">
		<defs>
		  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
		  refX="0" refY="2.5" orient="auto" fill="#ccc">
			<polygon points="0 0, 10 2.5, 0 5" />
		  </marker>
		</defs>
		<line stroke-width="2px" stroke="#ccc"  x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" class="line" marker-end="url(#arrowhead)"/>
	</svg>
{/if}






