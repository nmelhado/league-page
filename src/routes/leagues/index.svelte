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
        max-width: 900px;
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    table.history {
        width: 100%;
        border-collapse: collapse;
        background: var(--r1);
        border-radius: 8px;
        overflow: hidden;
    }

    td,
    th {
        padding: 12px 8px;
        border-bottom: 1px solid var(--g555);
    }

    th {
        background: var(--blueOne);
        color: #fff;
        text-align: left;
    }

    td.ep-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    td.ep-links a {
        background: var(--blueOne);
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9em;
        text-decoration: none;
        transition: background 0.2s ease-in-out;
    }

    td.ep-links a:hover {
        background: #4c83c4;
    }

    td.mono {
        font-family: monospace;
    }
</style>

<div id="main">
    {#await leaguesData}
        <div class="loading">
            <p>Fetching league history...</p>
            <LinearProgress indeterminate />
        </div>
    {:then history}
        <table class="history">
            <thead>
                <tr>
                    <th>Season</th>
                    <th>League ID</th>
                    <th>Endpoints</th>
                </tr>
            </thead>
            <tbody>
                {#each history as item}
                    <tr>
                        <td>{item.season}</td>
                        <td class="mono">{item.league_id}</td>
                        <td class="ep-links">
                            <a href={`https://api.sleeper.app/v1/league/${item.league_id}`} target="_blank" rel="noopener">data</a>
                            <a href={`https://api.sleeper.app/v1/league/${item.league_id}/rosters`} target="_blank" rel="noopener">rosters</a>
                            <a href={`https://api.sleeper.app/v1/league/${item.league_id}/users`} target="_blank" rel="noopener">users</a>
                            <a href={`https://api.sleeper.app/v1/league/${item.league_id}/matchups/1`} target="_blank" rel="noopener">matchups</a>
                            <a href={`https://api.sleeper.app/v1/league/${item.league_id}/transactions/1`} target="_blank" rel="noopener">transactions</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
