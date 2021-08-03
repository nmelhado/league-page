<script>
    import BarChart from '$lib/BarChart.svelte';
    import { generateGraph, round, predictScores } from '$lib/utils/helper';
    export let nflState, rostersData, users, players, leagueData;
console.log(leagueData)
    const rosters = rostersData.rosters;

    const currentManagers = {};

    for(const roster of rosters) {
        const user = users[roster.owner_id];
        currentManagers[roster.roster_id] = {
            avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
            name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
        }
    }

    let week = nflState.week;
    if(week == 0) {
        week = 1;
    }
    
    const rosterPowers = [];

    let max = 0;

    for(const roster of rosters) {
        const rosterPlayers = [];

        for(const rosterPlayer of roster.players) {
            rosterPlayers.push({
                name: players[rosterPlayer].last_name,
                position: players[rosterPlayer].position,
                weeklyInfo: players[rosterPlayer].weeklyInfo
            })
        }

        const rosterPower = {
            rosterID: roster.roster_id,
            manager: currentManagers[roster.roster_id],
            powerScore: 0,
        }
        
        for(let i = week; i < Object.keys(rosterPlayers[0].weeklyInfo).length; i++) {
            rosterPower.powerScore += predictScores(rosterPlayers, i, leagueData);
        }
        if(rosterPower.powerScore > max) {
            max = rosterPower.powerScore;
        }
        rosterPowers.push(rosterPower);
    }

    for(const rosterPower of rosterPowers) {
        rosterPower.powerScore = round(rosterPower.powerScore/max * 100);
    }

    const powerGraph = {
        stats: rosterPowers,
        x: "Manager",
        y: "Power Ranking",
        stat: "",
        header: "Rest of Season Power Rankings",
        field: "powerScore",
        short: "ROS Power Ranking"
    };

    const graphs = [
        generateGraph(powerGraph, 10)
    ]

    let curGraph = 0;

    let el;
    let maxWidth = 620;


    const resize = (w) => {
        const left = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
        const right = el?.getBoundingClientRect() ? el?.getBoundingClientRect().right  : 0;

        maxWidth = right - left;
    }
    let innerWidth;

    $: resize(innerWidth);

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    .enclosure {
        display: block;
        position: relative;
        width: 100%;
    }
</style>

<div class="enclosure" bind:this={el}>
    <BarChart {maxWidth} {graphs} bind:curGraph={curGraph} />
</div>