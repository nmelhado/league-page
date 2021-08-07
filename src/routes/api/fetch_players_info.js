import { leagueID } from "$lib/utils/leagueInfo"
import { round } from "$lib/utils/helperFunctions/universalFunctions"
import { waitForAll } from "$lib/utils/helperFunctions/multiPromise"

export async function get() {
    // get NFL state from sleeper (week and year)
    const [nflStateRes, leagueDataRes, playoffsRes] = await waitForAll(
        fetch(`https://api.sleeper.app/v1/state/nfl`, {compress: true}),
        fetch(`https://api.sleeper.app/v1/league/${leagueID}`, {compress: true}),
        fetch(`https://api.sleeper.app/v1/league/${leagueID}/winners_bracket`, {compress: true}),
    )
    
    const [nflState, leagueData, playoffs] = await waitForAll(
        nflStateRes.json(),
        leagueDataRes.json(),
        playoffsRes.json(),
    )

	let year = nflState.league_season;
    const regularSeasonLength = leagueData.settings.playoff_week_start - 1;
    const playoffLength = playoffs.pop().r;
    const fullSeasonLength = regularSeasonLength + playoffLength;

    const resPromises = [
        fetch(`https://api.sleeper.app/v1/players/nfl`, {compress: true})
    ];

    for(let week = 1; week <= fullSeasonLength + 3; week++) {
        resPromises.push(
            fetch(`https://api.sleeper.app/projections/nfl/${year}/${week}?season_type=regular&position[]=DEF&position[]=FLEX&position[]=K&position[]=QB&position[]=RB&position[]=TE&position[]=WR&position[]=WRRB_FLEX&order_by=ppr`, {compress: true})
        );
    }
	
	const responses = await waitForAll(...resPromises);

    const resJSONs = [];
    for(const res of responses) {
        if(!res.ok) {
            return {
                status: 500,
                body: "No luck"
            };
        }
        resJSONs.push(res.json());
    }

    const weeklyData = await waitForAll(...resJSONs);

    const playerData = weeklyData.shift(); // first item is all player data, remaining items are weekly data for projections

    const scoringSettings = leagueData.scoring_settings;
        
    const computedPlayers = computePlayers(playerData, weeklyData, scoringSettings);

    return {
        status: 200,
        body: JSON.stringify(computedPlayers)
    };
}

const computePlayers = (playerData, weeklyData, scoringSettings) => {
    const computedPlayers = {};

    // create non weekly dependent player info
    for(const id in playerData) {
        const projPlayer = playerData[id];
        const player = {
            // injury_notes: projPlayer.injury_notes,
            first_name: projPlayer.first_name,
            last_name: projPlayer.last_name,
            position: projPlayer.position,
            team: projPlayer.team,
            weeklyInfo: {} //obj filled with projections, key is week #
        };
        if(projPlayer.injury_status) {
            player.injury_status = projPlayer.injury_status;
        }

        computedPlayers[id] = player;
    }

    // add weekly projections
    for(let week = 1; week <= weeklyData.length; week++) {
        for(const player of weeklyData[week - 1]) {
            const id = player.player_id;
            computedPlayers[id].weeklyInfo[week] = {
                projection: calculateProjection(player.stats, scoringSettings),
                opponent: player.opponent
            }
        }
    }

    computedPlayers["OAK"] = computedPlayers["LV"];
    return computedPlayers;
}

const calculateProjection = (projectedStats, scoreSettings) => {
    let score = 0
    for(const stat in projectedStats) {
        const multiplier = scoreSettings[stat] ? scoreSettings[stat] : 0;
        score += projectedStats[stat] * multiplier;
    }
    return round(score);
}