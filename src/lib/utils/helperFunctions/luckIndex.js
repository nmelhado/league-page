import { getLeagueData } from "./leagueData";
import { leagueID } from '$lib/utils/leagueInfo';
import { waitForAll } from './multiPromise';
import { round } from './universalFunctions';
import { get } from 'svelte/store';
import { luckIndexStore } from '$lib/stores';

/**
 * getLuckIndex builds "all-play" standings and a luck rating for every team.
 *
 * All-play record: each week, every team is scored against ALL other teams
 * (not just their head-to-head opponent). This strips out schedule luck and
 * shows how strong a team's scoring really is.
 *
 * Luck = actual wins - expected wins, where expected wins are derived from a
 * team's all-play win %. A positive number means a team has won more than its
 * scoring deserved (lucky); a negative number means the opposite (unlucky).
 *
 * Walks back through previous_league_id if the current season hasn't started
 * yet, so the page always shows something during the offseason.
 *
 * @returns {Object} { year, weeksCounted, teams: [...] }
 */
export const getLuckIndex = async () => {
	if(get(luckIndexStore).teams) {
		return get(luckIndexStore);
	}

	const leagueData = await getLeagueData().catch((err) => { console.error(err); });

	// find the most recent season that actually has scored weeks
	let season = leagueData;
	let processed = null;
	let hops = 0;
	while(season && hops < 15) {
		const regularSeasonLength = season.settings.playoff_week_start - 1;
		const result = await buildSeasonLuck(season.league_id, regularSeasonLength);
		if(result.weeksCounted > 0) {
			processed = { year: parseInt(season.season), ...result };
			break;
		}
		if(!season.previous_league_id || season.previous_league_id == 0) break;
		season = await getLeagueData(season.previous_league_id).catch((err) => { console.error(err); });
		hops++;
	}

	if(!processed) {
		const response = { year: parseInt(leagueData.season), weeksCounted: 0, teams: [] };
		luckIndexStore.update(() => response);
		return response;
	}

	luckIndexStore.update(() => processed);
	return processed;
}

const buildSeasonLuck = async (seasonLeagueID, regularSeasonLength) => {
	const matchupPromises = [];
	for(let week = 1; week <= regularSeasonLength; week++) {
		matchupPromises.push(fetch(`https://api.sleeper.app/v1/league/${seasonLeagueID}/matchups/${week}`, {compress: true}));
	}
	const matchupRes = await waitForAll(...matchupPromises).catch((err) => { console.error(err); });

	const jsonPromises = [];
	for(const res of matchupRes) {
		jsonPromises.push(res.json());
	}
	const weeklyMatchups = await waitForAll(...jsonPromises).catch((err) => { console.error(err); });

	// rosterID -> aggregated season stats
	const teamsMap = {};
	const ensureTeam = (rosterID) => {
		if(!teamsMap[rosterID]) {
			teamsMap[rosterID] = {
				rosterID,
				wins: 0, losses: 0, ties: 0,
				allWins: 0, allLosses: 0, allTies: 0,
				pointsFor: 0,
			};
		}
		return teamsMap[rosterID];
	};

	let weeksCounted = 0;

	for(const rawMatchups of weeklyMatchups) {
		if(!rawMatchups || !rawMatchups.length) continue;

		// build each team's weekly score
		const weekTeams = [];
		const byMatchup = {};
		for(const m of rawMatchups) {
			const starterPoints = (m.starters_points || []).reduce((a, b) => a + (b || 0), 0);
			const total = parseFloat(round(m.points != null ? m.points : starterPoints));
			const entry = { rosterID: m.roster_id, points: total, matchupID: m.matchup_id };
			weekTeams.push(entry);
			if(m.matchup_id != null) {
				if(!byMatchup[m.matchup_id]) byMatchup[m.matchup_id] = [];
				byMatchup[m.matchup_id].push(entry);
			}
		}

		// only count fully-scored weeks
		if(!weekTeams.length || weekTeams.some((t) => t.points <= 0)) continue;
		weeksCounted++;

		// actual head-to-head results
		for(const id in byMatchup) {
			const pair = byMatchup[id];
			if(pair.length !== 2) continue;
			const [a, b] = pair;
			const teamA = ensureTeam(a.rosterID);
			const teamB = ensureTeam(b.rosterID);
			if(a.points > b.points) {
				teamA.wins++; teamB.losses++;
			} else if(b.points > a.points) {
				teamB.wins++; teamA.losses++;
			} else {
				teamA.ties++; teamB.ties++;
			}
		}

		// all-play results: compare every team to every other team this week
		for(const t of weekTeams) {
			const team = ensureTeam(t.rosterID);
			team.pointsFor += t.points;
			for(const other of weekTeams) {
				if(other === t) continue;
				if(t.points > other.points) team.allWins++;
				else if(t.points < other.points) team.allLosses++;
				else team.allTies++;
			}
		}
	}

	// finalize derived stats
	const teams = Object.values(teamsMap).map((team) => {
		const games = team.wins + team.losses + team.ties;
		const allGames = team.allWins + team.allLosses + team.allTies;
		const allPlayPct = allGames > 0 ? (team.allWins + team.allTies * 0.5) / allGames : 0;
		const expectedWins = allPlayPct * games;
		const luck = team.wins - expectedWins;
		return {
			...team,
			pointsFor: parseFloat(round(team.pointsFor)),
			allPlayPct,
			expectedWins: parseFloat(round(expectedWins)),
			luck: parseFloat(round(luck)),
		};
	});

	// sort by all-play win % (the true power ranking), points for as tiebreak
	teams.sort((a, b) => b.allPlayPct - a.allPlayPct || b.pointsFor - a.pointsFor);

	return { weeksCounted, teams };
}
