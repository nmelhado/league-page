<script>
    import Awards from '$lib/Awards/Awards.svelte';
    import Bar from '$lib/Bar.svelte';
    import AllManagers from '$lib/Managers/AllManagers.svelte';
    import AllTimeRecords from '$lib/Records/AllTimeRecords.svelte';
	import { gotoManager } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
	import TransactionMove from './TransactionMove.svelte';
    import Transactions from './Transactions.svelte';
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

	export let playersTraded2, players, leagueTeamManagers;

    const getAvatar = (pos, player) => {
		if(pos == 'DEF') {
			return `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)`;
		}
		return `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`;
	}
    
    let entries = Object.entries(playersTraded2);
    let sorted = entries.sort((a, b) => b[1] - a[1]);
</script>

<style>
    .mostTraded {
        display: flex;
        position: relative;
        flex-direction: column;
        margin-bottom: 1em;
    }

/*    .nameHolder {
        margin: 4px 0 0;
        display: inline-flex;
        justify-content: center;
        line-height: 1.1em;
        flex-wrap: wrap;
        font-size: 0.8em;
    }*/

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

/*    .playerSlot {
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

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        height: 1px;
    }

    tbody {
        background-color: var(--fff);
        border-top: 2px solid var(--blueOne);
        border-left: 2px solid var(--blueOne);
        border-right: 1px solid var(--ddd);
    }

    @media (max-width: 420px) {
        .nameHolder {
            font-size: 0.7em;
        }
    }*/
</style>

<div class="mostTraded">
    <DataTable class="dataTable" table$aria-label="Most Traded Players" style="max-width: 100%;">
        <Head>
            <Row>
                <Cell>Player</Cell>
                <Cell>Trade Count</Cell>
            </Row>
        </Head>
        <Body>
            {#each sorted as [player, count]}
                <Row>
                    <Cell>
                        <div class="tradeSlot playerAvatar" style="border-color: var(--{players[player].pos}); {getAvatar(players[player].pos, player)}"></div>
                        {`${players[player].fn} ${players[player].ln}`}
                        </Cell>
                    <Cell>{count}</Cell>
                </Row>
            {/each}
        </Body>
    </DataTable>
   <!-- <table>
        <thead>
            <tr>
                <th>Player</th>
                <th>Trade Count</th>
            </tr>
        </thead>
        <tbody>
            {#each sorted as [player, count]}
                <td class="move">
                    <div class="cellParent">
                        {#if player}
                            <div class="playerSlot">
                                    <div class="tradeSlot playerAvatar" style="border-color: var(--{players[player].pos}); {getAvatar(players[player].pos, player)}">
                                    </div>
                                <div class="nameHolder">
                                    <span class="name">{`${players[player].fn} ${players[player].ln}`}</span>
                                    <span class="playerInfo">
                                        <span>{players[player].pos}</span>
                                        {#if players[player].t}
                                            -
                                            <span>{players[player].t}</span> 
                                        {/if}
                                    </span>
                                </div>
                            </div>
                        {/if}
                    </div>
                </td>
                <td class="playerCount">
                    <div class="playerCountParent">
                        {#if count}
                            <div class="playerCountSlot">
                                <div class="countHolder">
                                    <span class="countSpan">
                                        {count}
                                    </span>
                                </div>
                            </div>
                        {/if}
                    </div>
                </td>
	        {/each}
        </tbody>
    </table>-->
</div>