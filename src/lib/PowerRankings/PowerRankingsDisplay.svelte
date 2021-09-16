<script>
    import BarChart from '$lib/BarChart.svelte';
    import { generateGraph, round, predictScores, loadPlayers } from '$lib/utils/helper';
    export let nflState, rostersData, users, playersInfo, leagueData;

    const rosters = rostersData.rosters;

    const currentManagers = {};

    for(const roster of rosters) {
        const user = users[roster.owner_id];
        currentManagers[roster.roster_id] = {
            avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
            name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
        }
    }

    let validGraph = false;

    let graphs = [];

    const buildRankings = () => {
        const rosterPowers = [];
        let week = nflState.week;
        if(week == 0) {
            week = 1;
        }
        let max = 0;

        for(const roster of rosters) {
            // make sure the roster has players on it
            if(!roster.players) continue;
            // if at least one team has players, create the graph
            validGraph = true;

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
            const seasonEnd = Object.keys(rosterPlayers[0].weeklyInfo).length || 18;
            for(let i = week; i < seasonEnd; i++) {
                //rosterPower.powerScore += predictScores(rosterPlayers, i, leagueData);
            }
            if(rosterPower.powerScore > max) {
                max = rosterPower.powerScore;
            }
            rosterPowers.push(rosterPower);
        }

        // Fraser, Sam, Ryan, Matt, Brandon, Trey, Erik, Kyle, Ward Connor, Elliot Foster
        // let manualScores = [89, 64, 74, 100, 76, 68, 71, 81, 54, 82, 83, 71];  // draft
        let manualScores = [82, 71, 76, 100, 74, 80, 76, 79, 62, 89, 84, 73];  // week 1
        let i = 0;
        for(const rosterPower of rosterPowers) {
            rosterPower.powerScore = manualScores[i];
            i++;
        }

        const powerGraph = {
            stats: rosterPowers,
            x: "Manager",
            y: "Power Ranking",
            stat: "",
            header: "Rest of Season Power Rankings (Fantasy Pros)",
            field: "powerScore",
            short: "ROS Power Ranking"
        };

        graphs = [
            generateGraph(powerGraph, 10)
        ]
    }

    let players = playersInfo.players;

    buildRankings();

    const refreshPlayers = async () => {
        const newPlayersInfo = await loadPlayers(true);
        players = newPlayersInfo.players;
        buildRankings();
    }

    if(playersInfo.stale) {
        refreshPlayers();
    }

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

{#if validGraph}
    <div class="enclosure" bind:this={el}>
        <BarChart {maxWidth} {graphs} bind:curGraph={curGraph} />
    </div>
{/if}
