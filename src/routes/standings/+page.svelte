<script>
	import { Standings } from '$lib/components'
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
	const {standingsData, leagueTeamManagersData} = data;
</script>

{#if isAuthenticated}
	<style>
		.holder {
			position: relative;
			z-index: 1;
			text-align: center;
		}
	</style>

	<div class="holder">
		<Standings {standingsData} {leagueTeamManagersData} />
	</div>
{/if}