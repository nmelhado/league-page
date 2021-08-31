import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getLeagueRosters } from "./leagueRosters"
import { getLeagueUsers } from "./leagueUsers"
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {upcomingDraft, previousDrafts} from '$lib/stores';

export const getUpcomingDraft = async () => {
	if(get(upcomingDraft).draft) {
		return get(upcomingDraft);
	}
	const [rosterRes, users, leagueData] = await waitForAll(
		getLeagueRosters(),
		getLeagueUsers(),
		getLeagueData()
	).catch((err) => { console.error(err); });

	const draftID = leagueData.draft_id;
	const regularSeasonLength = leagueData.settings.playoff_week_start - 1;

	let year = parseInt(leagueData.season);

	const rosters = rosterRes.rosters;

	const originalManagers = {};

	for(const roster of rosters) {
		const user = users[roster.owner_id];
		if(user) {
			originalManagers[roster.roster_id] = {
				avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
				name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
			}
		} else {
			originalManagers[roster.roster_id] = {
				avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
				name: 'Unknown Manager',
			}
		}
	}

	const [officialDraftRes, picksRes] = await waitForAll(
		fetch(`https://api.sleeper.app/v1/draft/${draftID}`, {compress: true}),
		fetch(`https://api.sleeper.app/v1/league/${leagueID}/traded_picks`, {compress: true}),
	).catch((err) => { console.error(err); });

	const [officialDraft, picks] = await waitForAll(
		officialDraftRes.json(),
		picksRes.json(),
	).catch((err) => { console.error(err); });

	let draft;
	let draftOrder;
	let accuracy;

	if(officialDraft.status == "complete") {
		year = year + 1;
		const buildRes = buildFromScratch(rosters, officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks.filter(pick => parseInt(pick.season) == year), originalManagers, regularSeasonLength);
		draft = buildRes.draft;
		draftOrder = buildRes.draftOrder;
		accuracy = buildRes.accuracy;
	} else {
		const buildRes = buildConfirmed(officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks.filter(pick => parseInt(pick.season) == year), originalManagers);
		draft = buildRes.draft;
		draftOrder = buildRes.draftOrder;
	}

	const draftData = {
		year,
		draft,
		draftOrder,
		accuracy,
		draftType: officialDraft.type,
		originalManagers
	}
	
	upcomingDraft.update(() => draftData);

	return draftData;
}

// Predict draft board
const buildFromScratch = (rosters, previousOrder, rounds, picks, originalManagers, regularSeasonLength) => {
	const draftOrder = [];
	const testRoster = rosters[0].settings;
	const progression = testRoster.wins + testRoster.ties + testRoster.losses;

	// Build starting order. If the season has started and some games have been played,
	// use win record to predict draft order, otherwise (in preseason) use previous draft order
	if(progression == 0) {
		for (const key in previousOrder) {
			draftOrder.push(previousOrder[key]);
		}
	} else {
		const sortedRosters = rosters.sort((a, b) => {
			const rosterA = a.settings;
			const rosterB = b.settings;
			if(rosterA.wins != rosterB.wins) {
				return rosterA.wins - rosterB.wins;
			}
			if(rosterA.ties != rosterB.ties) {
				return rosterA.ties - rosterB.ties;
			}
			return (rosterA.fpts + rosterA.fpts_decimal / 100) - (rosterB.fpts + rosterB.fpts_decimal / 100);
		})
		for (const key in sortedRosters) {
			draftOrder.push(sortedRosters[key].roster_id);
		}
	}

	const row = new Array(rosters.length);
	let draft = [];

	for(let i = 0; i < rounds; i++) {
		draft.push([...row]);
	}

	for(const pick of picks) {
		if(pick.owner_id == pick.roster_id) continue;
		draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)] = originalManagers[pick.owner_id].name;
	}

	let accuracy = (progression + 1) / (regularSeasonLength + 1);
	// make sure accuracy doesn't exceed 1
	accuracy = accuracy > 1 ? 1 : accuracy;

	return {draft, draftOrder, accuracy };
}

