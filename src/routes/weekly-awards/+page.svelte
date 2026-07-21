<script>
	import { WeeklyAwards } from '$lib/components';
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';

	export let data;
	const { weeklyAwardsData, teamManagersData } = data;
</script>

<style>
	.weeklyAwards {
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

<div class="weeklyAwards">
	{#await waitForAll(weeklyAwardsData, teamManagersData)}
		<div class="loading">
			<p>Tallying up the weekly awards...</p>
			<LinearProgress indeterminate />
		</div>
	{:then [weeklyAwards, leagueTeamManagers]}
		<WeeklyAwards {weeklyAwards} {leagueTeamManagers} />
	{:catch error}
		<p>Something went wrong loading the weekly awards: {error.message}</p>
	{/await}
</div>
