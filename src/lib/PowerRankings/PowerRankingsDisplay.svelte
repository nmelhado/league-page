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
                    name: players[rosterPlayer].ln,
                    pos: players[rosterPlayer].pos,
                    wi: players[rosterPlayer].wi
                })
            }

            const rosterPower = {
                rosterID: roster.roster_id,
                manager: currentManagers[roster.roster_id],
                powerScore: 0,
            }
            const seasonEnd = 18;
            for(let i = week; i < seasonEnd; i++) {
                //rosterPower.powerScore += predictScores(rosterPlayers, i, leagueData);
            }
            if(rosterPower.powerScore > max) {
                max = rosterPower.powerScore;
            }
            rosterPowers.push(rosterPower);
        }

        // Fraser, Sam, Ryan, Matt, Brandon, Trey, Erik, Kyle, Ward, Connor, Elliot, Foster
        // let manualScores = [89, 64, 74, 100, 76, 68, 71, 81, 54, 82, 83, 71];  // draft
        // let manualScores = [82, 71, 76, 100, 74, 80, 76, 79, 62, 89, 84, 73];  // after week 1
        // let manualScores = [80, 63, 75, 100, 68, 63, 68, 77, 45, 77, 75, 64];  // after week 2
        // let manualScores = [73, 64, 78, 100, 63, 61, 71, 76, 44, 72, 74, 59];  // after week 3
        // let manualScores = [69, 62, 79, 100, 66, 59, 75, 78, 47, 72, 74, 63];  // after week 4
        // let manualScores = [72, 63, 79, 100, 52, 63, 79, 79, 52, 80, 79, 59];  // after week 5
        // let manualScores = [75, 76, 87, 90, 77, 69, 85, 100, 62, 90, 83, 66];  // after week 6
        let manualScores = [77, 87, 95, 84, 80, 77, 92, 100, 74, 99, 91, 69];  // after week 7
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
