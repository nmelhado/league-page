<script>
    import Button, { Group, Label } from '@smui/button';
    import BarChart from '../BarChart.svelte'
    import { cleanName, generateGraph, gotoManager, round } from '$lib/utils/helper';

  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import { getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

    export let key, tradesData, waiversData, weekRecords, weekLows, seasonLongRecords, seasonLongLows, showTies, winPercentages, fptsHistories, lineupIQs, prefix, blowouts, closestMatchups, allTime=false, leagueTeamManagers;

    let graphs = [];
    let curTable = 0;
    let curGraph = 0;

    let iqOffset = 0;
    let tables = [
        "Win Percentages",
        "Points",
        "Transactions",
    ]

    const year = allTime ? null : prefix;

    const changeTable = (newGraph) => {
        switch (newGraph) {
            case 0 - iqOffset:
            case (4 + (99 * iqOffset)):
                curTable = 0;
                break;
            case 1 - iqOffset:
            case 2 - iqOffset:
                curTable = 1 - iqOffset;
                break;
            case 3 - iqOffset:
                curTable = 2 - iqOffset;
                break;
            case 5 - (2 * iqOffset):
            case 6 - (2 * iqOffset):
                curTable = 3 - iqOffset;
                break;
            default:
                curTable = 0;
                break;
        }
    }

    const changeGraph = (newTable) => {
        switch (newTable) {
            case 0 - iqOffset:
                if(curGraph == 0 || curGraph == 4) {
                    break;
                }
                curGraph = 0;
                break;
            case 1 - iqOffset:
                if(curGraph == 1 - iqOffset || curGraph == 2 - iqOffset) {
                    break;
                }
                curGraph = 1 - iqOffset;
                break;
            case 2 - iqOffset:
                curGraph = 3 - iqOffset;
                break;
            case 3 - iqOffset:
                if(curGraph == 5 - (2 * iqOffset) || curGraph == 6 - (2 * iqOffset)) {
                    break;
                }
                curGraph = 5 - (2 * iqOffset);
                break;
            default:
                curGraph = 0;
                break;
        }
    }

    const setGraphs = (wD) => {
        const lineupIQGraph = {
            stats: lineupIQs,
            x: "Manager",
            y: "Lineup IQ",
            stat: "%",
            header: "Manager Lineup IQ",
            field: "iq",
            short: "Lineup IQ"
        }

        const potentialPointsGraph = {
            stats: lineupIQs,
            x: "Manager",
            y: "Points",
            stat: "",
            header: "Potential Points vs Points",
            field: "potentialPoints",
            secondField: "fpts",
            short: "Potential Points"
        }

        const winsGraph = {
            stats: winPercentages,
            x: "Manager",
            y: "Wins",
            stat: "",
            header: "Team Wins",
            field: "wins",
            short: "Wins"
        }

        const winPercentagesGraph = {
            stats: winPercentages,
            x: "Manager",
            y: "Win Percentage",
            stat: "%",
            header: "Team Win Percentages",
            field: "percentage",
            short: "Win Percentage"
        }

        const fptsHistoriesGraph = {
            stats: fptsHistories,
            x: "Manager",
            y: "Fantasy Points",
            stat: "",
            header: "Team Fantasy Points",
            field: "fptsFor",
            short: "Fantasy Points"
        }

        const tradesGraph = {
            stats: tradesData,
            x: "Manager",
            y: "# of trades",
            stat: "",
            header: "Trades Managers Have Made",
            field: "trades",
            short: "Trades"
        }

        const waiversGraph = {
            stats: wD,
            x: "Manager",
            y: "# of Waiver Moves",
            stat: "",
            header: "Waivers Managers Have Made",
            field: "waivers",
            short: "Waivers"
        }
        const gs = [];

        if(lineupIQs[0]?.potentialPoints) {
            gs.push(generateGraph(lineupIQGraph, leagueTeamManagers, year));
        }
        gs.push(generateGraph(winsGraph, leagueTeamManagers, year, 5));
        gs.push(generateGraph(winPercentagesGraph, leagueTeamManagers, year));
        gs.push(generateGraph(fptsHistoriesGraph, leagueTeamManagers, year));
        if(lineupIQs[0]?.potentialPoints) {
            gs.push(generateGraph(potentialPointsGraph, leagueTeamManagers, year, 10, 0));
        }
        if(key == "regularSeasonData") {
            gs.push(generateGraph(tradesGraph, leagueTeamManagers, year));
            gs.push(generateGraph(waiversGraph, leagueTeamManagers, year));
        }

        curGraph = 0;
        graphs = gs;
    }

    const setTransactionsAndGraphs = (wD) => {
        if(wD[0].rosterID) {
            for(let i = 1; i <= waiversData.length; i++) {
                if(!tradesData.find(t => t.rosterID == i)) {
                    tradesData.push({
                        rosterID: i,
                        trades: 0,
                    })
                }
            }
        }
        if(wD[0].managerID) {
            for(const userID in leagueTeamManagers.users) {
                if(!tradesData.find(t => t.managerID == userID)) {
                    tradesData.push({
                        managerID: userID,
                        trades: 0,
                    })
                }
            }
        }
        const transactions = [];

        for(const w of wD) {
            const trades = tradesData.find(t => t.rosterID == w.rosterID || t.managerID == w.rosterID)?.trades || 0;
            const waivers = w.waivers;
            transactions.push({
                rosterID: w.rosterID,
                managerID: w.managerID,
                trades,
                waivers,
            })
        }

        setGraphs(wD)
        return transactions;
    }

    const setTables = (lIQs) => {
        const t = [
            "Win Percentages",
            "Points",
        ]
        if(key == "regularSeasonData") {
            t.push("Transactions")
        }
        if(!lIQs[0]?.potentialPoints) {
            iqOffset = 1;
        } else {
            t.unshift('Lineup IQs');
        }
        tables = t
    }

    $: transactions =  setTransactionsAndGraphs(waiversData)
    $: changeTable(curGraph);
    $: changeGraph(curTable);
    $: setTables(lineupIQs)
    
    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    :global(.header) {
        text-align: center;
    }
    .italic {
        display: block;
        font-style: italic;
        font-size: 0.9em;
        color: var(--g999);
    }

    :global(.recordTable) {
        box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
        margin: 2em;
    }

    :global(.rankingTable) {
        display: table;
        box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
        margin: 2em auto 0.5em;
    }

    .fullFlex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 3em auto 5em;
    }

    .rankingHolder {
        display: block;
        width: 100%;
        overflow-x: hidden;
    }

    .subTitle {
        font-style: italic;
        font-size: 0.7em;
        color: #888;
        line-height: 1.2em;
    }

    h4 {
        text-align: center;
        margin: 2em 0 1em;
    }

    .curRecordManager {
        font-style: italic;
        color: #999;
        font-size: 0.8em;
        line-height: 1.1em;
    }

    .rankingTableWrapper {
        width: 25%;
    }

    .rankingInner {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        width: 400%;
		transition: margin-left 0.8s;
    }

    .buttonHolder {
        text-align: center;
        margin: 2em 0 4em;
    }

    :global(.cellName) {
        cursor: pointer;
        line-height: 1.2em;
    }

    :global(.differentialName) {
        padding: 0.7em 0;
    }

    .center {
        text-align: center;
    }

    /* Start button resizing */

    @media (max-width: 540px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.6em;
        }
    }

    @media (max-width: 415px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.5em;
            padding: 0 6px;
        }
    }

    @media (max-width: 315px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.45em;
            padding: 0 3px;
        }
    }

    /* End button resizing */

    /* Start record table resizing */

    @media (max-width: 510px) {
        :global(.recordTable th) {
            font-size: 0.8em;
            padding: 1px 12px;
        }
        :global(.recordTable td) {
            font-size: 0.8em;
            padding: 1px 12px;
        }
    }

    @media (max-width: 435px) {
        :global(.rank) {
            padding: 1px 0 1px 5px !important;
        }
        :global(.rank) {
            padding: 1px 0 1px 5px !important;
        }
    }

    @media (max-width: 420px) {
        :global(.recordTable th) {
            font-size: 0.6em;
            padding: 1px 12px;
        }
        :global(.recordTable td) {
            font-size: 0.6em;
            padding: 1px 12px;
        }
    }

    @media (max-width: 330px) {
        :global(.recordTable th) {
            font-size: 0.5em;
            padding: 1px 8px;
        }
        :global(.recordTable td) {
            font-size: 0.5em;
            padding: 1px 8px;
        }
    }

    /* END record table resizing */

    /* Start ranking table resizing */

    @media (max-width: 570px) {
        :global(.rankingTable th) {
            font-size: 0.8em;
            max-width: 110px;
            white-space: break-spaces;
            padding: 1px 12px;
        }
        :global(.rankingTable td) {
            font-size: 0.8em;
            max-width: 110px;
            white-space: break-spaces;
            padding: 1px 12px;
        }
    }

    @media (max-width: 410px) {
        :global(.rankingTable th) {
            font-size: 0.6em;
            max-width: 90px;
            white-space: break-spaces;
            padding: 1px 12px;
        }
        :global(.rankingTable td) {
            font-size: 0.6em;
            max-width: 90px;
            white-space: break-spaces;
            padding: 1px 12px;
        }
    }

    @media (max-width: 340px) {
        :global(.rankingTable th) {
            font-size: 0.55em;
            max-width: 80px;
            white-space: break-spaces;
            padding: 1px 6px;
        }
        :global(.rankingTable td) {
            font-size: 0.55em;
            max-width: 80px;
            white-space: break-spaces;
            padding: 1px 6px;
        }
    }

    /* END ranking table resizing */
