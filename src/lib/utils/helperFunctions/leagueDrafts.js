import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {upcomingDraft, previousDrafts} from '$lib/stores';
import { getLeagueRosters } from './leagueRosters';

export const getUpcomingDraft = async () => {
	if(get(upcomingDraft).draft) {
		return get(upcomingDraft);
	}
    const [rosterRes, leagueData] = await waitForAll(
		getLeagueRosters(),
		getLeagueData()
	).catch((err) => { console.error(err); });

	const draftID = leagueData.draft_id;
	const regularSeasonLength = leagueData.settings.playoff_week_start - 1;

	let year = parseInt(leagueData.season);

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

    const rosters = rosterRes.rosters;

	if(officialDraft.status == "complete") {
		year = year + 1;
		const buildRes = buildFromScratch(rosters, officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks.filter(pick => parseInt(pick.season) == year), regularSeasonLength);
		draft = buildRes.draft;
		draftOrder = buildRes.draftOrder;
		accuracy = buildRes.accuracy;
	} else {
		const buildRes = buildConfirmed(officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks.filter(pick => parseInt(pick.season) == year));
		draft = buildRes.draft;
		draftOrder = buildRes.draftOrder;
	}

	const draftData = {
		year,
		draft,
		draftOrder,
		accuracy,
		draftType: officialDraft.type,
		reversalRound: officialDraft.settings.reversal_round,
	}
	
	upcomingDraft.update(() => draftData);

	return draftData;
}

// Predict draft board
const buildFromScratch = (rosters, previousOrder, rounds, picks, regularSeasonLength) => {
	const draftOrder = [];
    const rosterKeys = Object.keys(rosters);
    const testRoster = rosters[rosterKeys[0]].settings;
	const progression = testRoster.wins + testRoster.ties + testRoster.losses;

	// Build starting order. If the season has started and some games have been played,
	// use win record to predict draft order, otherwise (in preseason) use previous draft order
	if(progression == 0) {
		for (const key in previousOrder) {
			draftOrder.push(previousOrder[key]);
		}
	} else {
		const sortedRosterKeys = rosterKeys.sort((a, b) => {
			const rosterA = rosters[a].settings;
			const rosterB = rosters[b].settings;
			if(rosterA.wins != rosterB.wins) {
				return rosterA.wins - rosterB.wins;
			}
			if(rosterA.ties != rosterB.ties) {
				return rosterA.ties - rosterB.ties;
			}
			return (rosterA.fpts + rosterA.fpts_decimal / 100) - (rosterB.fpts + rosterB.fpts_decimal / 100);
		})
		for (const key of sortedRosterKeys) {
			draftOrder.push(key);
		}
	}

	const row = new Array(rosterKeys.length);
	let draft = [];

	for(let i = 0; i < rounds; i++) {
		draft.push([...row]);
	}

	for(const pick of picks) {
		if(pick.owner_id == pick.roster_id || pick.round > rounds) continue;
		draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)] = pick.owner_id;
	}

	let accuracy = (progression + 1) / (regularSeasonLength + 1);
	// make sure accuracy doesn't exceed 1
	accuracy = accuracy > 1 ? 1 : accuracy;

	return {draft, draftOrder, accuracy };
}

// Build pre-determined draft board
const buildConfirmed = (draftOrderObj, rounds, picks, players = null, type = null) => {
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
		draft = completedNonAuction({players, draft, picks, draftOrder, rounds});
	} else if(players) {
		// auction leagues
		draft = completedAuction({players, draft, draftOrder, draftOrderObj});
	} else {
		for(const pick of picks) {
			if(pick.owner_id == pick.roster_id || pick.round > rounds) continue;
			draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)] = pick.owner_id;
		}
	}

	return {draft, draftOrder};
}

const completedNonAuction = ({players, draft, picks, draftOrder, rounds}) => {
	for(const playerData of players) {
		const player = playerData.player_id;
		draft[playerData.round - 1][playerData.draft_slot - 1] = {player};
	}
	for(const pick of picks) {
		if(pick.owner_id == pick.roster_id || pick.round > rounds) continue;
		draft[pick.round - 1][draftOrder.indexOf(pick.roster_id)].newOwner = pick.owner_id;
	}
	return draft;
}

const completedAuction = ({players, draft, draftOrder, draftOrderObj}) => {
	const rosters = {};
	for (const key in draftOrderObj) {
		// array to be used for players
		rosters[draftOrderObj[key]] = [];
	}
	for(const playerData of players) {
		const data = {player: playerData.player_id, amount: playerData.metadata.amount};
		rosters[playerData.roster_id].push(data);
	}
	for (const roster in rosters) {
		const col = draftOrder.indexOf(parseInt(roster));
		const sortedRoster = rosters[roster].sort((a,b) => b.amount - a.amount);
		for(let i = 0; i < sortedRoster.length; i++) {
			draft[i][col] = sortedRoster[i];
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
	
	while(curSeason && curSeason != 0) {
		const [leagueData, completedDraftsInfo] = await waitForAll(
            getLeagueData(curSeason).catch((err) => { console.error(err); }),
            fetch(`https://api.sleeper.app/v1/league/${curSeason}/drafts`, {compress: true}),
        ).catch((err) => { console.error(err); });

        const completedDrafts = await completedDraftsInfo.json();
        curSeason = leagueData.previous_league_id;

        for(const completedDraft of completedDrafts) {
            const draftID = completedDraft.draft_id;
            const year = parseInt(completedDraft.season);
        
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

        
            const buildRes = buildConfirmed(officialDraft.slot_to_roster_id, officialDraft.settings.rounds, picks, players, officialDraft.type);
            draft = buildRes.draft;
            draftOrder = buildRes.draftOrder;

            const newDraft = {
                year,
                draft,
                draftOrder,
                draftType: officialDraft.type,
                reversalRound: officialDraft.settings.reversal_round,
            }
        
            drafts.push(newDraft);
        }
	
	}
	
	previousDrafts.update(() => drafts);

	return drafts;
}