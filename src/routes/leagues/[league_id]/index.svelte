<script context="module">
    import { getLeagueData, getLeagueRosters, getLeagueUsers, loadPlayers, waitForAll, getLeagueStandings } from '$lib/utils/helper';

    export async function load({ params }) {
        const { league_id } = params;
        const rostersInfo = waitForAll(
            getLeagueData(league_id),
            getLeagueRosters(league_id),
            getLeagueUsers(league_id),
            loadPlayers()
        );
        const standingsData = getLeagueStandings(league_id);
        const usersData = getLeagueUsers(league_id);
        return { props: { league_id, rostersInfo, standingsData, usersData } };
    }
</script>

<script>
    import LinearProgress from '@smui/linear-progress';
    import { Rosters } from '$lib/components';
    import { Standings } from '$lib/components';

    export let league_id;
    export let rostersInfo;
    export let standingsData;
    export let usersData;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
        display: block;
        margin: 30px auto;
        width: 95%;
        max-width: 1000px;
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    table.ep-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 2rem;
        background: var(--r1);
        border-radius: 8px;
        overflow: hidden;
    }

    table.ep-table th,
    table.ep-table td {
        padding: 12px 8px;
        border-bottom: 1px solid var(--g555);
        text-align: left;
    }

    table.ep-table th {
        background: var(--blueOne);
        color: #fff;
    }

    table.ep-table td a {
        color: var(--blueOne);
        text-decoration: none;
    }

    table.ep-table td a:hover {
        text-decoration: underline;
    }
</style>

<div id="main">
    {#await rostersInfo}
        <div class="loading">
            <p>Loading season data...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [leagueData, rosterData, users, playersInfo]}
        <h2>Season {leagueData.season}</h2>
        <p class="mono">League ID: {league_id}</p>
        <table class="ep-table">
            <thead>
                <tr>
                    <th>Endpoint</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>League</td>
                    <td><a href={`https://api.sleeper.app/v1/league/${league_id}`} target="_blank" rel="noopener">data</a></td>
                </tr>
                <tr>
                    <td>Rosters</td>
                    <td><a href={`https://api.sleeper.app/v1/league/${league_id}/rosters`} target="_blank" rel="noopener">rosters</a></td>
                </tr>
                <tr>
                    <td>Users</td>
                    <td><a href={`https://api.sleeper.app/v1/league/${league_id}/users`} target="_blank" rel="noopener">users</a></td>
                </tr>
                <tr>
                    <td>Matchups</td>
                    <td><a href={`https://api.sleeper.app/v1/league/${league_id}/matchups/1`} target="_blank" rel="noopener">matchups/1</a></td>
                </tr>
                <tr>
                    <td>Transactions</td>
                    <td><a href={`https://api.sleeper.app/v1/league/${league_id}/transactions/1`} target="_blank" rel="noopener">transactions/1</a></td>
                </tr>
            </tbody>
        </table>
        <h3>Rosters</h3>
        <Rosters {leagueData} rosterData={rosterData} users={users} playersInfo={playersInfo} />
        <h3 style="margin-top:3rem;">Standings</h3>
        {#await waitForAll(standingsData, usersData)}
            <div class="loading">
                <p>Loading standings...</p>
                <LinearProgress indeterminate />
            </div>
        {:then [standingsInfo, usersVal]}
            <Standings standingsData={standingsInfo} usersData={usersVal} />
        {:catch err}
            <p>Could not load standings: {err.message}</p>
        {/await}
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