</style>

<h4>{prefix} Records</h4>

<div class="fullFlex">
    {#if weekRecords && weekRecords.length}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=4>{prefix} Single Week Scoring Records</Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Manager</Cell>
                    <Cell class="header">Week</Cell>
                    <Cell class="header">Total Points</Cell>
                </Row>
            </Head>
            <Body>
                {#each weekRecords as leagueWeekRecord, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName" on:click={() => gotoManager(leagueWeekRecord.rosterID)}>
                            {getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekRecord.rosterID, allTime ? leagueWeekRecord.year : prefix)}
                            {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekRecord.rosterID, allTime ? leagueWeekRecord.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekRecord.rosterID)}
                                <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekRecord.rosterID)})</div>
                            {/if}
                        </Cell>
                        <Cell>{allTime ? leagueWeekRecord.year + " " : "" }{key == "regularSeasonData" ? "Week " : ""}{leagueWeekRecord.week}</Cell>
                        <Cell>{round(leagueWeekRecord.fpts)}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}

    {#if weekLows && weekLows.length}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=4>{prefix} Single Week Scoring Lows</Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Manager</Cell>
                    <Cell class="header">Week</Cell>
                    <Cell class="header">Total Points</Cell>
                </Row>
            </Head>
            <Body>
                {#each weekLows as leagueWeekLow, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName" on:click={() => gotoManager(leagueWeekLow.rosterID)}>
                            {getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekLow.rosterID, allTime ? leagueWeekLow.year : prefix)}
                            {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekLow.rosterID, allTime ? leagueWeekLow.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekLow.rosterID)}
                                <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, leagueWeekLow.rosterID)})</div>
                            {/if}
                        </Cell>
                        <Cell>{allTime ? leagueWeekLow.year + " " : "" }{key == "regularSeasonData" ? "Week " : ""}{leagueWeekLow.week}</Cell>
                        <Cell>{round(leagueWeekLow.fpts)}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}

    {#if allTime}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=5>All-Time Highest Season Points<span class="italic">Ranked by PPG</span></Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Manager</Cell>
                    <Cell class="header">Year</Cell>
                    <Cell class="header">Total Points</Cell>
                    <Cell class="header">PPG</Cell>
                </Row>
            </Head>
            <Body>
                {#each seasonLongRecords as mostSeasonLongPoint, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName" on:click={() => gotoManager(mostSeasonLongPoint.rosterID)}>
                            {getTeamNameFromTeamManagers(leagueTeamManagers, mostSeasonLongPoint.rosterID, mostSeasonLongPoint.year)}
                        </Cell>
                        <Cell>{mostSeasonLongPoint.year}</Cell>
                        <Cell>{round(mostSeasonLongPoint.fpts)}</Cell>
                        <Cell>{mostSeasonLongPoint.fptsPerGame}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}
    
    {#if allTime}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=5>All-Time Lowest Season Points<span class="italic">Ranked by PPG</span></Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Manager</Cell>
                    <Cell class="header">Year</Cell>
                    <Cell class="header">Total Points</Cell>
                    <Cell class="header">PPG</Cell>
                </Row>
            </Head>
            <Body>
                {#each seasonLongLows as leastSeasonLongPoint, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName" on:click={() => gotoManager(leastSeasonLongPoint.rosterID)}>
                            {getTeamNameFromTeamManagers(leagueTeamManagers, leastSeasonLongPoint.rosterID, leastSeasonLongPoint.year)}
                        </Cell>
                        <Cell>{leastSeasonLongPoint.year}</Cell>
                        <Cell>{round(leastSeasonLongPoint.fpts)}</Cell>
                        <Cell>{leastSeasonLongPoint.fptsPerGame}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}

    {#if blowouts && blowouts.length}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=4>{prefix} Largest Blowouts</Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Matchup</Cell>
                    <Cell class="header">Week</Cell>
                    <Cell class="header">Differential</Cell>
                </Row>
            </Head>
            <Body>
                {#each blowouts as blowout, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName center differentialName">
                            <div class="center" on:click={() => gotoManager(blowout.home.rosterID)}>
                                {getTeamNameFromTeamManagers(leagueTeamManagers, blowout.home.rosterID, allTime ? blowout.home.year : prefix)} ({round(blowout.home.fpts)})
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, blowout.home.rosterID, allTime ? blowout.home.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, blowout.home.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, blowout.home.rosterID)})</div>
                                {/if}
                            </div>
                            vs
                            <div class="center" on:click={() => gotoManager(blowout.away.rosterID)}>
                                {getTeamNameFromTeamManagers(leagueTeamManagers, blowout.away.rosterID, allTime ? blowout.away.year : prefix)} ({round(blowout.away.fpts)})
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, blowout.away.rosterID, allTime ? blowout.away.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, blowout.away.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, blowout.away.rosterID)})</div>
                                {/if}
                            </div>
                        </Cell>
                        <Cell>{allTime ? blowout.year + " " : "" }{key == "regularSeasonData" ? "Week " : ""}{blowout.week}</Cell>
                        <Cell>{round(blowout.differential)}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}

    {#if closestMatchups && closestMatchups.length}
        <DataTable class="recordTable">
            <Head>
                <Row>
                    <Cell class="header" colspan=4>{prefix} Narrowest Wins</Cell>
                </Row>
                <Row>
                    <Cell class="header rank"></Cell>
                    <Cell class="header">Matchup</Cell>
                    <Cell class="header">Week</Cell>
                    <Cell class="header">Differential</Cell>
                </Row>
            </Head>
            <Body>
                {#each closestMatchups as closestMatchup, ix}
                    <Row>
                        <Cell class="rank">{ix + 1}</Cell>
                        <Cell class="cellName center differentialName">
                            <div class="center" on:click={() => gotoManager(closestMatchup.home.rosterID)}>
                                {getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.home.rosterID, allTime ? closestMatchup.home.year : prefix)} ({round(closestMatchup.home.fpts)})
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.home.rosterID, allTime ? closestMatchup.home.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.home.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.home.rosterID)})</div>
                                {/if}
                            </div>
                            vs
                            <div class="center" on:click={() => gotoManager(closestMatchup.away.rosterID)}>
                                {getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.away.rosterID, allTime ? closestMatchup.away.year : prefix)} ({round(closestMatchup.away.fpts)})
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.away.rosterID, allTime ? closestMatchup.away.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.away.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, closestMatchup.away.rosterID)})</div>
                                {/if}
                            </div>
                        </Cell>
                        <Cell>{allTime ? closestMatchup.year + " " : "" }{key == "regularSeasonData" ? "Week " : ""}{closestMatchup.week}</Cell>
                        <Cell>{round(closestMatchup.differential)}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}
