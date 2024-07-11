<script>
    import { Posts } from "$lib/components";

    export let data;
    const {postsData, queryPage, filterKey, leagueTeamManagersData} = data;

    let isAuthenticated = false;

	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

    onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });
</script>

{#if isAuthenticated}
    <style>
        #main {
            position: relative;
            z-index: 1;
            display: block;
            margin: 30px auto;
            width: 95%;
            max-width: 1000px;
            overflow-y: hidden;
        }
    </style>

    <div id="main">
        <Posts {postsData} {queryPage} {filterKey} {leagueTeamManagersData} />
    </div>
{/if}