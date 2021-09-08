<script context="module">
	import { getLeagueRecords, getLeagueTransactions, waitForAll } from '$lib/utils/helper';

    export async function load() {
        const recordsInfo = waitForAll(
			getLeagueRecords(),
			getLeagueTransactions(false),
		)
	
		return {
			props: {
				recordsInfo
			}
		};
	}
</script>

<script>
	import LinearProgress from '@smui/linear-progress';
	import { Records } from '$lib/components';

    export let recordsInfo;
</script>

<style>
    #main {
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

<div id="main">
    {#await recordsInfo}
        <!-- promise is pending -->
        <div class="loading">
            <p>Loading league records...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [leagueRecords, {totals, stale}]}
        <Records {leagueRecords} {totals} {stale} />
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