</div>

<h4>{prefix} Rankings</h4>

{#if graphs.length}
    <BarChart maxWidth={innerWidth} {graphs} bind:curGraph={curGraph} />
{/if}

<div class="rankingHolder">
    <div class="rankingInner" style="margin-left: -{100 * curTable}%;">
        {#if lineupIQs[0]?.potentialPoints}
            <div class="rankingTableWrapper">
                <DataTable class="rankingTable">
                    <Head>
                        <Row>
                            <Cell class="header" colspan=5>
                                {prefix} Lineup IQ Rankings
                                <div class="subTitle">
                                    The percentage of potential points each manager has captured
                                </div>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell class="header"></Cell>
                            <Cell class="header">Manager</Cell>
                            <Cell class="header">Lineup IQ</Cell>
                            <Cell class="header">Points</Cell>
                            <Cell class="header">Potential Points</Cell>
                        </Row>
                    </Head>
                    <Body>
                        {#each lineupIQs as lineupIQ, ix}
                            <Row>
                                <Cell>{ix + 1}</Cell>
                                <Cell class="cellName" on:click={() => gotoManager(lineupIQ.rosterID)}>
                                    {lineupIQ.managerID ? leagueTeamManagers.users[lineupIQ.managerID].display_name : getTeamNameFromTeamManagers(leagueTeamManagers, lineupIQ.rosterID, allTime ? lineupIQ.year : prefix)}
                                    {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, lineupIQ.rosterID, allTime ? lineupIQ.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, lineupIQ.rosterID)}
                                        <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, lineupIQ.rosterID)})</div>
                                    {/if}
                                </Cell>
                                <Cell>{lineupIQ.iq}%</Cell>
                                <Cell>{round(lineupIQ.fpts)}</Cell>
                                <Cell>{round(lineupIQ.potentialPoints)}</Cell>
                            </Row>
                        {/each}
                    </Body>
                </DataTable>
            </div>
        {/if}

        <div class="rankingTableWrapper">
            <DataTable class="rankingTable">
                <Head>
                    <Row>
                        <Cell class="header" colspan=6>{prefix} Win Percentages Rankings</Cell>
                    </Row>
                    <Row>
                        <Cell class="header"></Cell>
                        <Cell class="header">Manager</Cell>
                        <Cell class="header">Win %</Cell>
                        <Cell class="header">Wins</Cell>
                        {#if showTies}
                            <Cell class="header">Ties</Cell>
                        {/if}
                        <Cell class="header">Losses</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each winPercentages as winPercentage, ix}
                        <Row>
                            <Cell>{ix + 1}</Cell>
                            <Cell class="cellName" on:click={() => gotoManager(winPercentage.rosterID)}>
                                {winPercentage.managerID ? leagueTeamManagers.users[winPercentage.managerID].display_name : getTeamNameFromTeamManagers(leagueTeamManagers, winPercentage.rosterID, allTime ? winPercentage.year : prefix)}
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, winPercentage.rosterID, allTime ? winPercentage.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, winPercentage.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, winPercentage.rosterID)})</div>
                                {/if}
                            </Cell>
                            <Cell>{winPercentage.percentage}%</Cell>
                            <Cell>{winPercentage.wins}</Cell>
                            {#if showTies}
                                <Cell>{winPercentage.ties}</Cell>
                            {/if}
                            <Cell>{winPercentage.losses}</Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        </div>

        <div class="rankingTableWrapper">
            <DataTable class="rankingTable">
                <Head>
                    <Row>
                        <Cell class="header" colspan=5>
                            {prefix} Fantasy Points Rankings
                        </Cell>
                    </Row>
                    <Row>
                        <Cell class="header"></Cell>
                        <Cell class="header">Manager</Cell>
                        <Cell class="header">Points For</Cell>
                        <Cell class="header">Points Against</Cell>
                        <Cell class="header">Points Per Game</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each fptsHistories as fptsHistory, ix}
                        <Row>
                            <Cell>{ix + 1}</Cell>
                            <Cell class="cellName" on:click={() => gotoManager(fptsHistory.rosterID)}>
                                {fptsHistory.managerID ? leagueTeamManagers.users[fptsHistory.managerID].display_name : getTeamNameFromTeamManagers(leagueTeamManagers, fptsHistory.rosterID, allTime ? fptsHistory.year : prefix)}
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, fptsHistory.rosterID, allTime ? fptsHistory.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, fptsHistory.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, fptsHistory.rosterID)})</div>
                                {/if}
                            </Cell>
                            <Cell>{round(fptsHistory.fptsFor)}</Cell>
                            <Cell>{round(fptsHistory.fptsAgainst)}</Cell>
                            <Cell>{round(fptsHistory.fptsPerGame)}</Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        </div>

        <div class="rankingTableWrapper">
            <DataTable class="rankingTable">
                <Head>
                    <Row>
                        <Cell class="header" colspan=4>
                            {prefix} Transaction Totals
                        </Cell>
                    </Row>
                    <Row>
                        <Cell class="header"></Cell>
                        <Cell class="header">Manager</Cell>
                        <Cell class="header">Trades</Cell>
                        <Cell class="header">Waivers</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each transactions as transaction, ix}
                        <Row>
                            <Cell>{ix + 1}</Cell>
                            <Cell class="cellName" on:click={() => gotoManager(transaction.rosterID)}>
                                {transaction.managerID ? leagueTeamManagers.users[transaction.managerID].display_name : getTeamNameFromTeamManagers(leagueTeamManagers, transaction.rosterID, allTime ? transaction.year : prefix)}
                                {#if !allTime  && getTeamNameFromTeamManagers(leagueTeamManagers, transaction.rosterID, allTime ? transaction.year : prefix) != getTeamNameFromTeamManagers(leagueTeamManagers, transaction.rosterID)}
                                    <div class="curRecordManager">({getTeamNameFromTeamManagers(leagueTeamManagers, transaction.rosterID)})</div>
                                {/if}
                            </Cell>
                            <Cell>{transaction.trades}</Cell>
                            <Cell>{transaction.waivers}</Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        </div>

    </div>
</div>

<div class="buttonHolder">
    <Group variant="outlined">
        {#each tables as table, ix}
            <Button class="selectionButtons" on:click={() => curTable = ix} variant="{curTable == ix ? "raised" : "outlined"}">
                <Label>{table}</Label>
            </Button>
        {/each}
    </Group>
</div>