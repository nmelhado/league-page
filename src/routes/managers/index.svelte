<script context="module">
    import {
        waitForAll,
        getLeagueRosters,
        getLeagueUsers,
        getLeagueData,
        getLeagueTransactions,
        getAwards,
        getLeagueRecords,
        managers as managersObj
    } from '$lib/utils/helper';
	
    export async function load({ page }) {
        const managersInfo = waitForAll(
            getLeagueRosters(),    
            getLeagueUsers(),
            getLeagueData(),
            getLeagueTransactions(),
            getAwards(),
            getLeagueRecords(),
        );

        const manager = page.query.get('manager');

        const props = {
            manager: null,
            managers: managersObj,
            managersInfo
        }
        if(manager && (manager >= 0 && manager < managersObj.length)) {
            props.manager = manager;
        }
    
		return { props };
	}
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { Managers } from '$lib/components';

	export let managers, manager, managersInfo;
</script>

<style>
	.main {
		position: relative;
		z-index: 1;
	}
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<div class="main">
    {#await managersInfo}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving managers...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [rostersData, users, leagueData, transactionsData, awards, records]}
        <Managers {managers} {manager} {rostersData} {users} {leagueData} {transactionsData} {awards} {records} /> <!-- displays managers -->
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>