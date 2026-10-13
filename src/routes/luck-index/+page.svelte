<script>
	import { LuckIndex } from '$lib/components';
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';

	export let data;
	const { luckIndexData, teamManagersData } = data;
</script>

<style>
	.luckIndex {
		display: block;
		margin: 30px auto;
		width: 95%;
		max-width: 1000px;
		position: relative;
		z-index: 1;
		overflow-y: hidden;
	}

	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<div class="luckIndex">
	{#await waitForAll(luckIndexData, teamManagersData)}
		<div class="loading">
			<p>Crunching the all-play standings...</p>
			<LinearProgress indeterminate />
		</div>
	{:then [luckIndex, leagueTeamManagers]}
		<LuckIndex {luckIndex} {leagueTeamManagers} />
	{:catch error}
		<p>Something went wrong loading the luck index: {error.message}</p>
	{/await}
</div>
