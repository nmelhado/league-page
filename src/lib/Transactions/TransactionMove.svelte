<script>
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

	export let move, leagueTeamManagers, players, season;

	const getAvatar = (pos, player) => {
		if(pos == 'DEF') {
			return `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)`;
		}
		return `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`;
	}

    let origin, dest;

    for(let i = 0; i < move.length; i++) {
        if(move[i] && move[i] == "origin") origin = i;
        if(move[i] && (move[i].pick || move[i].player || move[i].budget)) {
            dest = i;
        }
    }

    const checkL = (cell, ix) => {
        // if the cell is lower than the origin and destination
        // or higher than both, it shouldn't have a line
        if(!cell) {
            if(ix < origin && ix < dest) return true;
            if(ix > origin && ix > dest) return true;
            return false;
        }
        // if this is the origin cell
        if(ix == origin) {
            return dest > origin;
        }
        // otherwise, it's the destination cell
        return ix < origin;
    }

    const checkR = (cell, ix) => {
        // if the cell is lower than the origin and destination
        // or higher than both, it shouldn't have a line
        if(!cell) {
            if(ix < origin && ix < dest) return true;
            if(ix > origin && ix > dest) return true;
            return false;
        }
        // if this is the origin cell
        if(ix == origin) {
            return dest < origin;
        }
        // otherwise, it's the destination cell
        return ix > origin;
    }

    const getNumEnd = (num) => {
        switch (num) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }
</script>

<style>
	.move {
		text-align: center;
        padding: 0;
        vertical-align: top;
	}

	.originalOwner {
		color: #aaa;
		font-style: italic;
	}

	.line {
		height: 2px;
        width: 50%;
        background-color: var(--aaa);
        position: absolute;
        top: 34px;
	}

    .lineL {
        left: 0;
    }

    .lineR {
        right: 0;
    }

	.indicator {
		vertical-align: middle;
	}

    .nameHolder {
        margin: 4px 0 0;
        display: inline-flex;
        justify-content: center;
        line-height: 1.1em;
        flex-wrap: wrap;
        font-size: 0.8em;
    }

    .pickNameHolder {
        margin: 4px 0 0;
        display: inline-flex;
        flex-direction: column;
        font-size: 0.8em;
        line-height: 1em;
    }

    .tradeSlot {
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        width: 50px;
        background-position: center;
        border: 2px solid;
        border-radius: 100%;
        position: relative;
        border-color: var(--aaa);
        background-color: var(--eee);
    }

    .playerAvatar {
        background-repeat: no-repeat;
        background-size: auto 50px;
    }

    .playerSlot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .playerInfo {
        font-size: 0.8em;
        color: var(--g555);
        padding: 0 1em;
    }

    .indicator {
        position: absolute;
        bottom: -8px;
        right: -8px;
        color: #00ceb8;
        background-color: white;
        border-radius: 50%;
    }

    .avatarHolder {
        text-align: center;
    }

    .cellParent {
        position: relative;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 8px 0 0;
    }

    .origin {
        border-style: dashed;
        background-color: var(--fff);
        height: 30px;
        width: 30px;
        margin-top: 10px;
    }

    .hidden {
        background: none;
    }

    .round {
        font-size: 1em;
        color: var(--ccc);
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        bottom: 0%;
    }

    .budget {
        font-size: 1.4em;
        color: var(--ccc);
        position: absolute;transform: translate(-50%, -50%) rotate(-45deg);
        left: 50%;
        bottom: 0%;
    }

    .pickInfo {
        padding: 0;
        font-size: 1.6em;
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
        color: var(--g444);
        font-weight: 500;
    }

    .pick {
        border-color: var(--PICKSfade);
    }

    .budgetHolder {
        border-color: var(--Budget);
    }

    .numEnd {
        position: absolute;
        top: -1em;
        right: -1em;
        font-size: 0.3em;
    }

    .direction {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        font-size: 2.5em;
        color: var(--ccc);
    }

    @media (max-width: 420px) {
        .nameHolder {
            font-size: 0.7em;
        }
    }
</style>

<tr>
	{#each move as cell, ix}
        <td class="move">
            <div class="cellParent">
                <div class="line lineL {checkL(cell, ix) ? "hidden" : ""}" />
                <div class="line lineR {checkR(cell, ix) ? "hidden" : ""}" />
                {#if cell && cell.player}
                    <div class="playerSlot">
                            <div class="tradeSlot playerAvatar" style="border-color: var(--{players[cell.player].pos}); {getAvatar(players[cell.player].pos, cell.player)}">
                                <i class="indicator material-icons" aria-hidden="true">add_circle</i>
                            </div>
                        <div class="nameHolder">
                            <span class="name">{`${players[cell.player].fn} ${players[cell.player].ln}`}</span>
                            <span class="playerInfo">
                                <span>{players[cell.player].pos}</span>
                                {#if players[cell.player].t}
                                    -
                                    <span>{players[cell.player].t}</span> 
                                {/if}
                            </span>
                        </div>
                    </div>
                {:else if cell && cell.pick}
                    <div class="playerSlot">
                        <div class="avatarHolder">
                            <div class="tradeSlot pick">
                                <span class="round">Round</span>
                                <span class="pickInfo">
                                    {cell.pick.round}<span class="numEnd">{getNumEnd(cell.pick.round)}</span>
                                </span>
                                <i class="indicator material-icons" aria-hidden="true">add_circle</i>
                            </div>
                        </div>
                        <div class="pickNameHolder">
                            <span class="year">{cell.pick.season}</span>
                            {#if cell.pick.original_owner}
                                <span class="originalOwner">{getTeamFromTeamManagers(leagueTeamManagers, cell.pick.original_owner, season).name}
                                    {getTeamFromTeamManagers(leagueTeamManagers, cell.pick.original_owner, season).name != getTeamFromTeamManagers(leagueTeamManagers, cell.pick.original_owner).name ? ` (${getTeamFromTeamManagers(leagueTeamManagers, cell.pick.original_owner).name})` : ''}
                                </span>
                            {/if}
                        </div>
                    </div>
                {:else if cell && cell.budget}
                    <div class="playerSlot">
                        <div class="avatarHolder">
                            <div class="tradeSlot budgetHolder">
                                <span class="budget">faab</span>
                                <span class="pickInfo">
                                    {cell.budget.amount}<span class="numEnd">$</span>
                                </span>
                                <i class="indicator material-icons" aria-hidden="true">add_circle</i>
                            </div>
                        </div>
                    </div>
                {:else if cell && cell == "origin"}
                    <div class="playerSlot">
                        <div class="avatarHolder">
                            <div class="tradeSlot origin">
                                {#if dest - origin < 0}
                                    <i class="direction material-icons" aria-hidden="true">chevron_left</i>
                                {:else}
                                    <i class="direction material-icons" aria-hidden="true">chevron_right</i>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </td>
	{/each}
</tr>
