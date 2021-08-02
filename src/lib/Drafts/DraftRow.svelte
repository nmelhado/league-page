<script>
  	import {Row, Cell } from '@smui/data-table';
    export let draftRow, draftType, row, previous=false;
</script>

<style>
    :global(.draftCell) {
        position: relative;
    }

    :global(.changedHands) {
        background-color: #f8fcff;
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
		background-color: #ff8fb2;
	}

	:global(.prevWR) {
		background-color: #afd4ff;
	}

	:global(.prevRB) {
		background-color: #6ccac1;
	}

	:global(.prevTE) {
		background-color: #ffd6aa;
	}

	:global(.prevK) {
		background-color: #deb4ff;
	}

	:global(.prevDEF) {
		background-color: #fffbbc;
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
    }
</style>

<Row>
    {#each draftRow as draftCol, col}
        {#if !previous || draftCol}
            <Cell class="draftCell{draftCol ? ' changedHands' : ''}{previous ? ` prev${draftCol.player.position}` : ''}">
                <span class="draftPos{previous ? "Prev" : ""}">
                    {row}.{draftType == "snake" && row%2 == 0 ? draftRow.length - col : col + 1}{draftCol?.newOwner ? ` ${draftCol.newOwner}` : ''}
                </span>
                {#if draftCol && !previous}
                    <div class="newOwner">{draftCol}</div>
                {/if}
                {#if previous}
                    <div class="playerAvatar" style="{draftCol.player.avatar}" />
                    <br />
                    <div class="name">{draftCol.player.name}{draftCol.player.position == "DEF" ? "" : ` (${draftCol.player.team})`}</div>
                {/if}
            </Cell>
        {/if}
    {/each}
</Row>