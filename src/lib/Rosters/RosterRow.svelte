<script>
	import { Row, Cell } from '@smui/data-table';
	
	export let player;
</script>

<style>
	.playerAvatar {
		vertical-align: middle;
		height: 45px;
		width: 45px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 45px;
	}
	.position {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		width: 46px;
		height: 32px;
	}

	:global(.QB) {
		background-color: #ff2a6d;
	}

	:global(.WR) {
		background-color: #58a7ff;
	}

	:global(.RB) {
		background-color: #00ceb8;
	}

	:global(.TE) {
		background-color: #ffae58;
	}

	:global(.FLEX) {
		background: linear-gradient(to right, #58a7ff, #58a7ff 33.33%, #00ceb8 33.33%, #00ceb8 66.66%, #ffae58 66.66%);
	}

	:global(.WRRB) {
		background: linear-gradient(to right, #58a7ff, #58a7ff 50%, #00ceb8 50%);
	}

	:global(.K) {
		background-color: #bd66ff;
	}

	:global(.S-FLEX) {
		background: linear-gradient(to right, #58a7ff, #58a7ff 25%, #00ceb8 25%, #00ceb8 50%, #ffae58 50%, #ffae58 75%, #ff2a6d);
		background-color: #8f66ff;
	}

	:global(.DEF) {
		background-color: #fff67a;
	}

	:global(.BN) {
		background-color: #b6d0eb;
	}

	:global(.slot) {
		width: 22px !important;
    	padding: 1px 6px 1px 8px !important;
	}
	:global(.avatar) {
		width: 45px;
	}
	:global(.playerCell) {
		height: 45px !important;
		overflow-y: hidden !important;
	}
	:global(.teamCell) {
		max-width: 40px !important;
    	padding: 0 5px;
	}

	:global(.nameCell) {
    	padding: 0 5px;
	}

	:global(span.nickname) {
		color: #888;
		font-style: italic;
		font-size: 0.8em;
	}

	:global(.injury) {
		font-style: italic;
		font-weight: 700;
		font-size: 0.7em;
		margin-left: 0.5em;
		vertical-align:super;
	}

	:global(.Q) {
		color: #c09111;
	}

	:global(.OUT) {
		color: #851313;
	}

	:global(.IR) {
		color: #851313;
	}

	:global(.PUP) {
		color: #851313;
	}

	@media (max-width: 460px) {
		:global(.nameCell) {
			font-size: 0.9em;
		}
	}

</style>

<Row>
	<Cell class="slot playerCell"><span class="position {player.slot.replace('/', '').replace('SUPER_', 'S-')}">{player.slot.replace('SUPER_', 'S ')}</span></Cell>
	{#if player.avatar}
		<Cell class="avatar playerCell"><div class="playerAvatar" style="{player.avatar}" /></Cell>
	{/if}
	{#if player.positions != "DEF"}
		<Cell class="playerCell teamCell">{player.team || ''}</Cell>
	{/if}
	<Cell class="playerCell nameCell" colspan={player.name != "Empty" ? (player.positions == "DEF" ? 2 : 1) : 3}>{@html player.name}</Cell>
</Row>