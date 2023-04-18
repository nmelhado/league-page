<script>
	import { goto } from "$app/navigation";
	import { getTeamData } from "$lib/utils/helperFunctions/universalFunctions";

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
    .selectors {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        max-width: 900px;
        margin: 3em auto 2em;
    }
    .manager {
        text-align: center;
    }
    .vs {
        display: inline-block;
        margin: 1em 0;
    }
    .container {
        display: inline-block;
        position: relative;
    }
    .selectInput {
        padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-image: url(/dropdown.png);
        background-repeat: no-repeat;
        text-align: center;
        color: var(--g000);
    }
    .left {
        border: 1px solid var(--barChartOne);
        background-position: 100%;
    }
    select.left:focus {
        outline: none;
        border: 3px solid var(--barChartOne);
    }
    .right {
        border: 1px solid var(--barChartSix);
        background-position: 0%;
    }
    select.right:focus {
        outline: none;
        border: 3px solid var(--barChartSix);
    }
    select option {
        text-align: left;
    }
    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid;
        position: absolute;
        transform: translate(0%, -50%);
        top: 50%;
        background-color: var(--fff);
    }
    .avatarLeft {
        border-color: var(--barChartOne);
        border-right: none;
        left: -18%
    }
    .avatarRight {
        border-color: var(--barChartSix);
        border-left: none;
        right: -18%
    }
    @media (max-width: 650px) {
        label {
            font-size: 1.3em;
        }
        .selectInput {
            padding: 0.3em 1.9em;
            font-size: 1em;
        }
        .avatar {
            width: 40px;
            height: 40px;
        }
        .avatarLeft {
            left: -12%
        }
        .avatarRight {
            right: -12%
        }
    }
    @media (max-width: 530px) {
        .selectors {
            flex-direction: column;
        }
        .avatarRight {
            border-right: none;
            left: -12%
        }
        .right {
            background-position: 100%;
        }
    }
</style>

<div class="selectors">
    <!-- manager 1 -->
    <div class="manager">
        <div class="container">
            <select class="selectInput left" id="managerOne" name="managerOne" bind:value={playerOne}>
                <option value={null}>Select a manager</option>
                {#each usersOne as user}
                    <option value={user}>{leagueTeamManagers.users[user].display_name}</option>
                {/each}
            </select>
            {#if playerOne}
                <img class="avatar avatarLeft" src="{getTeamData(leagueTeamManagers.users, playerOne).avatar}"  alt="manager one avatar"/>
            {/if}
        </div>
    </div>
    <!-- vs -->
    <span class="vs">vs</span>
    <!-- manager 2 -->
    <div class="manager">
        <div class="container">
            <select class="selectInput right" id="managerOne" name="managerOne" bind:value={playerTwo}>
                <option value={null}>Select a manager</option>
                {#each usersTwo as user}
                    <option value={user}>{leagueTeamManagers.users[user].display_name}</option>
                {/each}
            </select>
            {#if playerTwo}
                <img class="avatar avatarRight" src="{getTeamData(leagueTeamManagers.users, playerTwo).avatar}"  alt="manager two avatar"/>
            {/if}
        </div>
    </div>
</div>