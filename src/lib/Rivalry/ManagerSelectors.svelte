<script>
	import { goto } from "$app/navigation";

    export let playerOne, playerTwo, leagueTeamManagers;

    const users = Object.keys(leagueTeamManagers.users);

    $: usersOne = users.filter(u => u !== playerTwo);
    $: usersTwo = users.filter(u => u !== playerOne);

    const analyzeRivalry = (p1, p2) => {
        if(!p1 || !p2) {
            return;
        }
        goto(`/rivalry?player_one=${p1}&player_two=${p2}`, {noscroll: true,  keepfocus: true})
    }

    $: analyzeRivalry(playerOne, playerTwo)
</script>

<style>
    label {
        display: block;
    }
    .selectors {
        display: flex;
        justify-content: space-evenly;
    }
    .manager {
        text-align: center;
    }
</style>

<div class="selectors">
    <!-- manager 1 -->
    <div class="manager">
        <label for="managerOne">Choose manager One</label>
        <select id="managerOne" name="managerOne" bind:value={playerOne}>
            <option value={null}>Select a manager</option>
            {#each usersOne as user}
                <option value={user}>{leagueTeamManagers.users[user].display_name}</option>
            {/each}
        </select>
    </div>
    <!-- manager 2 -->
    <div class="manager">
        <label for="managerOne">Choose manager Two</label>
        <select id="managerOne" name="managerOne" bind:value={playerTwo}>
            <option value={null}>Select a manager</option>
            {#each usersTwo as user}
                <option value={user}>{leagueTeamManagers.users[user].display_name}</option>
            {/each}
        </select>
    </div>
</div>