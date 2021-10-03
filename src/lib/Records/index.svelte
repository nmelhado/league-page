<script>
    import { getLeagueRecords, getLeagueTransactions } from '$lib/utils/helper'; //recomit

    import AllTimeRecords from './AllTimeRecords.svelte';
    import PerSeasonRecords from './PerSeasonRecords.svelte';

    export let leagueRecords, totals, stale;

    const refreshTransactions = async () => {
        const newTransactions = await getLeagueTransactions(false, true);
        totals = newTransactions.totals;
    }

    let {leagueRosterRecords, leagueWeekRecords, leagueWeekLows, allTimeClosestMatchups, allTimeBiggestBlowouts, currentManagers, mostSeasonLongPoints, leastSeasonLongPoints, seasonWeekRecords, currentYear, lastYear} = leagueRecords;

    const refreshRecords = async () => {
        const newRecords = await getLeagueRecords(true);

        // update values with new data
        leagueRecords = newRecords;
        leagueRosterRecords = newRecords.leagueRosterRecords;
        leagueWeekRecords = newRecords.leagueWeekRecords;
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
</style>

<div class="rankingsWrapper">
    {#if leagueWeekRecords.length}
        <AllTimeRecords transactionTotals={totals} {allTimeClosestMatchups} {allTimeBiggestBlowouts} {leagueRosterRecords} {leagueWeekRecords} {leagueWeekLows} {currentManagers} {mostSeasonLongPoints} {leastSeasonLongPoints} />
    {:else}
        <p class="empty">No records <i>yet</i>...</p>
    {/if}
    <PerSeasonRecords transactionTotals={totals} {leagueRosterRecords} {seasonWeekRecords} {currentManagers} {currentYear} {lastYear} />
</div>
