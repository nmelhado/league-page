<script>
	import LinearProgress from '@smui/linear-progress';
    import {AllManagers} from '$lib/components';

	export let data;
	const {managers, leagueTeamManagersData} = data;
</script>

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
        <AllManagers {managers}  {leagueTeamManagers}/>
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>