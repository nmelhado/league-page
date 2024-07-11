<script>
	import LinearProgress from '@smui/linear-progress';
	import { Rosters } from '$lib/components'
	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

	let isAuthenticated = false;
    onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });
	export let data;
	const rostersInfo = data.rostersInfo;
</script>

{#if isAuthenticated}
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
		{#await rostersInfo}
			<div class="loading">
				<p>Retrieving roster data...</p>
				<br />
				<LinearProgress indeterminate />
			</div>
		{:then [leagueData, rosterData, leagueTeamManagers, playersInfo]}
			<Rosters {leagueData} {rosterData} {leagueTeamManagers} {playersInfo} />
		{:catch error}
			<p>Something went wrong: {error.message}</p>
		{/await}
	</div>
{/if}