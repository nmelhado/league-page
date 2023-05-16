<script>
    import AllManagers from '$lib/Managers/AllManagers.svelte';
    import AllTimeRecords from '$lib/Records/AllTimeRecords.svelte';
	import { gotoManager } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
	import TransactionMove from './TransactionMove.svelte';
    import Transactions from './Transactions.svelte';

	export let transactions, players, leagueTeamManagers;
    
    //let playersTraded = []
    
 //   const mostTradedPlayers = (transaction) => {
	//	if(transaction.length === 0) return null;
	//	var playersTradedCount = {};
 //       //var playersTraded = [];
	//	for (var i = 0; i < transaction.moves.length; i++) {
 //           var test = transaction.moves.length;
 //           for (var j = 0; j < transaction.moves[i].length; j++) {
 //               var test3 = transaction.moves[i][j]
 //               if (transaction.moves[i][j].player){
 //                   playersTraded.push(transaction.moves[i][j].player)
 //               }
 //               var test2 = transaction.moves[i].length;
 //           }
 //       }

	//	for (const num of playersTraded)
	//	{
	//		playersTradedCount[num] = playersTradedCount[num] ? playersTradedCount[num] + 1 : 1;
	//	}
	//	playersTraded = playersTraded.push(playersTradedCount);
	//	return playersTraded;
	//}

 //   let playersTraded2 = []
 //   playersTraded2 = playersTraded2.push(mostTradedPlayers(transactions));

	const mostTradedPlayers = (transaction) => {
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
</script>

<style>
    .tradeTransaction {
        display: flex;
        position: relative;
        flex-direction: column;
        margin-bottom: 1em;
    }
    
    .name {
        position: relative;
        text-align: center;
    }

    .avatar {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        border: 2px solid var(--blueOne);
        background-color: var(--fff);
    }

    .ownerName {
        display: inline-block;
        font-weight: normal;
        line-height: 1em;
        margin: 0.2em;
    }

    .currentOwner {
        font-style: italic;
        color: var(--aaa);
        font-size: 0.7em;
    }

    .clickable {
        cursor: pointer;
    }

    .date {
        color: var(--g999);
        font-style: italic;
        font-size: 0.7em;
        text-align: center;
        padding: 0.7em 0 1em;
        background-color: var(--fff);
        border-radius: 0 0 0 40px;
        border-left: 2px solid var(--blueOne);
        border-right: 1px solid var(--ddd);
        margin-bottom: 3em;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        /*
            the height setting is ignored, but
            allows the holder class div to have
            a height of 100%
        */
        height: 1px;
    }

    tbody {
        background-color: var(--fff);
        border-top: 2px solid var(--blueOne);
        border-left: 2px solid var(--blueOne);
        border-right: 1px solid var(--ddd);
    }

    .holder {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    @media (max-width: 420px) {
        .ownerName {
            font-size: 0.8em;
        }
    }
</style>

<div class="tradeTransaction">
    <table>
        <thead>
            <tr>
                {#each Object.entries(playersTraded2) as [player,count]}
                    <h1>{player}</h1>
                    <p>{count}</p>
                {/each}
            </tr>
        </thead>
    </table>
</div>