<script>
	import Matchup from "$lib/Matchups/Matchup.svelte";
	import TradeTransaction from "$lib/Transactions/TradeTransaction.svelte";
	import { getRivalryMatchups, round } from "$lib/utils/helper";
	import { getRosterIDFromManagerIDAndYear } from "$lib/utils/helperFunctions/universalFunctions";
	import LinearProgress from '@smui/linear-progress';
	import ComparissonBar from "./ComparissonBar.svelte";
	import ManagerSelectors from "./ManagerSelectors.svelte";
	import RivalryControls from "./RivalryControls.svelte";

	export let leagueTeamManagers, playersInfo, transactionsInfo, playerOne, playerTwo;

    let rivalry = null;
    let loading = true;

    const analyzeRivalry = async (p1, p2) => {
        loading = true;
        matchup = null;
        if(p1 && p2) {
            rivalry = await getRivalryMatchups(p1, p2);
            loading = false;
        }
    }

    $: analyzeRivalry(playerOne, playerTwo);

    let selected = 0;

    $: matchup = rivalry?.matchups[selected].matchup;
    $: displayWeek = rivalry?.matchups[selected].week;
    $: year = rivalry?.matchups[selected].year;
    
    const setTradeHistory = (p1, p2) => {
        if(!p1 || !p2) {
            return [];
        }
        return transactionsInfo.transactions.filter( transaction => {
            if(transaction.type !== "trade") {
                return false;
            }
            const rosterIDOne = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerOne, transaction.season));
            const rosterIDTwo = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerTwo, transaction.season));
            return transaction.rosters.includes(rosterIDOne) && transaction.rosters.includes(rosterIDTwo);
        });
    }

    $: tradeHistory = setTradeHistory(playerOne, playerTwo);
</script>

<style>
    .scoreBoard {
        width: 90%;
        border-radius: 20px;
        background-color: var(--rivalryBack);
        border: 1px solid var(--aaa);
        margin: 2em auto;
        padding: 2em 0;
        max-width: 1000px;
    }
    h3 {
        text-align: center;
        font-size: 2.2em;
        margin: 20px 0 16px;
    }
    .trades {
        width: 95%;
        max-width: 750px;
        margin: 2em auto;
    }
	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<div class="rivalrySelection">
    <ManagerSelectors bind:playerOne={playerOne} bind:playerTwo={playerTwo} {leagueTeamManagers} />
</div>

{#if loading }
    {#if playerOne && playerTwo }
        <div class="loading">
            <p>Analyzing rivalry...</p>
            <br />
            <LinearProgress indeterminate />
        </div>
    {/if}
{:else}
    <div class="scoreBoard">
        {#if rivalry?.matchups.length > 0 }
            <h3>Head to Head</h3>
            <!-- wins -->
            <ComparissonBar sideOne={rivalry.wins.one} sideTwo={rivalry.wins.two} label="Wins" unit="wins" />
            <!-- points -->
            <ComparissonBar sideOne={parseFloat(round(rivalry.points.one))} sideTwo={parseFloat(round(rivalry.points.two))} label="Points" unit="pts" />
            <h3>Matchups</h3>
            <RivalryControls bind:selected={selected} {year} {displayWeek} length={rivalry.matchups.length} />
            <Matchup key={`${playerOne}-${playerTwo}`} ix={selected} active={selected} {year} {matchup} players={playersInfo.players} {displayWeek} expandOverride={true} {leagueTeamManagers} />
        {/if}
        {#if playerOne && playerTwo }
            <!-- trades -->
            <h3>Trade History</h3>
            <div class="trades">
                {#each tradeHistory as transaction }
                    <TradeTransaction players={playersInfo.players} {transaction} {leagueTeamManagers} />
                {:else}
                    No trades yet...
                {/each}
            </div>
        {/if}
    </div>
{/if}
