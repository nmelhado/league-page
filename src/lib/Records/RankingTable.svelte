<script>
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import RecordTeam from './RecordTeam.svelte';
    import { gotoManager, round } from '$lib/utils/helpers/helper';

    export let data = [];
    export let title = "";
    export let subtitle = "";
    export let type = ""; // "lineupIQ", "winPercentage", "fantasyPoints", "transactions"
    export let allTime = false;
    export let prefix = "";
    export let leagueTeamManagers;
    export let showTies = false;
</script>

<div class="rankingTableWrapper">
    <DataTable class="rankingTable">
        <Head>
            <Row>
                <Cell class="header headerPrimary" colspan={
                    type === "lineupIQ" ? 5 :
                    type === "winPercentage" ? (showTies ? 6 : 5) :
                    type === "fantasyPoints" ? 5 : 4
                }>
                    {title}
                    {#if subtitle}
                        <div class="subTitle">{subtitle}</div>
                    {/if}
                </Cell>
            </Row>
            <Row>
                <Cell class="header"></Cell>
                <Cell class="header">Manager</Cell>
                {#if type === "lineupIQ"}
                    <Cell class="header">Lineup IQ</Cell>
                    <Cell class="header">Points</Cell>
                    <Cell class="header">Potential Points</Cell>
                {:else if type === "winPercentage"}
                    <Cell class="header">Win %</Cell>
                    <Cell class="header">Wins</Cell>
                    {#if showTies}
                        <Cell class="header">Ties</Cell>
                    {/if}
                    <Cell class="header">Losses</Cell>
                {:else if type === "fantasyPoints"}
                    <Cell class="header">Points For</Cell>
                    <Cell class="header">Points Against</Cell>
                    <Cell class="header">Points Per Game</Cell>
                {:else if type === "transactions"}
                    <Cell class="header">Trades</Cell>
                    <Cell class="header">Waivers</Cell>
                {/if}
            </Row>
        </Head>
        <Body>
            {#each data as item, ix}
                <Row>
                    <Cell>{ix + 1}</Cell>
                    <Cell class="cellName" onclick={() => gotoManager({
                        year: item.year || prefix,
                        leagueTeamManagers,
                        rosterID: item.rosterID,
                        managerID: item.managerID
                    })}>
                        <RecordTeam
                            {leagueTeamManagers}
                            managerID={item.managerID}
                            rosterID={item.rosterID}
                            year={allTime ? item.year : prefix}
                        />
                    </Cell>
                    {#if type === "lineupIQ"}
                        <Cell>{item.iq}%</Cell>
                        <Cell>{round(item.fpts)}</Cell>
                        <Cell>{round(item.potentialPoints)}</Cell>
                    {:else if type === "winPercentage"}
                        <Cell>{item.percentage}%</Cell>
                        <Cell>{item.wins}</Cell>
                        {#if showTies}
                            <Cell>{item.ties}</Cell>
                        {/if}
                        <Cell>{item.losses}</Cell>
                    {:else if type === "fantasyPoints"}
                        <Cell>{round(item.fptsFor)}</Cell>
                        <Cell>{round(item.fptsAgainst)}</Cell>
                        <Cell>{round(item.fptsPerGame)}</Cell>
                    {:else if type === "transactions"}
                        <Cell>{item.trades}</Cell>
                        <Cell>{item.waivers}</Cell>
                    {/if}
                </Row>
            {/each}
        </Body>
    </DataTable>
</div>

<style>
    .rankingTableWrapper {
        width: 25%;
    }

    .subTitle {
        font-style: italic;
        font-size: 0.7em;
        color: var(--g888);
        line-height: 1.2em;
    }
</style>
