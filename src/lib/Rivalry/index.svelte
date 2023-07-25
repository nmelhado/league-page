<script>
	import Matchup from "$lib/Matchups/Matchup.svelte";
	import TradeTransaction from "$lib/Transactions/TradeTransaction.svelte";
	import { getLeagueRecords, getLeagueTransactions, getRivalryMatchups, loadPlayers, round } from "$lib/utils/helper";
	import { getRosterIDFromManagerIDAndYear } from "$lib/utils/helperFunctions/universalFunctions";
	import LinearProgress from '@smui/linear-progress';
	import { onMount } from "svelte";
	import ComparissonBar from "./ComparissonBar.svelte";
	import ManagerSelectors from "./ManagerSelectors.svelte";
	import RivalryControls from "./RivalryControls.svelte";

	export let leagueTeamManagers, playersInfo, transactionsInfo, recordsInfo, playerOne, playerTwo;

    // refresh stale data
    onMount(async () => {
        if(transactionsInfo.stale) {
            transactionsInfo = await getLeagueTransactions(false, true);
        }
        if(playersInfo.stale) {
            playersInfo = await loadPlayers(null, true);
        }
        if(recordsInfo.stale) {
            recordsInfo = await getLeagueRecords(true);
        }
    })

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

    $: matchup = rivalry?.matchups[selected]?.matchup;
    $: displayWeek = rivalry?.matchups[selected]?.week;
    $: year = rivalry?.matchups[selected]?.year;
    
    const setTradeHistory = (p1, p2) => {
        if(!p1 || !p2) {
            return [];
        }
        const trades = transactionsInfo.transactions.filter( transaction => {
            if(transaction.type !== "trade") {
                return false;
            }
            const rosterIDOne = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerOne, transaction.season));
            const rosterIDTwo = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerTwo, transaction.season));
            if(rosterIDOne == rosterIDTwo) {
                return false;
            }
            return transaction.rosters.includes(rosterIDOne) && transaction.rosters.includes(rosterIDTwo);
        });
        const move = (arr, from, to) => {
            arr.splice(to, 0, arr.splice(from, 1)[0]);
        };
        // reorganize trades so that they match the left-right alignment of the rivalry page
        return trades.map(t => {
            const rosterIDOne = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerOne, t.season));
            const rosterIDTwo = parseInt(getRosterIDFromManagerIDAndYear(leagueTeamManagers, playerTwo, t.season));
            const rosterOneStartLocation = t.rosters.indexOf(rosterIDOne);
            if(rosterOneStartLocation > 0) {
                move(t.rosters, rosterOneStartLocation, 0);
                for(const tradeMove of t.moves) {
                    move(tradeMove, rosterOneStartLocation, 0);
                }
            }
            const rosterTwoStartLocation = t.rosters.indexOf(rosterIDTwo);
            const last = t.rosters.length - 1;
            if(rosterTwoStartLocation < last) {
                move(t.rosters, rosterTwoStartLocation, last);
                for(const tradeMove of t.moves) {
                    move(tradeMove, rosterTwoStartLocation, last);
                }
            }
            return t;
        })
    }

    $: tradeHistory = setTradeHistory(playerOne, playerTwo);

    const performanceOrderOne = [
        {field: "wins", label: "Wins", unit: "wins"},
        {field: "losses", label: "Losses", unit: "losses"},
        {field: "ties", label: "Ties", unit: "ties"},
    ]

    const performanceOrderTwo = [
        {field: "fptsFor", label: "Fantasy Points For", unit: "fpts"},
        {field: "fptsAgainst", label: "Fantasy Points Against", unit: "fpts against"},
    ]

    $: playerOneRecords = recordsInfo?.regularSeasonData?.leagueManagerRecords ? recordsInfo.regularSeasonData.leagueManagerRecords[playerOne] : null;
    $: playerTwoRecords = recordsInfo?.regularSeasonData?.leagueManagerRecords ? recordsInfo.regularSeasonData.leagueManagerRecords[playerTwo] : null;
</script>

