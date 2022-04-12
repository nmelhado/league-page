<script>
    import Button, { Group, Label } from '@smui/button';
    import { getLeagueRecords, getLeagueTransactions } from '$lib/utils/helper';

    import AllTimeRecords from './AllTimeRecords.svelte';
    import PerSeasonRecords from './PerSeasonRecords.svelte';

    export let leagueRecords, totals, stale;

    const refreshTransactions = async () => {
        const newTransactions = await getLeagueTransactions(false, true);
        totals = newTransactions.totals;
    }

    let {leagueRosterRecords, leagueWeekHighs, leagueWeekLows, allTimeClosestMatchups, allTimeBiggestBlowouts, currentManagers, mostSeasonLongPoints, leastSeasonLongPoints, seasonWeekRecords, currentYear, lastYear} = leagueRecords;

    const refreshRecords = async () => {
        const newRecords = await getLeagueRecords(true);

        // update values with new data
        leagueRecords = newRecords;
        leagueRosterRecords = newRecords.leagueRosterRecords;
        leagueWeekHighs = newRecords.leagueWeekHighs;
        leagueWeekLows = newRecords.leagueWeekLows;
        allTimeClosestMatchups = newRecords.allTimeClosestMatchups;
        allTimeBiggestBlowouts = newRecords.allTimeBiggestBlowouts;
        currentManagers = newRecords.currentManagers;
        mostSeasonLongPoints = newRecords.mostSeasonLongPoints;
        leastSeasonLongPoints = newRecords.leastSeasonLongPoints;
        seasonWeekRecords = newRecords.seasonWeekRecords;
        currentYear = newRecords.currentYear;
        lastYear = newRecords.lastYear;
    }

    if(stale) {
        refreshTransactions();
    }

    if(leagueRecords.stale) {
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
            <Button class="selectionButtons" on:click={() => display = "allTime"} variant="{display == "allTime" ? "raised" : "outlined"}">
                <Label>All-Time Records</Label>
            </Button>
            <Button class="selectionButtons" on:click={() => display = "season"} variant="{display == "season" ? "raised" : "outlined"}">
                <Label>Season Records</Label>
            </Button>
        </Group>
    </div>

    {#if display == "allTime"}
        {#if leagueWeekHighs.length}
            <AllTimeRecords transactionTotals={totals} {allTimeClosestMatchups} {allTimeBiggestBlowouts} {leagueRosterRecords} {leagueWeekHighs} {leagueWeekLows} {currentManagers} {mostSeasonLongPoints} {leastSeasonLongPoints} />
        {:else}
            <p class="empty">No records <i>yet</i>...</p>
        {/if}
    {:else}
        <PerSeasonRecords transactionTotals={totals} {leagueRosterRecords} {seasonWeekRecords} {currentManagers} {currentYear} {lastYear} />
    {/if}
</div>
