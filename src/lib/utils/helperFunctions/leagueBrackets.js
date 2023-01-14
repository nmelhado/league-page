import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getLeagueRosters } from './leagueRosters';
import {waitForAll} from './multiPromise';
import { get } from 'svelte/store';
import {brackets} from '$lib/stores';

export const getBrackets = async (queryLeagueID = leagueID) => {
    if(get(brackets).champs && queryLeagueID == leagueID) {
        return get(brackets);
    }

    // get roster, user, and league data
    const [rosterRes, leagueData] = await waitForAll(
        getLeagueRosters(queryLeagueID),
        getLeagueData(queryLeagueID),
    ).catch((err) => { console.error(err); });

    // Number of rosters (in order to determine the number of places, i.e. 1st - 12th)
    const numRosters = Object.keys(rosterRes.rosters).length;

    // get bracket data for winners and losers
    const bracketsAndMatchupFetches = [
        fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/winners_bracket`, {compress: true}),
        fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/losers_bracket`, {compress: true}),
    ]

    // variables for playoff records
    // let numPOTeams = parseInt(leagueData.settings.playoff_teams);
    let playoffType;
    const year = parseInt(leagueData.season);
    const playoffsStart = parseInt(leagueData.settings.playoff_week_start);

    // before 2020, 1 week/round was only option; in 2020, 2 weeks/rounds added; in 2021, 1 week/round + 2 champ
    // 0: 1 week per round
    // 1: 1 week per round + 2 champ
    // 2: 2 weeks per round
    if(year > 2019) {
        playoffType = parseInt(leagueData.settings.playoff_round_type);
    } else {
        playoffType = 0;
    }

    // in 2020 type 1 was 2 weeks per round, this was later changed to type 2
    if(year == 2020) {
        if(playoffType == 1) playoffType++;
    }

    // add each week after the regular season to the fetch array
    for(let i = playoffsStart; i < 19; i++) {
        // Get the matchup data (starters) for the playoff weeks
        bracketsAndMatchupFetches.push(fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/matchups/${i}`, {compress: true}));
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
    const champs = evaluateBracket(winnersData, playoffRounds, playoffMatchups, playoffType);

    // champBracket is an object where the key will be the round number
    // the value at each key will be an array of matchups
    let losers = evaluateBracket(losersData, loserRounds, playoffMatchups, playoffType);

    const finalBrackets = {
        numRosters,
        playoffsStart,
        playoffRounds,
        loserRounds,
        champs,
        losers,
    }

    // only update cache for most recent season
    if(queryLeagueID == leagueID) {
        brackets.update(() => finalBrackets);
    }

    return finalBrackets;
}

const evaluateBracket = (contestants, rounds, playoffMatchups, playoffType) => {
    let bracket = [];
    let consolations = [];
    // which matches in the previous round were consolation matches
    let consolationMs = [];
    // which matches in the previous round came from matches where they were winners
    let fromWs = [];
    // teams seen
    let teamsSeen = {};
    for(let i = 1; i <= rounds; i++) {
        const playoffBrackets = contestants.filter(m => m.r == i);
        const roundMatchups = [];
        const consolationMatchups = [];
        let first = true;
        const localConsolationMs = [];
        let localFromWs = [];
        for(const playoffBracket of playoffBrackets) {
            if((!playoffBracket.t1_from && playoffBracket.t2_from) || (!teamsSeen[playoffBracket.t1] && teamsSeen[playoffBracket.t2])) {
                // this was from a team that got a bye
                let byeMatchup = processPlayoffMatchup({playoffBracket, playoffMatchups, i: i - 2, consolationMs, fromWs, playoffType, teamsSeen});
                byeMatchup.bye = true;
                byeMatchup[0].m = null;
                byeMatchup[1].m = null;
                byeMatchup[0].r--;
                byeMatchup[1].r--;
                // set the opponent to null
                byeMatchup[1].roster_id = null;
                if(first) {
                    bracket[i - 2].unshift(byeMatchup);
                    first = false;
                } else {
                    bracket[i - 2].push(byeMatchup);
                }
            }
            teamsSeen[playoffBracket.t1] = playoffBracket.m;
            teamsSeen[playoffBracket.t2] = playoffBracket.m;
            const roundMatchup = processPlayoffMatchup({playoffBracket, playoffMatchups, i: i - 1, consolationMs, fromWs, playoffType, teamsSeen});
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
                if(consolationMatchup[0].winners && consolation[i-2] && consolation[i-2] && consolationMatchup[0].t1From == consolation[i-2][0][0].m) {
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
    const newCons = new Array(rounds).fill([]);
    newCons[i - 1] = consolationMatchups;
    return newCons;
}

const processPlayoffMatchup = ({playoffBracket, playoffMatchups, i, consolationMs, fromWs, playoffType, teamsSeen}) => {
    const matchup = [];
    const m = playoffBracket.m;
    const r = playoffBracket.r;
    const p = playoffBracket.p;
    const t1From = teamsSeen[playoffBracket.t1];
    const t2From = teamsSeen[playoffBracket.t2];
    const winners = playoffBracket.t1_from?.w && playoffBracket.t2_from?.w ? true : false;

    const fromWinners = fromWs.indexOf(t2From || -999) > -1 ? true : false;

    let consolation = false;
    if((p && p != 1) || (playoffBracket.t1_from?.l && playoffBracket.t2_from?.l) || consolationMs.indexOf(t1From) > -1 || consolationMs.indexOf(t2From) > -1) {
        consolation = true;
    }

    // first team in matchup
    const t1 = playoffBracket.t1;
    matchup.push(generateMatchupData(t1, t1From, {m, r, playoffMatchups, i, playoffType, winners, fromWinners, consolation, p}));

    // second team in matchup
    const t2 = playoffBracket.t2;
    matchup.push(generateMatchupData(t2, t2From, {m, r, playoffMatchups, i, playoffType, winners, fromWinners, consolation, p}));

    return matchup;
}

const generateMatchupData = (t, tFrom, {m, r, playoffMatchups, i, playoffType, winners, fromWinners, consolation, p}) => {
    let matchup = {
        roster_id: null,
        points: undefined,
        starters: undefined,
        consolation,
        tFrom,
        m,
        r,
        winners,
        fromWinners,
    }

    if(t) {
        const tMatchup = playoffMatchups[i].filter(ma => ma.roster_id == t)[0];
        let tMatchupStarters = {}
        tMatchupStarters[1] = tMatchup?.starters;
        const tMatchupStartersPoints = {};
        tMatchupStartersPoints[1] = tMatchup?.starters_points;
        
        // playoffType 2: 2 weeks per round
        // playoffType 1: 1 weeks per round, 2 in championship round
        if(playoffType == 2 || (p && p == 1 && playoffType == 1)) {
            const secondWeek = playoffMatchups[i+1].filter(ma => ma.roster_id == t)[0];
            tMatchupStarters[2] = secondWeek?.starters;
            tMatchupStartersPoints[2] = secondWeek?.starters_points;
        }

        matchup.starters = tMatchupStarters;
        matchup.points = tMatchupStartersPoints;
        matchup.roster_id = t;
    }

    return matchup;
}
