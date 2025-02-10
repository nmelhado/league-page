<script>
    import Button, { Group, Label } from '@smui/button';
    import { getLeagueRecords, getLeagueTransactions } from '$lib/utils/helper';
    import AllTimeRecords from './AllTimeRecords.svelte';
    import PerSeasonRecords from './PerSeasonRecords.svelte';

    export let leagueData, totals, stale, leagueTeamManagers;

    const refreshTransactions = async () => {
        const newTransactions = await getLeagueTransactions(false, true);
        totals = newTransactions.totals;
    }

    let leagueManagerRecords, leagueRosterRecords, leagueWeekHighs, leagueWeekLows, allTimeClosestMatchups, allTimeBiggestBlowouts, mostSeasonLongPoints, leastSeasonLongPoints, seasonWeekRecords, currentYear, lastYear;

    const refreshRecords = async () => {
        const newRecords = await getLeagueRecords(true);

        // update values with new data
        leagueData = newRecords;
    }

    let key = "regularSeasonData";

    const refreshData = (lD, k) => {
        if(!lD || !lD[k]) return;

        const selectedLeagueData = lD[k];

        leagueManagerRecords = selectedLeagueData.leagueManagerRecords;
        leagueRosterRecords = selectedLeagueData.leagueRosterRecords;
        leagueWeekHighs = selectedLeagueData.leagueWeekHighs;
        leagueWeekLows = selectedLeagueData.leagueWeekLows;
        allTimeClosestMatchups = selectedLeagueData.allTimeClosestMatchups;
        allTimeBiggestBlowouts = selectedLeagueData.allTimeBiggestBlowouts;
        mostSeasonLongPoints = selectedLeagueData.mostSeasonLongPoints;
        leastSeasonLongPoints = selectedLeagueData.leastSeasonLongPoints;
        seasonWeekRecords = selectedLeagueData.seasonWeekRecords;
        currentYear = selectedLeagueData.currentYear;
        lastYear = selectedLeagueData.lastYear;
    }

    $:refreshData(leagueData, key);

    if(stale) {
        refreshTransactions();
    }

    if(leagueData.stale) {
        refreshRecords();
    }

    let display = "allTime"

</script>

<style>
    .rankingsWrapper {
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
    }

    .empty {
        margin: 10em 0 4em;
        text-align: center;
    }

    /* Button Styling */
    .buttonHolder {
        text-align: center;
        margin: 2em 0 0;
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
</style>

<div class="rankingsWrapper">

    <div class="buttonHolder">
        <Group variant="outlined">
            <Button class="selectionButtons" on:click={() => key = "regularSeasonData"} variant="{key == "regularSeasonData" ? "raised" : "outlined"}">
                <Label>Regular Season</Label>
            </Button>
            <Button class="selectionButtons" on:click={() => key = "playoffData"} variant="{key == "playoffData" ? "raised" : "outlined"}">
                <Label>Playoffs</Label>
            </Button>
        </Group>
        <br />
        <Group variant="outlined">
            <Button class="selectionButtons" on:click={() => display = "allTime"} variant="{display == "allTime" ? "raised" : "outlined"}">
                <Label>All-Time Records</Label>
            </Button>
            <Button class="selectionButtons" on:click={() => display = "season"} variant="{display == "season" ? "raised" : "outlined"}">
                <Label>Season Records</Label>
            </Button>
        </Group>
    </div>

    {#if display == "allTime"}
        {#if leagueWeekHighs?.length}
            <AllTimeRecords transactionTotals={totals} {allTimeClosestMatchups} {allTimeBiggestBlowouts} {leagueManagerRecords} {leagueWeekHighs} {leagueWeekLows} {leagueTeamManagers} {mostSeasonLongPoints} {leastSeasonLongPoints} {key} />
        {:else}
            <p class="empty">No records <i>yet</i>...</p>
        {/if}
    {:else}
        <PerSeasonRecords transactionTotals={totals} {leagueRosterRecords} {seasonWeekRecords} {leagueTeamManagers} {currentYear} {lastYear} {key} />
    {/if}
</div>
