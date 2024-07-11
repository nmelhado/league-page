<script>
	import { Awards } from '$lib/components'
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';
	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';
    export let data;
    const {awardsData, teamManagersData} = data;

    let isAuthenticated = false;
	onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });
</script>

{#if isAuthenticated}
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
			{#each podiums as podium}
				<Awards {podium} {leagueTeamManagers} />
			{:else}
				<p class="nothingYet">No seasons have been completed yet, so no awards have been earned...</p>
			{/each}
		{:catch error}
			<!-- promise was rejected -->
			<p>Something went wrong: {error.message}</p>
		{/await}
	</div>
{/if}