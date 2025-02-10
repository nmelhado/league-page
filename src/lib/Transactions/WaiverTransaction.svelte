<script>
	import { gotoManager } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

	export let transaction, players, leagueTeamManagers;

    const owner = transaction.rosters[0];

    const getAvatar = (pos, player) => {
        if(pos == 'DEF') {
            return `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)`;
        }
        return `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`;
    }
</script>

<style>
    .waiverTransaction {
        display: flex;
        flex-direction: column;
        margin-bottom: 1em;
    }
    
    .name {
        position: relative;
    }

    .core {
        display: flex;
        flex-direction: column;
        border-radius: 0 0 0 40px;
        border: 1px solid var(--ddd);
        border-left: 2px solid var(--blueTwo);
        border-bottom: none;
        background-color: var(--fff);
    }

    .avatarAndDetails {
        display: flex;
        padding: 25px 0 0;
        flex-direction: column;
        justify-content: end;
    }

    .avatar {
        position: absolute;
        left: 0px;
        top: 6px;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        border: 2px solid var(--blueTwo);
        background-color: var(--fff);
    }

    .ownerName {
        display: inline-block;
        border-bottom: 2px solid var(--blueTwo);
        margin: 0 0 0 22px;
        padding-right: 30px;
        padding-left: 30px;
    }

    .playerAvatar {
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        width: 50px;
        background-position: center;
        border: 2px solid;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: auto 50px;
        position: relative;
    }

    .currentOwner {
        font-style: italic;
        color: var(--aaa);
    }

    .clickable {
        cursor: pointer;
    }

    .details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        padding: 0 10%;
    }

    .player {
        display: flex;
    }

    .playerName {
        font-size: 0.8em;
        line-height: 1em;
        text-align: center;
    }

    .playerInfo {
        font-size: 0.6em;
        color: var(--g555);
        line-height: 1em;
    }

    .add {
        color: #00ceb8;
    }

    .drop {
        color: #ff2a6d;
    }

    .indicator {
        position: absolute;
        bottom: -8px;
        right: -8px;
    }

    .nameHolder {
        display: flex;
        flex-direction: column;
        padding-left: 0.5em;
        justify-content: center;
        align-items: center;
    }

    .bid {
        color: var(--g555);
        font-style: italic;
    }

    .date {
        color: var(--g999);
        font-style: italic;
        font-size: 0.7em;
        text-align: center;
        margin-top: 0.7em;
    }

    @media (max-width: 410px) {
        .player {
            flex-direction: column;
            align-items: center;
        }

        .details {
            width: 90%;
            padding: 0 5%;
        }

        .nameHolder {
            margin-top: 0.5em;
            padding-left: 0;
            font-size: 0.9em;
        }
    }
</style>

<div class="waiverTransaction clickable" on:click={() => gotoManager({year: transaction.season, leagueTeamManagers, rosterID: owner})}>
    <div class="name">
        <span class="ownerName">
            {getTeamFromTeamManagers(leagueTeamManagers, owner, transaction.season).name}
            {#if getTeamFromTeamManagers(leagueTeamManagers, owner, transaction.season).name != getTeamFromTeamManagers(leagueTeamManagers, owner).name}
                <span class="currentOwner">({getTeamFromTeamManagers(leagueTeamManagers, owner).name})</span>
            {/if}
            {#if transaction.moves[0][0].bid}
                <span class="bid">
                    - {transaction.moves[0][0].bid}$
                </span>
            {/if}
        </span>
        <img class="avatar" src="{getTeamFromTeamManagers(leagueTeamManagers, owner, transaction.season).avatar}" alt="{getTeamFromTeamManagers(leagueTeamManagers, owner, transaction.season).name} avatar"/>
    </div>
    <div class="core">
        <div class="avatarAndDetails">
            <div class="details">
                {#each transaction.moves as move}
                    <div class="player">
                        <div class="playerAvatar" style="border-color: var(--{players[move[0].player].pos}); background-color: var(--{move[0].type == "Added" ? "waiverAdd" : "waiverDrop"}); {getAvatar(players[move[0].player].pos, move[0].player)}">
                            {#if move[0].type == "Added"}
                                <i class="add indicator material-icons" aria-hidden="true">add_circle</i>
                            {:else if move[0].type == "Dropped"}
                                <i class="drop indicator material-icons" aria-hidden="true">do_not_disturb_on</i>
                            {/if}
                        </div>
                        <span class="nameHolder">
                            <span class="playerName">{`${players[move[0].player].fn} ${players[move[0].player].ln}`}</span>
                            <span class="playerInfo">
                                <span>{players[move[0].player].pos}</span>
                                {#if players[move[0].player].t}
                                    -
                                    <span>{players[move[0].player].t}</span> 
                                {/if}
                            </span>
                        </span>
                    </div>
                {/each}
            </div>
        </div>
        <span class="date">
            {transaction.date}
        </span>
    </div>
</div>
