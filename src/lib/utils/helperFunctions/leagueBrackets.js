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

    // Number of rosters (in order to determine the number of places, i.e. 1st - 12th)
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
    // which matches in the previous round were consolation matches
    let consolationMs = [];
    // which matches in the previous round came from matches where they were winners
    let fromWs = [];
    for(let i = 1; i <= rounds; i++) {
        const playoffBrackets = contestants.filter(m => m.r == i);
        const roundMatchups = [];
        const consolationMatchups = [];
        let first = true;
        const localConsolationMs = [];
        let localFromWs = [];
        for(const playoffBracket of playoffBrackets) {
            if(!playoffBracket.t1_from && playoffBracket.t2_from) {
                // this was from a team that got a bye
                let byeMatchup = processPlayoffMatchup(playoffBracket, playoffMatchups[i - 2], rosters, users, consolationMs, fromWs);
                byeMatchup.bye = true;
                if(first) {
                    bracket[i - 2].unshift(byeMatchup);
                    first = false;
                } else {
                    bracket[i - 2].push(byeMatchup);
                }
            }
            const roundMatchup = processPlayoffMatchup(playoffBracket, playoffMatchups[i - 1], rosters, users, consolationMs, fromWs);
            if(roundMatchup[0].winners) {
                // This matchup came from winners
                localFromWs.push(roundMatchup[0].m)
            }
            if(roundMatchup[0].consolation) {
                // This matchup is a consolation match
                localConsolationMs.push(roundMatchup[0].m)
                consolationMatchups.push(roundMatchup);
            } else {
                roundMatchups.push(roundMatchup);
            }
        }

        bracket.push(roundMatchups);
        for(const consolation of consolations) {
            for(const consolationMatchup of consolationMatchups) {
                // if this matchup originated from winners, then it is a continuation of a previous consolation match
                if(consolationMatchup[0].winners && consolation[i-2] && consolationMatchup[0].t1From == consolation[i-2][0][0].m) {
                    consolation[i-1] = [consolationMatchup];
                }
            }
        }
        // These are matchups between teams that lost their consolation matchup
        const notFromWinners = consolationMatchups.filter(m => !m[0].fromWinners && !m[0].winners);
        // These are matchups between teams that lost in the championship bracket
        const fromWinners = consolationMatchups.filter(m => m[0].fromWinners && !m[0].winners)

        if(notFromWinners.length) consolations.unshift(newConsolation(notFromWinners, rounds, i));
        if(fromWinners.length) consolations.push(newConsolation(fromWinners, rounds, i));

        fromWs = localFromWs;
        consolationMs = localConsolationMs;
    }
    return {bracket, consolations};
}

const newConsolation = (consolationMatchups, rounds, i) => {
    const newConsolation = new Array(rounds).fill([]);
    newConsolation[i - 1] = consolationMatchups;
    return newConsolation;
}

const processPlayoffMatchup = (bracket, matchups, rosters, users, consolationMs, fromWs) => {
    const matchup = [];
    const m = bracket.m;
    const t1From = bracket.t1_from?.w ? bracket.t1_from?.w : bracket.t1_from?.l;
    const t2From = bracket.t2_from?.w ? bracket.t2_from?.w : bracket.t2_from?.l;
    const winners = bracket.t1_from?.w && bracket.t2_from?.w ? true : false;

    const fromWinners = fromWs.indexOf(t2From || -999) > -1 ? true : false;

    let consolation = false;
    if((bracket.t1_from?.l && bracket.t2_from?.l) || consolationMs.indexOf(t1From) > -1 || consolationMs.indexOf(t2From) > -1) {
        consolation = true;
    }

    // first team in matchup
    const t1 = bracket.t1;
    if(t1) {
        const t1user = users[rosters[t1 - 1].owner_id];
        const t1Matchup = matchups.filter(m => m.roster_id == t1)[0]

		if(t1user) {
            matchup.push({
                manager: {
                    name: t1user.metadata.team_name ? t1user.metadata.team_name : t1user.display_name,
                    avatar: `https://sleepercdn.com/avatars/thumbs/${t1user.avatar}`,
                },
                starters: t1Matchup?.starters,
                points: t1Matchup?.starters_points,
                t1From,
                m,
                winners,
                fromWinners,
                consolation
            })
		} else {
            matchup.push({
                manager: {
                    name: 'Unknown Manager',
                    avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
                },
                starters: t1Matchup?.starters,
                points: t1Matchup?.starters_points,
                t1From,
                m,
                winners,
                fromWinners,
                consolation
            })
		}
    
    } else {
        matchup.push({
            manager: null,
            consolation,
            t1From,
            m,
            winners,
            fromWinners,
        });
    }

    // second team in matchup
    const t2 = bracket.t2;
    if(t2) {
        const t2user = users[rosters[t2 - 1].owner_id];
        const t2Matchup = matchups.filter(m => m.roster_id == t2)[0]

		if(t2user) {
            matchup.push({
                manager: {
                    name: t2user.metadata.team_name ? t2user.metadata.team_name : t2user.display_name,
                    avatar: `https://sleepercdn.com/avatars/thumbs/${t2user.avatar}`,
                },
                starters: t2Matchup?.starters,
                points: t2Matchup?.starters_points,
                t2From,
                m,
                winners,
                fromWinners,
                consolation
            })
		} else {
            matchup.push({
                manager: {
                    name: 'Unknown Manager',
                    avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
                },
                starters: t2Matchup?.starters,
                points: t2Matchup?.starters_points,
                t2From,
                m,
                winners,
                fromWinners,
                consolation
            })
		}

    } else {
        matchup.push({
            manager: null,
            consolation,
            t2From,
            winners,
            fromWinners,
            m,
        });
    }
	return matchup;
}