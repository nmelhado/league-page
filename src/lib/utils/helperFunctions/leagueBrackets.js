import { getLeagueData, leagueID } from './leagueData';
import { getLeagueRosters } from './leagueRosters';
import { getLeagueUsers } from './leagueUsers';
import {waitForAll} from './multiPromise';
import { get } from 'svelte/store';
import {brackets} from '$lib/stores';

export const getBrackets = async () => {
	if(get(brackets).champions) {
		return get(brackets);
	}

    // get roster, user, and league data
	const [rosterRes, users, leagueData] = await waitForAll(
		getLeagueRosters(),
		getLeagueUsers(),
		getLeagueData(),
	).catch((err) => { console.error(err); });

	const rosters = rosterRes.rosters;
    const numRosters = rosters.length;

    // get bracket data for winners and losers
	const bracketsAndMatchupFetches = [
        fetch(`https://api.sleeper.app/v1/league/${leagueID}/winners_bracket`, {compress: true}),
        fetch(`https://api.sleeper.app/v1/league/${leagueID}/losers_bracket`, {compress: true}),
    ]

    const playoffsStart = leagueData.settings.playoff_week_start;

    // add each week after the regular season to the fetch array
    for(let i = playoffsStart; i < 19; i++) {
        // Get the matchup data (starters) for the playoff weeks
        bracketsAndMatchupFetches.push(fetch(`https://api.sleeper.app/v1/league/${leagueID}/matchups/${i}`, {compress: true}));
    }
    
    // Simultaneously fetch the bracket and matchup data
    const bracketsAndMatchupResps = await waitForAll(...bracketsAndMatchupFetches).catch((err) => { console.error(err); });

    // an array to hold all the JSON being converted
    const bracketsAndMatchupJson = [];

    // convert all the returned data from JSON
    for(const bracketsAndMatchupResp of bracketsAndMatchupResps) {
        bracketsAndMatchupJson.push(bracketsAndMatchupResp.json());
    }

    // wait for promises to fulfill
    const playoffMatchups = await waitForAll(...bracketsAndMatchupJson).catch((err) => { console.error(err); });

    // The first element above was the winners bracket, so remove that
    const winnersData = playoffMatchups.shift();

    // The second element above was the winners bracket, so remove that, the remaining items are matchup weeks
    const losersData = playoffMatchups.shift();


    // determine the length of the playoffs by looking at the last bracket
	const playoffRounds = winnersData[winnersData.length - 1].r;
	const loserRounds = losersData[losersData.length - 1].r;

    // champBracket is an object where the key will be the round number
    // the value at each key will be an array of matchups
    const champs = evaluateBracket(winnersData, playoffRounds, playoffMatchups, rosters, users);

    // champBracket is an object where the key will be the round number
    // the value at each key will be an array of matchups
    let losers = evaluateBracket(losersData, loserRounds, playoffMatchups, rosters, users);

    const finalBrackets = {
        numRosters,
        playoffsStart,
        playoffRounds,
        loserRounds,
        champs,
        losers,
    }

	brackets.update(() => finalBrackets);

	return finalBrackets;
}

const evaluateBracket = (contestants, rounds, playoffMatchups, rosters, users) => {
    let bracket = [];
    let consolations = [];
    for(let i = 1; i <= rounds; i++) {
        const playoffBrackets = contestants.filter(m => m.r == i);
        const roundMatchups = [];
        let first = true;
        for(const playoffBracket of playoffBrackets) {
            if(!playoffBracket.t1_from && playoffBracket.t2_from) {
                // this was from a team that got a bye
                let byeMatchup = processPlayoffMatchup(playoffBracket, playoffMatchups[i - 2], rosters, users);
                byeMatchup.bye = true;
                if(first) {
                    bracket[i - 2].unshift(byeMatchup);
                    first = false;
                } else {
                    bracket[i - 2].push(byeMatchup);
                }
            }
            const roundMatchup = processPlayoffMatchup(playoffBracket, playoffMatchups[i - 1], rosters, users);
            if(roundMatchup[0].consolation) {
                consolations.push([roundMatchup]);
            } else {
                roundMatchups.push(roundMatchup);
            }
        }
        bracket.push(roundMatchups);
    }
    return {bracket, consolations};
}

const processPlayoffMatchup = (bracket, matchups, rosters, users) => {
    const matchup = [];
    let consolation = false;
    if(bracket.t1_from?.l && bracket.t2_from?.l) {
        consolation = true;
    }

    // first team in matchup
    const t1 = bracket.t1;
    if(t1) {
        const t1user = users[rosters[t1 - 1].owner_id];
        const t1Matchup = matchups.filter(m => m.roster_id == t1)[0]
        matchup.push({
            manager: {
                name: t1user.metadata.team_name ? t1user.metadata.team_name : t1user.display_name,
                avatar: `https://sleepercdn.com/avatars/thumbs/${t1user.avatar}`,
            },
            starters: t1Matchup.starters,
            points: t1Matchup.starters_points,
            consolation
        })
    } else {
        matchup.push({manager: null, consolation});
    }

    // second team in matchup
    const t2 = bracket.t2;
    if(t2) {
        const t2user = users[rosters[t2 - 1].owner_id];
        const t2Matchup = matchups.filter(m => m.roster_id == t2)[0]
        matchup.push({
            manager: {
                name: t2user.metadata.team_name ? t2user.metadata.team_name : t2user.display_name,
                avatar: `https://sleepercdn.com/avatars/thumbs/${t2user.avatar}`,
            },
            starters: t2Matchup.starters,
            points: t2Matchup.starters_points,
            consolation
        })
    } else {
        matchup.push({manager: null, consolation});
    }
    
	return matchup;
}