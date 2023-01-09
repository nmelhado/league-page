<script>
    import BarChart from '$lib/BarChart.svelte';
    import { generateGraph, round, predictScores, loadPlayers } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    export let nflState, rostersData, leagueTeamManagers, playersInfo, leagueData;

    const rosters = rostersData.rosters;

    let validGraph = false;

    let graphs = [];

    let seasonOver = false;

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
                if(!players[rosterPlayer]) contnue;
                rosterPlayers.push({
                    name: players[rosterPlayer].ln,
                    pos: players[rosterPlayer].pos,
                    wi: players[rosterPlayer].wi
                })
            }

            const rosterPower = {
                rosterID: roster.roster_id,
                manager: getTeamFromTeamManagers(leagueTeamManagers, roster.roster_id),
                powerScore: 0,
            }
            const seasonEnd = 18;
            if(week >= seasonEnd) {
                seasonOver = true;
            }
            for(let i = week; i < seasonEnd; i++) {
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

        graphs = [
            generateGraph(powerGraph, leagueTeamManagers)
        ]
    }

    let players = playersInfo.players;

    buildRankings();

    const refreshPlayers = async () => {
        const newPlayersInfo = await loadPlayers(null, true);
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

{#if validGraph && !seasonOver}
    <div class="enclosure" bind:this={el}>
        <BarChart {maxWidth} {graphs} bind:curGraph={curGraph} />
    </div>
{/if}