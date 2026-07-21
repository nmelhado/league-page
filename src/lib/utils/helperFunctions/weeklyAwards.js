import { getLeagueData } from "./leagueData";
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from "./nflState";
import { waitForAll } from './multiPromise';
import { round } from './universalFunctions';
import { get } from 'svelte/store';
import { weeklyAwardsStore } from '$lib/stores';

/**
 * getWeeklyAwards builds auto-generated, fun "superlative" awards for each
 * completed week of the most recent season that has scoring data.
 *
 * It walks back through previous_league_id if the current season hasn't
 * started yet, so the page always shows something during the offseason.
 *
 * @returns {Object} { year, weeks: [{ week, awards: [...] }], latestWeek }
 */
export const getWeeklyAwards = async () => {
	// return the cached response for this session if we already built it
	if(get(weeklyAwardsStore).weeks) {
		return get(weeklyAwardsStore);
	}

	const [nflState, leagueData] = await waitForAll(
		getNflState(),
		getLeagueData(),
	).catch((err) => { console.error(err); });

	// find the most recent season that actually has scored weeks, walking
	// back through previous seasons if the current one hasn't kicked off yet
	let season = leagueData;
	let processed = null;
	let hops = 0;
	while(season && hops < 15) {
		const regularSeasonLength = season.settings.playoff_week_start - 1;
		const weeks = await buildSeasonWeeks(season.league_id, regularSeasonLength);
		if(weeks.length) {
			processed = { year: parseInt(season.season), weeks };
			break;
		}
		// nothing scored this season yet, drop back to the prior season
		if(!season.previous_league_id || season.previous_league_id == 0) break;
		season = await getLeagueData(season.previous_league_id).catch((err) => { console.error(err); });
		hops++;
	}

	if(!processed) {
		const response = { year: parseInt(leagueData.season), weeks: [], latestWeek: null };
		weeklyAwardsStore.update(() => response);
		return response;
	}

	const response = {
		year: processed.year,
		weeks: processed.weeks,
		latestWeek: processed.weeks[processed.weeks.length - 1].week,
	};

	weeklyAwardsStore.update(() => response);
	return response;
}

// fetch every regular season week for a season and compute awards for the
// weeks that are fully scored (every team has points on the board)
const buildSeasonWeeks = async (seasonLeagueID, regularSeasonLength) => {
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

	const weeks = [];
	for(let i = 0; i < weeklyMatchups.length; i++) {
		const awards = computeWeekAwards(weeklyMatchups[i]);
		if(awards) {
			weeks.push({ week: i + 1, awards });
		}
	}
	return weeks;
}

// turn one week's raw Sleeper matchup array into a list of awards
const computeWeekAwards = (rawMatchups) => {
	if(!rawMatchups || !rawMatchups.length) return null;

	const teams = [];
	const byMatchup = {};

	for(const m of rawMatchups) {
		const starterPoints = (m.starters_points || []).reduce((a, b) => a + (b || 0), 0);
		const total = round(m.points != null ? m.points : starterPoints);

		// bench points = everything a manager left on the pine
		let bench = 0;
		if(m.players_points && m.starters) {
			const starterSet = new Set(m.starters);
			for(const playerID in m.players_points) {
				if(!starterSet.has(playerID)) {
					bench += m.players_points[playerID] || 0;
				}
			}
		}

		const team = {
			rosterID: m.roster_id,
			points: parseFloat(total),
			bench: parseFloat(round(bench)),
			matchupID: m.matchup_id,
		};
		teams.push(team);

		if(m.matchup_id != null) {
			if(!byMatchup[m.matchup_id]) byMatchup[m.matchup_id] = [];
			byMatchup[m.matchup_id].push(team);
		}
	}

	// only build awards for weeks that are fully in the books
	if(!teams.length || teams.some((t) => t.points <= 0)) return null;

	// resolve opponents, margins, and win/loss for every head-to-head
	for(const id in byMatchup) {
		const pair = byMatchup[id];
		if(pair.length !== 2) continue;
		const [a, b] = pair;
		a.opponentRosterID = b.rosterID;
		b.opponentRosterID = a.rosterID;
		a.margin = parseFloat(round(a.points - b.points));
		b.margin = parseFloat(round(b.points - a.points));
		a.won = a.points > b.points;
		b.won = b.points > a.points;
	}

	const awards = [];

	// 🔥 highest score of the week
	const high = [...teams].sort((a, b) => b.points - a.points)[0];
	awards.push({
		key: 'sizzler',
		emoji: '🔥',
		title: 'Sizzler of the Week',
		blurb: 'Put up the most points of anyone',
		rosterID: high.rosterID,
		stat: `${round(high.points)} pts`,
	});

	// 🚽 lowest score of the week
	const low = [...teams].sort((a, b) => a.points - b.points)[0];
	awards.push({
		key: 'toilet',
		emoji: '🚽',
		title: 'Stinker of the Week',
		blurb: 'Fewest points of anyone — yikes',
		rosterID: low.rosterID,
		stat: `${round(low.points)} pts`,
	});

	// 💥 biggest blowout
	const decided = teams.filter((t) => t.won === true);
	if(decided.length) {
		const blowout = [...decided].sort((a, b) => b.margin - a.margin)[0];
		awards.push({
			key: 'blowout',
			emoji: '💥',
			title: 'Beatdown of the Week',
			blurb: 'Won by the widest margin',
			rosterID: blowout.rosterID,
			stat: `by ${round(blowout.margin)}`,
			opponentRosterID: blowout.opponentRosterID,
		});

		// 😰 closest win
		const nailBiter = [...decided].sort((a, b) => a.margin - b.margin)[0];
		awards.push({
			key: 'nailBiter',
			emoji: '😰',
			title: 'Nail-Biter of the Week',
			blurb: 'Survived the closest finish',
			rosterID: nailBiter.rosterID,
			stat: `by ${round(nailBiter.margin)}`,
			opponentRosterID: nailBiter.opponentRosterID,
		});

		// 😤 highest score in a loss
		const losers = teams.filter((t) => t.won === false);
		if(losers.length) {
			const robbed = [...losers].sort((a, b) => b.points - a.points)[0];
			awards.push({
				key: 'robbed',
				emoji: '😤',
				title: 'Hard-Luck Loss',
				blurb: 'Highest score that still lost',
				rosterID: robbed.rosterID,
				stat: `${round(robbed.points)} pts`,
				opponentRosterID: robbed.opponentRosterID,
			});

			// 🍀 lowest score in a win
			const lucky = [...decided].sort((a, b) => a.points - b.points)[0];
			awards.push({
				key: 'lucky',
				emoji: '🍀',
				title: 'Lucky Duck',
				blurb: 'Lowest score that still won',
				rosterID: lucky.rosterID,
				stat: `${round(lucky.points)} pts`,
				opponentRosterID: lucky.opponentRosterID,
			});
		}
	}

	// 🪑 most points left on the bench
	const hasBench = teams.some((t) => t.bench > 0);
	if(hasBench) {
		const benchWarmer = [...teams].sort((a, b) => b.bench - a.bench)[0];
		awards.push({
			key: 'bench',
			emoji: '🪑',
			title: 'Bench Warmer',
			blurb: 'Left the most points on the bench',
			rosterID: benchWarmer.rosterID,
			stat: `${round(benchWarmer.bench)} pts`,
		});
	}

	return awards;
}
