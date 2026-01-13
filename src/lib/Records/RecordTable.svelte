<script>
    import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
    import RecordTeam from './RecordTeam.svelte';
    import { gotoManager, round } from '$lib/utils/helpers/helper';

    export let data = [];
    export let title = "";
    export let type = "week"; // "week", "season", "differential"
    export let allTime = false;
    export let prefix = "";
    export let key = "";
    export let leagueTeamManagers;
    export let subtitle = "";
</script>

<style>
    .vs {
        padding-left: 0.6em;
        margin: 0.5em 0;
    }

    .italic {
        display: block;
        font-style: italic;
        font-size: 0.9em;
        color: var(--g999);
    }

    @media (max-width: 510px) {
        .vsRecord {
            margin: .6em 0;
        }
    }
</style>

{#if data && data.length}
    <DataTable class="recordTable">
        <Head>
            <Row class="rTableHeader">
                <Cell class="header headerPrimary" colspan={type === "differential" ? 4 : type === "season" ? 5 : 4}>
                    {title}
                    {#if subtitle}
                        <span class="italic">{subtitle}</span>
                    {/if}
                </Cell>
            </Row>
            <Row>
                <Cell class="header rank"></Cell>
                <Cell class="header">{type === "differential" ? "Matchup" : "Manager"}</Cell>
                <Cell class="header">{type === "season" ? "Year" : "Week"}</Cell>
                {#if type === "season"}
                    <Cell class="header">Total Points</Cell>
                    <Cell class="header">PPG</Cell>
                {:else}
                    <Cell class="header">{type === "differential" ? "Differential" : "Total Points"}</Cell>
                {/if}
            </Row>
        </Head>
        <Body>
            {#each data as record, ix}
                <Row>
                    <Cell class="rank">{ix + 1}</Cell>
                    {#if type === "differential"}
                        <Cell class="cellName differentialName">
                            <div class="vsRecord">
                                <div onclick={() => gotoManager({year: record.year || prefix, leagueTeamManagers, rosterID: record.home.rosterID})}>
                                    <RecordTeam {leagueTeamManagers} rosterID={record.home.rosterID} year={allTime ? record.year : prefix} compressed={true} points={round(record.home.fpts)} />
                                </div>
                                <p class="vs">vs</p>
                                <div onclick={() => gotoManager({year: record.year || prefix, leagueTeamManagers, rosterID: record.away.rosterID})}>
                                    <RecordTeam {leagueTeamManagers} rosterID={record.away.rosterID} year={allTime ? record.year : prefix} compressed={true} points={round(record.away.fpts)} />
                                </div>
                            </div>
                        </Cell>
                    {:else}
                        <Cell class="cellName" onclick={() => gotoManager({year: record.year || prefix, leagueTeamManagers, rosterID: record.rosterID})}>
                            <RecordTeam {leagueTeamManagers} rosterID={record.rosterID} year={allTime ? record.year : prefix} />
                        </Cell>
                    {/if}
                    {#if type === "season"}
                        <Cell>{record.year}</Cell>
                        <Cell>{round(record.fpts)}</Cell>
                        <Cell>{record.fptsPerGame}</Cell>
                    {:else if type === "differential"}
                        <Cell>{allTime ? record.year + " " : ""}{key == "regularSeasonData" ? "Week " : ""}{record.week}</Cell>
                        <Cell>{round(record.differential)}</Cell>
                    {:else}
                        <Cell>{allTime ? record.year + " " : ""}{key == "regularSeasonData" ? "Week " : ""}{record.week}</Cell>
                        <Cell>{round(record.fpts)}</Cell>
                    {/if}
                </Row>
            {/each}
        </Body>
    </DataTable>
{/if}
