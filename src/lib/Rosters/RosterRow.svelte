<script>
	import { Row, Cell } from '@smui/data-table';
	
	export let player;

	const playerSLotClass = player.slot.replace('/', '').replace('SUPER_', 'S-').replace('REC_', 'R-');
	const playerSlot = player.slot.replace('SUPER_', 'S ').replace('REC_', 'R ');
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
	.pos {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		width: 46px;
		height: 32px;
	}

	.QB {
		background-color: var(--QB);
	}

	.WR {
		background-color: var(--WR);
	}

	.RB {
		background-color: var(--RB);
	}

	.TE {
		background-color: var(--TE);
	}

	.FLEX {
		background: linear-gradient(to right, var(--WR), var(--WR) 33.33%, var(--RB) 33.33%, var(--RB) 66.66%, var(--TE) 66.66%);
	}

	.WRRB {
		background: linear-gradient(to right, var(--WR), var(--WR) 50%, var(--RB) 50%);
	}

	.K {
		background-color: var(--K);
	}

	.S-FLEX {
		background: linear-gradient(to right, var(--WR), var(--WR) 25%, var(--RB) 25%, var(--RB) 50%, var(--TE) 50%, var(--TE) 75%, var(--QB));
		background-color: #8f66ff;
	}

	.R-FLEX {
		background: linear-gradient(to right, var(--WR), var(--WR) 50%, var(--TE) 50%);
	}

	.DEF {
		background-color: var(--DEF);
	}

	.DL {
		background-color: var(--DL);
	}

	.LB {
		background-color: var(--LB);
	}

	.DB {
		background-color: var(--DB);
	}

	.IDP {
		background: linear-gradient(to right, var(--DL), var(--DL) 33.33%, var(--LB) 33.33%, var(--LB) 66.66%, var(--DB) 66.66%);
	}

	.BN {
		background-color: var(--BN);
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
	<Cell class="slot playerCell"><span class="pos {playerSLotClass}">{playerSlot}</span></Cell>
	{#if player.avatar}
		<Cell class="avatar playerCell"><div class="playerAvatar" style="{player.avatar}" /></Cell>
	{/if}
	{#if player.poss != "DEF"}
		<Cell class="playerCell teamCell">{player.team || ''}</Cell>
	{/if}
	<Cell class="playerCell nameCell" colspan={player.name != "Empty" ? (player.poss == "DEF" ? 2 : 1) : 3}>{@html player.name}</Cell>
</Row>