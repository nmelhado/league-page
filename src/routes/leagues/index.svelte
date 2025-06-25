<script context="module">
    import { getLeagueHistory } from '$lib/utils/helper';

    export async function load() {
        const leaguesData = getLeagueHistory();
        return { props: { leaguesData } };
    }
</script>

<script>
    import LinearProgress from '@smui/linear-progress';
    export let leaguesData;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
        display: block;
        margin: 30px auto;
        width: 95%;
        max-width: 600px;
    }
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    td, th {
        padding: 8px;
        border-bottom: 1px solid var(--g555);
    }
    th {
        text-align: left;
    }
</style>

<div id="main">
    {#await leaguesData}
        <div class="loading">
            <p>Fetching league history...</p>
            <LinearProgress indeterminate />
        </div>
    {:then history}
        <table>
            <thead>
                <tr><th>Season</th><th>League ID</th></tr>
            </thead>
            <tbody>
                {#each history as item}
                    <tr>
                        <td>{item.season}</td>
                        <td>{item.league_id}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
