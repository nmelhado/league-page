<script>
	import LinearProgress from '@smui/linear-progress';
    import {AllManagers} from '$lib/components';
    import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

	export let data;
	const {managers, leagueTeamManagersData} = data;

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
        {#await leagueTeamManagersData}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving managers...</p>
            <LinearProgress indeterminate />
        </div>
        {:then leagueTeamManagers}
        {#if managers.length}
        <AllManagers {managers}  {leagueTeamManagers}/>
        {/if}
        {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
        {/await}
    </div>
{/if}