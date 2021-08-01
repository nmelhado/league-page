import { leagueID, getLeagueData } from './leagueData';
import { getNflState } from './nflState';
import { loadPlayers } from './players';
import { getLeagueRosters } from './leagueRosters';
import { getLeagueUsers } from './leagueUsers';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {transactionsStore} from '$lib/stores';

export const getLeagueTransactions = async (preview) => {
	const transactionsStoreVal = get(transactionsStore);
	if(transactionsStoreVal.transactions) {
		return {
			transactions: checkPreview(preview, transactionsStoreVal.transactions),
			currentManagers: transactionsStoreVal.currentManagers,
			totals: transactionsStoreVal.totals
		};
	}
	// gather supporting info simultaneously
	const [players, nflState] = await waitForAll(
		loadPlayers(),
		getNflState(),
	).catch((err) => { console.error(err); });
	
	let week = nflState.week;

	const {transactionsData, prevManagers, currentManagers, currentSeason} = await combThroughTransactions(week, leagueID).catch((err) => { console.error(err); });

	const { transactions, totals } = digestTransactions(transactionsData, prevManagers, players, currentSeason);

	const transactionPackage = {
		transactions,
		currentManagers,
		totals
	};

	transactionsStore.update(() => transactionPackage);
		
	return {
		transactions: checkPreview(preview, transactions),
		currentManagers,
		totals
	};
}

const checkPreview = (preview, passedTransactions) => {
	if(preview) {
		// If this is being used for a preview component, only grab 2 trades and waivers
		const previewToReturn = 2;

		const trades = [];
		const waivers = [];
		
		let i = 0;
		while((trades.length < previewToReturn || waivers.length < previewToReturn) && i < passedTransactions.length) {
			if(passedTransactions[i].type == "waiver" && waivers.length < previewToReturn) {
				waivers.push(passedTransactions[i]);
			} else if(passedTransactions[i].type == "trade" && trades.length < previewToReturn) {

				trades.push(passedTransactions[i]);
			}
			i++;
		}

		return {trades, waivers};
	}
	return passedTransactions;
}

const combThroughTransactions = async (week, currentLeagueID) => {
	week = week > 0 ? week : 1;
	
	const leagueIDs = [];
	const prevManagers = {};
	let currentManagers = null;
	let currentSeason = null;

	while(currentLeagueID) {
		// gather supporting info simultaneously
		const [leagueData, rosterRes, users] = await waitForAll(
			getLeagueData(currentLeagueID),
			getLeagueRosters(currentLeagueID),
			getLeagueUsers(currentLeagueID),
		).catch((err) => { console.error(err); });

		leagueIDs.push(currentLeagueID);

		const rosters = rosterRes.rosters;
	
		const managers = {};
	
		for(const roster of rosters) {
			const user = users[roster.owner_id];
			managers[roster.roster_id] = {
				avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
				name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
			}
		}

		if(!currentManagers) {
			currentManagers = managers;
		}

		if(!currentSeason) {
			currentSeason = leagueData.season;
		}

		prevManagers[leagueData.season] = managers;

		currentLeagueID = leagueData.previous_league_id;
	}

	const transactionPromises = [];

	for(const singleLeagueID of leagueIDs) {
		while(week > 0) {
			transactionPromises.push(fetch(`https://api.sleeper.app/v1/league/${singleLeagueID}/transactions/${week}`, {compress: true}));
			week--;
		}
		week = 18;
	}

	const transactionRess = await waitForAll(...transactionPromises).catch((err) => { console.error(err); });

	const transactionDataPromises = [];
	
	for(const transactionRes of transactionRess) {
			if (!transactionRes.ok) {
				throw new Error(transactionRes);
			}
			transactionDataPromises.push(transactionRes.json());
	}

	const transactionsDataJson = await waitForAll(...transactionDataPromises).catch((err) => { console.error(err); });

	let transactionsData = [];

	for(const transactionDataJson of transactionsDataJson) {
		transactionsData = transactionsData.concat(transactionDataJson);
	}

	return {transactionsData, prevManagers, currentManagers, currentSeason};
}

const digestTransactions = (transactionsData, prevManagers, players, currentSeason) => {
	const transactions = [];
	const totals = {
		allTime: {},
		seasons: {}
	};
	
	for(const transaction of transactionsData) {
		const {digestedTransaction, season} = digestTransaction(transaction, prevManagers, players, currentSeason)
		transactions.push(digestedTransaction);

		for(const roster of digestedTransaction.rosters) {
			const type = digestedTransaction.type;
			// add to league long totals
			if(!totals.allTime[roster]) {
				totals.allTime[roster] = {
					trade: 0,
					waiver: 0
				};
			}
			totals.allTime[roster][type]++;
			
			// add to season long totals
			if(!totals.seasons[season]) {
				totals.seasons[season] = {};
			}
			if(!totals.seasons[season][roster]) {
				totals.seasons[season][roster] = {
					trade: 0,
					waiver: 0,
					manager: prevManagers[season][roster]
				};
			}
			totals.seasons[season][roster][type]++;
		}
	}

	return {transactions, totals};
}

