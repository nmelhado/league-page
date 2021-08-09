<script>
    import Button, { Group, Label } from '@smui/button';
    import BarChart from '../BarChart.svelte'
    import { cleanName, generateGraph } from '$lib/utils/helper';

  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';

    export let tradesData, waiversData, weekRecords, seasonLongRecords, showTies, winPercentages, fptsHistories, lineupIQs, prefix, currentManagers, allTime=false, last=false;

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

    for(let i = 1; i <= waiversData.length; i++) {
        if(!tradesData.find(t => t.rosterID == i)) {
            tradesData.push({
                rosterID: i,
                manager: currentManagers[i],
                trades: 0,
            })
        }
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
        stats: waiversData,
        x: "Manager",
        y: "# of Waiver Moves",
        stat: "",
        header: "Waivers Managers Have Made",
        field: "waivers",
        short: "Waivers"
    }
    
    const graphs = [];

    if(lineupIQs[0]?.potentialPoints) {
        graphs.push(generateGraph(lineupIQGraph));
    }
    graphs.push(generateGraph(winsGraph, 5));
    graphs.push(generateGraph(winPercentagesGraph));
    graphs.push(generateGraph(fptsHistoriesGraph));
    if(lineupIQs[0]?.potentialPoints) {
        graphs.push(generateGraph(potentialPointsGraph, 10, 0));
    }
    graphs.push(generateGraph(tradesGraph));
    graphs.push(generateGraph(waiversGraph));

    const transactions = [];

    for(let i = 1; i <= waiversData.length; i++) {
        const waiver = waiversData.find(w => w.rosterID == i);
        const trades = tradesData.find(t => t.rosterID == i)?.trades || 0;
        const waivers = waiver?.waivers || 0;
        const manager = waiver.manager;
        transactions.push({
            rosterID: i,
            manager,
            trades,
            waivers,
        })
    }

    let curTable = 0;
    let curGraph = 0;

    let iqOffset = 0;
    const tables = [
        "Win Percentages",
        "Points",
        "Transactions",
    ]
    if(!lineupIQs[0]?.potentialPoints) {
        iqOffset = 1;
    } else {
        tables.unshift('Lineup IQs');
    }
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

    $: changeTable(curGraph);
    $: changeGraph(curTable);
    
    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    :global(.header) {
        text-align: center;
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

    h5 {
        text-align: center;
        margin: 2em 0 1em;
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
        line-height: 1.2em;
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

    @media (max-width: 490px) {
        :global(.recordTable th) {
            font-size: 0.8em;
            padding: 1px 12px;
        }
        :global(.recordTable td) {
            font-size: 0.8em;
            padding: 1px 12px;
        }
    }

    @media (max-width: 390px) {
        :global(.recordTable th) {
            font-size: 0.6em;
            padding: 1px 12px;
        }
        :global(.recordTable td) {
            font-size: 0.6em;
            padding: 1px 12px;
        }
    }

    @media (max-width: 320px) {
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
                    <Cell class="header"></Cell>
                    <Cell class="header">Manager</Cell>
                    <Cell class="header">Week</Cell>
                    <Cell class="header">Total Points</Cell>
                </Row>
            </Head>
            <Body>
                {#each weekRecords as leagueWeekRecord, ix}
                    <Row>
                        <Cell>{ix + 1}</Cell>
                        <Cell class="cellName">
                            {leagueWeekRecord.manager.name}
                            {#if !allTime  && cleanName(leagueWeekRecord.manager.name) != cleanName(currentManagers[leagueWeekRecord.rosterID].name)}
                                <div class="curRecordManager">({currentManagers[leagueWeekRecord.rosterID].name})</div>
                            {/if}
                        </Cell>
                        <Cell>{allTime ? leagueWeekRecord.year + " " : "" }Week {leagueWeekRecord.week}</Cell>
                        <Cell>{leagueWeekRecord.fpts}</Cell>
                    </Row>
                {/each}
            </Body>
        </DataTable>
    {/if}

    <DataTable class="recordTable">
        <Head>
            <Row>
                <Cell class="header" colspan=4>{prefix} Season-long Scoring Records</Cell>
            </Row>
            <Row>
                <Cell class="header"></Cell>
                <Cell class="header">Manager</Cell>
                {#if allTime}
                    <Cell class="header">Year</Cell>
                {/if}
                <Cell class="header">Total Points</Cell>
            </Row>
        </Head>
        <Body>
            {#each seasonLongRecords as mostSeasonLongPoint, ix}
                <Row>
                    <Cell>{ix + 1}</Cell>
                    <Cell class="cellName" >
                        {mostSeasonLongPoint.manager.name}
                        {#if !allTime  && cleanName(mostSeasonLongPoint.manager.name) != cleanName(currentManagers[mostSeasonLongPoint.rosterID].name)}
                            <div class="curRecordManager">({currentManagers[mostSeasonLongPoint.rosterID].name})</div>
                        {/if}
                    </Cell>
                    {#if allTime}
                        <Cell>{mostSeasonLongPoint.year}</Cell>
                    {/if}
                    <Cell>{mostSeasonLongPoint.fpts}</Cell>
                </Row>
            {/each}
        </Body>
    </DataTable>
</div>

<h4>{prefix} Rankings</h4>

<BarChart maxWidth={innerWidth} {graphs} bind:curGraph={curGraph} />

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
                                <Cell class="cellName" >
                                    {lineupIQ.manager.name}
                                    {#if !allTime  && cleanName(lineupIQ.manager.name) != cleanName(currentManagers[lineupIQ.rosterID].name)}
                                        <div class="curRecordManager">({currentManagers[lineupIQ.rosterID].name})</div>
                                    {/if}
                                </Cell>
                                <Cell>{lineupIQ.iq}%</Cell>
                                <Cell>{lineupIQ.fpts}</Cell>
                                <Cell>{lineupIQ.potentialPoints}</Cell>
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
                            <Cell class="cellName">
                                {winPercentage.manager.name}
                                {#if !allTime  && cleanName(winPercentage.manager.name) != cleanName(currentManagers[winPercentage.rosterID].name)}
                                    <div class="curRecordManager">({currentManagers[winPercentage.rosterID].name})</div>
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
                        <Cell class="header" colspan=4>
                            {prefix} Fantasy Points Rankings
                        </Cell>
                    </Row>
                    <Row>
                        <Cell class="header"></Cell>
                        <Cell class="header">Manager</Cell>
                        <Cell class="header">Points For</Cell>
                        <Cell class="header">Points Against</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each fptsHistories as fptsHistory, ix}
                        <Row>
                            <Cell>{ix + 1}</Cell>
                            <Cell class="cellName">
                                {fptsHistory.manager.name}
                                {#if !allTime  && cleanName(fptsHistory.manager.name) != cleanName(currentManagers[fptsHistory.rosterID].name)}
                                    <div class="curRecordManager">({currentManagers[fptsHistory.rosterID].name})</div>
                                {/if}
                            </Cell>
                            <Cell>{fptsHistory.fptsFor}</Cell>
                            <Cell>{fptsHistory.fptsAgainst}</Cell>
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
                            <Cell class="cellName">
                                {transaction.manager.name}
                                {#if !allTime  && cleanName(transaction.manager.name) != cleanName(currentManagers[transaction.rosterID].name)}
                                    <div class="curRecordManager">({currentManagers[transaction.rosterID].name})</div>
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

{#if !last}
    <hr />
{/if}