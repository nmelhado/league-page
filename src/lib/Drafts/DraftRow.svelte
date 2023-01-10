<script>
  	import { getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import {Row, Cell } from '@smui/data-table';
    export let draftRow, draftType, row, reversalRound, previous=false, players, year, leagueTeamManagers;
</script>

<style>
    :global(.draftCell) {
        position: relative;
    }

    :global(.changedHands) {
        background-color: var(--draftSwapped);
    }

    .draftPos {
        position: absolute;
        top: 0.3em;
        left: 0.3em;
        font-style: italic;
        color: #aaa;
    }

    .draftPosPrev {
        position: absolute;
        top: 0.1em;
        left: 0.1em;
        font-style: italic;
        color: #444;
    }

    .newOwner {
        font-style: italic;
        color: #444;
        text-align: center;
        white-space: break-spaces;
        line-height: 1.2em;
    }

	:global(.prevQB) {
		background-color: var(--QBfade);
	}

	:global(.prevWR) {
		background-color: var(--WRfade);
	}

	:global(.prevRB) {
		background-color: var(--RBfade);
	}

	:global(.prevTE) {
		background-color: var(--TEfade);
	}

	:global(.prevK) {
		background-color: var(--Kfade);
	}

	:global(.prevDEF) {
		background-color: var(--DEfadeFfade);
	}

    :global(.prevCB) {
        background-color: var(--CBfade);
    }

    :global(.prevSS) {
        background-color: var(--SSfade);
    }

    :global(.prevFS) {
        background-color: var(--FSfade);
    }

    :global(.prevDE) {
        background-color: var(--DEfade);
    }

    :global(.prevDL) {
        background-color: var(--DLfade);
    }

    :global(.prevLB) {
        background-color: var(--LBfade);
    }

	.playerAvatar {
		display: inline-block;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 45%;
		height: 25px;
		width: 25px;
		background-position: center;
		border-radius: 100%;
		background-repeat: no-repeat;
		background-size: auto 25px;
	}

    .name {
        display: block;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        white-space: break-spaces;
        line-height: 1em;
        bottom: 0.5em;
        color: rgba(0, 0, 0, 0.87);
    }
</style>

<Row>
    {#each draftRow as draftCol, col}
        {#if !previous || draftCol}
            <Cell class="draftCell{draftCol ? ' changedHands' : ''}{previous ? ` prev${players[draftCol.player].pos}` : ''}">
                <span class="draftPos{previous ? "Prev" : ""}">
                    {#if draftType == "auction" && previous}
                        ${draftCol.amount}
                    {:else if draftType == "snake" && !reversalRound}
                        {row}.{row % 2 == 0 ? draftRow.length - col : col + 1}{draftCol?.newOwner ? ` ${getTeamNameFromTeamManagers(leagueTeamManagers, draftCol.newOwner, year)}` : ''}
                    {:else if draftType == "snake" && reversalRound}
                        {#if (row < reversalRound && row % 2 == 0) || (row >= reversalRound && row % 2 == 1)}
                            {row}.{draftRow.length - col}
                        {:else}
                            {row}.{col + 1}
                        {/if}
                        {draftCol?.newOwner ? ` ${getTeamNameFromTeamManagers(leagueTeamManagers, draftCol.newOwner, year)}` : ''}
                    {:else}
                        {#if !reversalRound || row < reversalRound}
                            {row}.{col+1}{draftCol?.newOwner ? ` ${getTeamNameFromTeamManagers(leagueTeamManagers, draftCol.newOwner, year)}` : ''}
                        {:else}
                            {row}.{draftRow.length - col}{draftCol?.newOwner ? ` ${getTeamNameFromTeamManagers(leagueTeamManagers, draftCol.newOwner, year)}` : ''}
                        {/if}
                    {/if}
                </span>
                {#if draftCol && !previous}
                    <div class="newOwner">{getTeamNameFromTeamManagers(leagueTeamManagers, draftCol)}</div>
                {/if}
                {#if previous}
                    <div class="playerAvatar" style="{players[draftCol.player].pos == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${draftCol.player.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${draftCol.player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`}" />
                    <br />
                    <div class="name">{`${players[draftCol.player].fn} ${players[draftCol.player].ln}`}{players[draftCol.player].pos == "DEF" ? "" : ` (${players[draftCol.player].t})`}</div>
                {/if}
            </Cell>
        {/if}
    {/each}
</Row>