const digestDate = (tStamp) => {
	var a = new Date(tStamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	return month + ' ' + date + ' ' + year + ', ' + (hour % 12 == 0 ? 12 : hour % 12) + ':' + min + (hour / 12 >= 1 ? "PM" : "AM");
}

const digestTransaction = (transaction, prevManagers, players, currentSeason) => {
	const handled = [];
	const transactionRosters = transaction.roster_ids;
	const bid = transaction.settings?.waiver_bid;
	const date = digestDate(transaction.status_updated)
	const season = parseInt(date.split(',')[0].split(' ')[2]);


	let digestedTransaction = {
		id: transaction.transaction_id,
		date,
		type: "waiver",
		rosters: transactionRosters,
		moves : []
	}
	
	if(transaction.type == "trade") {
		digestedTransaction.type = "trade";
	}
	
	if(season != currentSeason) {
		digestedTransaction.previousOwners = [];
		for(const roster of transactionRosters) {
			digestedTransaction.previousOwners.push(prevManagers[season][roster]);
		}
	}

	const adds = transaction.adds;
	const drops = transaction.drops;
	const draftPicks = transaction.draft_picks;

	for(let player in adds) {
		if(!players[player]) {
			continue;
		}
		handled.push(player);
		digestedTransaction.moves.push(handleAdds(transactionRosters, adds, drops, player, bid, players));
	}

	for(let player in drops) {
		if(handled.indexOf(player) > -1) {
			continue;
		}

		let move = new Array(transactionRosters.length).fill(null);
		if(!players[player]) {
			continue;
		}
		move[transactionRosters.indexOf(drops[player])] = {
			type: "Dropped",
			player: {
				name: `${players[player].first_name} ${players[player].last_name}`,
				positions: players[player].position,
				team: players[player].team,
				avatar: players[player].position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
			}
		}

		digestedTransaction.moves.push(move);
	}

	for(let pick of draftPicks) {

		let move = new Array(transactionRosters.length).fill(null);

		move[transactionRosters.indexOf(pick.previous_owner_id)] = {
			type: "trade",
			pick: {
				season: pick.season,
				round: pick.round,
				original_owner: null,
			},
		}

		if(pick.roster_id != pick.previous_owner_id) {
			const original_owner = {
				original: season != currentSeason ? prevManagers[season][pick.roster_id].name : null,
				current: pick.roster_id
			}
			move[transactionRosters.indexOf(pick.previous_owner_id)].pick.original_owner = original_owner;
		}

		move[transactionRosters.indexOf(pick.owner_id)] = "destination";

		digestedTransaction.moves.push(move);
	}

	for(let wBudget of transaction.waiver_budget) {

		let move = new Array(transactionRosters.length).fill(null);

		move[transactionRosters.indexOf(wBudget.sender)] = {
			type: "trade",
			budget: {
				amount: `${wBudget.amount}$`,
			},
		}

		move[transactionRosters.indexOf(wBudget.receiver)] = "destination";

		digestedTransaction.moves.push(move);
	}

	return {digestedTransaction, season};
}

const handleAdds = (rosters, adds, drops, player, bid, players) => {
	let move = new Array(rosters.length).fill(null);
	if(drops && drops[player]) {
		move[rosters.indexOf(drops[player])] = {
			type: "trade",
			player: {
				name: `${players[player].first_name} ${players[player].last_name}`,
				positions: players[player].position,
				team: players[player].team,
				avatar: players[player].position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
			}
		}

		move[rosters.indexOf(adds[player])] = "destination";
		return move;
	}

	move[rosters.indexOf(adds[player])] = {
		type: "Added",
		player: {
			name: `${players[player].first_name} ${players[player].last_name}`,
			positions: players[player].position,
			team: players[player].team,
			avatar: players[player].position == "DEF" ? `background-image: url(https://sleepercdn.com/images/team_logos/nfl/${player.toLowerCase()}.png)` : `background-image: url(https://sleepercdn.com/content/nfl/players/thumb/${player}.jpg), url(https://sleepercdn.com/images/v2/icons/player_default.webp)`,
		},
		bid
	}

	return move;
}