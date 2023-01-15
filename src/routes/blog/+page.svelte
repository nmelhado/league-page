<script>
    import { Posts } from "$lib/components";

    export let data;
    const {postsData, queryPage, filterKey, leagueTeamManagersData} = data;
</script>

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