// Build pre-determined draft board
const buildConfirmed = (draftOrderObj, rounds, picks, originalManagers, players = null, type = null) => {
	const draftOrder = [];
	let leagueSize = 0;

	for (const key in draftOrderObj) {
		leagueSize++;
		draftOrder.push(draftOrderObj[key]);
	}

	const row = new Array(leagueSize).fill();
	let draft = [];

	for(let i = 0; i < rounds; i++) {
		draft.push([...row]);
	}

	if(players && type != 'auction') {
		// non-auction leagues
		draft = completedNonAuction({players, draft, picks, originalManagers, draftOrder});
	} else if(players) {
		// auction leagues
		draft = completedAuction({players, draft, picks, originalManagers, draftOrder, draftOrderObj});
	} else {
		for(const pick of picks) {
			if(pick.owner_id == pick.roster_id) continue;
			draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)] = originalManagers[pick.owner_id].name;
		}
	}

	return {draft, draftOrder};
}

const completedNonAuction = ({players, draft, picks, originalManagers, draftOrder}) => {
	for(const playerData of players) {
		const player = {
			name: `${playerData.metadata.first_name} ${playerData.metadata.last_name}`,
			position: playerData.metadata.position,
			team: playerData.metadata.team,
			avatar: playerData.metadata.position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${playerData.player_id.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${playerData.player_id}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
		}
		draft[playerData.round - 1][playerData.draft_slot - 1] = {player};
	}
	for(const pick of picks) {
		if(pick.owner_id == pick.roster_id) continue;
		draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)].newOwner = originalManagers[pick.owner_id].name;
	}
	return draft;
}

const completedAuction = ({players, draft, picks, originalManagers, draftOrder, draftOrderObj}) => {
	const rosters = {};
	for (const key in draftOrderObj) {
		// array to be used for players
		rosters[draftOrderObj[key]] = [];
	}
	for(const playerData of players) {
		const player = {
			name: `${playerData.metadata.first_name} ${playerData.metadata.last_name}`,
			position: playerData.metadata.position,
			team: playerData.metadata.team,
			amount: playerData.metadata.amount,
			avatar: playerData.metadata.position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${playerData.player_id.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${playerData.player_id}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
		}
		rosters[playerData.roster_id].push(player);
	}
	for (const roster in rosters) {
		const col = draftOrder.indexOf(parseInt(roster));
		const sortedRoster = rosters[roster].sort((a,b) => b.amount - a.amount);
		for(let i = 0; i < sortedRoster.length; i++) {
			const player = sortedRoster[i];
			draft[i][col] = {player};
		}
	}
	return draft;
}

export const getPreviousDrafts = async () => {
	if(get(previousDrafts).length > 0) {
		return get(previousDrafts);
	}
	let curSeason = leagueID;

	const drafts = [];
	
	let currentManagers;
	while(curSeason && curSeason != 0) {
		const [rosterRes, users, leagueData] = await waitForAll(
			getLeagueRosters(curSeason),
			getLeagueUsers(curSeason),
			getLeagueData(curSeason)
		).catch((err) => { console.error(err); });
	
		const draftID = leagueData.draft_id;
		let year = parseInt(leagueData.season);
		curSeason = leagueData.previous_league_id;
	
		const rosters = rosterRes.rosters;
	
		const originalManagers = {};

		for(const roster of rosters) {
			const user = users[roster.owner_id];
			if(user) {
				originalManagers[roster.roster_id] = {
					avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
					name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
				}
			} else {
				originalManagers[roster.roster_id] = {
					avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
					name: 'Unknown Manager',
				}
			}
		}
		
		if(!currentManagers) {
			currentManagers = originalManagers;
		}
	
		const [officialDraftRes, picksRes, playersRes] = await waitForAll(
			fetch(`https://api.sleeper.app/v1/draft/${draftID}`, {compress: true}),
			fetch(`https://api.sleeper.app/v1/draft/${draftID}/traded_picks`, {compress: true}),
			fetch(`https://api.sleeper.app/v1/draft/${draftID}/picks`, {compress: true}),
		).catch((err) => { console.error(err); });
	
		const [officialDraft, picks, players] = await waitForAll(
			officialDraftRes.json(),
			picksRes.json(),
			playersRes.json(),
		).catch((err) => { console.error(err); });

		if(officialDraft.status != "complete") continue;
	
		let draft;
		let draftOrder;

	
		const buildRes = buildConfirmed(officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks, originalManagers, players, officialDraft.type);
		draft = buildRes.draft;
		draftOrder = buildRes.draftOrder;
		
		const newDraft = {
			year,
			draft,
			draftOrder,
			draftType: officialDraft.type,
			reversalRound: officialDraft.settings.reversal_round,
			originalManagers
		}
		
		if(originalManagers != currentManagers) {
			newDraft.currentManagers = currentManagers;
		}
	
		drafts.push(newDraft);
	}
	
	previousDrafts.update(() => drafts);

	return drafts;
}