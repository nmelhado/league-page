<script>
	import { Row, Cell } from '@smui/data-table';
	
	export let player;

	const playerSLotClass = player.slot.replace('/', '').replace('SUPER_', 'S-').replace('REC_', 'R-');
	const playerSlot = player.slot.replace('SUPER_', 'S ').replace('REC_', 'R ');
</script>

<style>
	.playerAvatar {
        position: relative;
		vertical-align: middle;
		height: 40px;
		width: 40px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: auto 45px;
        overflow: visible;
	}
    .teamLogo {
        width: 21px;
        position: absolute;
        top: 0;
        right: -16px;
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

	:global(.nameCell) {
    	padding: 0 5px;
	}

	span.nickname {
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

    .additionalInfo {
        display: inline-block;
        font-size: 0.7em;
    }

    /* position text colors */
	.text-QB {
		color: var(--QB);
	}

	.text-WR {
		color: var(--WR);
	}

	.text-RB {
		color: var(--RB);
	}

	.text-TE {
		color: var(--TE);
	}

	.text-K {
		color: var(--K);
	}

	.text-DEF {
		color: var(--DEF);
	}

	.text-DL {
		color: var(--DL);
	}

	.text-LB {
		color: var(--LB);
	}

	.text-DB {
		color: var(--DB);
	}

	@media (max-width: 460px) {
		:global(.nameCell) {
			font-size: 0.9em;
		}
	}

    @media (max-width: 355px) {
        :global(.slot) {
            width: 22px !important;
            padding: 1px 2px 1px 2px !important;
        }
        :global(.avatar) {
            padding: 0px 16px 0px 2px !important;
        }
        .pos {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            width: 42px;
            height: 24px;
            font-size: 0.8em;
        }
		:global(.nameCell) {
			font-size: 0.85em;
		}
    }

</style>

<Row>
	<Cell class="slot playerCell"><span class="pos {playerSLotClass}">{playerSlot}</span></Cell>
	{#if player.avatar}
		<Cell class="avatar playerCell">
            <div class="playerAvatar" style="{player.avatar}">
                {#if player.team && player.poss != "DEF"}
                    <img src="https://sleepercdn.com/images/team_logos/nfl/{player.team.toLowerCase()}.png" class="teamLogo" alt="team logo"/>
                {/if}
            </div>
        </Cell>
	{/if}
	<Cell class="playerCell nameCell" colspan={player.name != "Empty" ? 1 : 3}>
        <div class="info">
            <!-- name -->
            {@html player.name}
            <!-- name -->
            {#if player.poss !== "DEF"}
                <div class="additionalInfo">
                    <span class="text-{player.poss}" >{@html player.poss}</span>
                    {#if player.team}
                        &nbsp;-&nbsp;
                        {player.team}
                    {/if}
                </div>
            {/if}
        </div>
        {#if player.nickname}
            <span class="nickname">"{player.nickname}</span>
        {/if}
    </Cell>
</Row>