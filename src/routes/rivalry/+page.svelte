<script>
	import LinearProgress from '@smui/linear-progress';
	import { Rivalry } from '$lib/components'
	import { waitForAll } from '$lib/utils/helper';

	export let data;
	const {
        leagueTeamManagerData,
        playersData,
        transactionsData,
        playerOne,
        playerTwo,
    } = data;
</script>

<style>
	.holder {
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

<div class="holder">
	{#await waitForAll(leagueTeamManagerData, playersData, transactionsData)}
		<div class="loading">
			<p>Gathering information...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [leagueTeamManagers, playersInfo, transactionsInfo]}
		<!-- promise was fulfilled -->
		<Rivalry {leagueTeamManagers} {playersInfo} {playerOne} {playerTwo} {transactionsInfo} />
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
