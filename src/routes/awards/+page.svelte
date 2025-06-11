<script>
	import { Awards } from '$lib/components'
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';
	import EmptyState from '$lib/EmptyState.svelte';

    export let data;
    const {awardsData, teamManagersData} = data;
</script>

<style>
    .awards {
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

	.nothingYet {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
		text-align: center;
	}
</style>

<div class="awards">
	{#await waitForAll(awardsData, teamManagersData) }
		<div class="loading">
			<p>Retrieving awards data...</p>
			<LinearProgress indeterminate />
		</div>
	{:then [podiums, leagueTeamManagers] }
		{#if podiums && podiums.length > 0}
			{#each podiums as podium}
				<Awards {podium} {leagueTeamManagers} />
			{/each}
		{:else}
			<EmptyState iconName="emoji_events" message="No seasons have been completed yet, so no awards have been earned." />
		{/if}
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>