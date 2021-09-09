<script>
    import AllTimeRecords from './AllTimeRecords.svelte';
    import PerSeasonRecords from './PerSeasonRecords.svelte';

    export let leagueRecords, totals, stale;

    const refreshTransactions = async () => {
        const newTransactions = await getLeagueTransactions(false, true);
        totals = newTransactions.totals;
    }

    if(stale) {
        refreshTransactions();
    }

    const {leagueRosterRecords, leagueWeekRecords, currentManagers, mostSeasonLongPoints, seasonWeekRecords, currentYear, lastYear} = leagueRecords;
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
        <AllTimeRecords transactionTotals={totals} {leagueRosterRecords} {leagueWeekRecords} {currentManagers} {mostSeasonLongPoints} />
    {:else}
        <p class="empty">No records <i>yet</i>...</p>
    {/if}
    <PerSeasonRecords transactionTotals={totals} {leagueRosterRecords} {seasonWeekRecords} {currentManagers} {currentYear} {lastYear} />
</div>
