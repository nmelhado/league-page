<script>
    import AllTimeRecords from './AllTimeRecords.svelte';
    import PerSeasonRecords from './PerSeasonRecords.svelte';

    export let leagueRecords, totals;

    const {leagueRosterRecords, leagueWeekRecords, currentManagers, mostSeasonLongPoints, seasonWeekRecords, currentYear, lastYear} = leagueRecords;
</script>

<style>
    .rankingsWrapper {
        margin: 0 auto;
        width: 100%;
        max-width: 1200px;
    }
</style>

<div class="rankingsWrapper">
    <AllTimeRecords transactionTotals={totals} {leagueRosterRecords} {leagueWeekRecords} {currentManagers} {mostSeasonLongPoints} />
    <PerSeasonRecords transactionTotals={totals} {leagueRosterRecords} {seasonWeekRecords} {currentManagers} {currentYear} {lastYear} />
</div>
