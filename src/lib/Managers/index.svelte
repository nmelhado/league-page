<script>
    import AllManagers from './AllManagers.svelte'
    import Manager from './Manager.svelte'

    export let managers, manager, rostersData, users, leagueData, transactionsData, awards, records;

    const refreshTransactions = async () => {
        newTransactions = await getLeagueTransactions(false, true);
        transactionsData = newTransaction;
    }

    if(stale) {
        refreshTransactions();
    }
</script>

<div class="matchups">
    {#if manager}
        <!-- promise was fulfilled -->
        <Manager {awards} {records} {manager} {managers} {rostersData} {users} rosterPositions={leagueData.roster_positions} transactions={transactionsData.transactions} currentManagers={transactionsData.currentManagers} />
    {:else}
        <AllManagers {managers} rosters={rostersData} {users}/>
    {/if}
</div>