<style>
    .scoreBoard {
        width: 97%;
        border-radius: 20px;
        background-color: var(--rivalryBack);
        border: 1px solid var(--aaa);
        margin: 2em auto;
        padding: 2em 0;
        max-width: 1000px;
    }
    h2 {
        text-align: center;
        font-size: 2.4em;
        margin: 1.3em 0 0;
    }
    h3 {
        text-align: center;
        font-size: 1.9em;
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
    .center {
        text-align: center;
    }
    .helmets {
        width: 80%;
        max-width: 800px;
        margin: 0 auto 2em;
    }
    @media (max-width: 650px) {
        h3 {
            font-size: 1.6em;
        }
    }
    @media (max-width: 400px) {
        h2 {
            font-size: 2em;
        }
        h3 {
            font-size: 1.3em;
        }
    }
</style>

<h2>Rivalry</h2>

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
    {:else}
        <div class="center">
            <img class="helmets" src="/helmets.png" alt="placeholder of helmets clashing" />
        </div>
    {/if}
{:else}
    {#if rivalry?.matchups.length > 0 }
        <div class="scoreBoard">
            <h3>Head to Head</h3>
            <!-- wins -->
            <ComparissonBar sideOne={rivalry.wins.one} sideTwo={rivalry.wins.two} label="Wins" unit="wins" />
            <!-- points -->
            <ComparissonBar sideOne={parseFloat(round(rivalry.points.one))} sideTwo={parseFloat(round(rivalry.points.two))} label="Points" unit="pts" />
            <h3>Matchups</h3>
            <RivalryControls bind:selected={selected} {year} {displayWeek} length={rivalry.matchups.length} />
            <Matchup key={`${playerOne}-${playerTwo}`} ix={selected} active={selected} {year} {matchup} players={playersInfo.players} {displayWeek} expandOverride={true} {leagueTeamManagers} />
        </div>
    {/if}
    <div class="scoreBoard">
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
    {#if playerOne && playerTwo && playerOneRecords && playerTwoRecords }
        <div class="scoreBoard">
            <!-- record comparisson -->
            <h3>Performance Comparisson</h3>
            <ComparissonBar
                sideOne={parseFloat(round(
                    playerOneRecords.wins/(playerOneRecords.wins + playerOneRecords.ties + playerOneRecords.losses) * 100
                    ))}
                sideTwo={parseFloat(round(
                    playerTwoRecords.wins/(playerTwoRecords.wins + playerTwoRecords.ties + playerTwoRecords.losses) * 100
                    ))}
                label="Win Percentage"
                unit="%"
            />
            {#each performanceOrderOne as stat }
                <ComparissonBar
                    sideOne={parseFloat(round(playerOneRecords[stat.field]))}
                    sideTwo={parseFloat(round(playerTwoRecords[stat.field]))}
                    label={stat.label}
                    unit={stat.unit}
                />
            {/each}
            <ComparissonBar
                sideOne={parseFloat(round(
                    playerOneRecords.fptsFor/(playerOneRecords.wins + playerOneRecords.ties + playerOneRecords.losses)
                    ))}
                sideTwo={parseFloat(round(
                    playerTwoRecords.fptsFor/(playerTwoRecords.wins + playerTwoRecords.ties + playerTwoRecords.losses)
                    ))}
                label="Fantasy Points per Game"
                unit="fpts/game"
            />
            {#each performanceOrderTwo as stat }
                <ComparissonBar
                    sideOne={parseFloat(round(playerOneRecords[stat.field]))}
                    sideTwo={parseFloat(round(playerTwoRecords[stat.field]))}
                    label={stat.label}
                    unit={stat.unit}
                />
            {/each}
            <ComparissonBar
                sideOne={parseFloat(round(
                    playerOneRecords.fptsFor/playerOneRecords.potentialPoints * 100
                    ))}
                sideTwo={parseFloat(round(
                    playerTwoRecords.fptsFor/playerTwoRecords.potentialPoints * 100
                    ))}
                label="Lineup IQ"
                unit="%"
            />
        </div>
    {/if}
{/if}
