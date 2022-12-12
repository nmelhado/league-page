import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { getLeagueRosters } from './leagueRosters';
import { getLeagueUsers } from './leagueUsers';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {transactionsStore} from '$lib/stores';
import { browser } from '$app/environment';

export const getLeagueTransactions = async (preview, refresh = false) => {
	const transactionsStoreVal = get(transactionsStore);

	if(transactionsStoreVal.transactions) {
		return {
			transactions: checkPreview(preview, transactionsStoreVal.transactions),
			currentManagers: transactionsStoreVal.currentManagers,
			totals: transactionsStoreVal.totals,
			stale: false
		};
	}

	// if this isn't a refresh data call, check if there are already transactions stored in localStorage
	if(!refresh && browser) {
		let localTransactions = await JSON.parse(localStorage.getItem("transactions"));
		// check if transactions have been saved to localStorage before
		if(localTransactions) {
			localTransactions.transactions = checkPreview(preview, localTransactions.transactions);
			localTransactions.stale = true;
			return localTransactions;
		}
	}

	// gather supporting info simultaneously
	const nflState = await getNflState().catch((err) => { console.error(err); });
	
	let week = 18;
	if(nflState.season_type == 'regular') {
		week = nflState.week;
	}

	const {transactionsData, prevManagers, currentManagers, currentSeason} = await combThroughTransactions(week, leagueID).catch((err) => { console.error(err); });

	const { transactions, totals } = digestTransactions(transactionsData, prevManagers, currentSeason, Object.keys(currentManagers).length);

	const transactionPackage = {
		transactions,
		currentManagers,
		totals
	};

    if(browser) {
	    // update localStorage
        localStorage.setItem("transactions", JSON.stringify(transactionPackage));
    
        // update the store
        transactionsStore.update(() => transactionPackage);
    }

	return {
		transactions: checkPreview(preview, transactions),
		currentManagers,
		totals,
		stale: false
	};
}

const checkPreview = (preview, passedTransactions) => {
	if(preview) {
		// If this is being used for a preview component, only grab 2 trades and waivers
		const previewToReturn = 3;

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

	while(currentLeagueID && currentLeagueID != 0) {
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
			if(user) {
				managers[roster.roster_id] = {
					avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
					name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
				}
			} else {
				managers[roster.roster_id] = {
					avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
					name: 'Unknown Manager',
				}
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

const digestTransactions = (transactionsData, prevManagers, currentSeason, numRosters) => {
	const transactions = [];
	const totals = {
		allTime: {},
		seasons: {}
	};

	for(let i = 1; i <= numRosters; i++) {
		totals.allTime[i] = {
			trade: 0,
			waiver: 0
		};
	}

	// trades can be out of order because they are aded to sleeper when the offer is sent
	// this sort puts everything in the correct order
	const transactionOrder = transactionsData.sort((a,b) => b.status_updated - a.status_updated);
	
	for(const transaction of transactionOrder) {
		const {digestedTransaction, season, success} = digestTransaction(transaction, prevManagers, currentSeason)
		if(!success) continue;
		transactions.push(digestedTransaction);

		for(const roster of digestedTransaction.rosters) {
			const type = digestedTransaction.type;
			// add to league long totals
			totals.allTime[roster][type]++;
			
			// add to season long totals
			if(prevManagers[season]) {
				if(!totals.seasons[season]) {
					totals.seasons[season] = {};
					for(let i = 1; i <= Object.keys(prevManagers[season]).length; i++) {
						totals.seasons[season][i] = {
							trade: 0,
							waiver: 0,
							manager: prevManagers[season][i]
						};
					}
				}
				totals.seasons[season][roster][type]++;
			}
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

const digestTransaction = (transaction, prevManagers, currentSeason) => {
	// don't include failed waiver claims
	if(transaction.status == 'failed') return {success: false};
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
	
	if(season != currentSeason && prevManagers[season]) {
		digestedTransaction.previousOwners = [];
		for(const roster of transactionRosters) {
			digestedTransaction.previousOwners.push(prevManagers[season][roster]);
		}
	}

	const adds = transaction.adds;
	const drops = transaction.drops;
	const draftPicks = transaction.draft_picks;

	for(let player in adds) {
		if(!player) {
			continue;
		}
		handled.push(player);
		digestedTransaction.moves.push(handleAdds(transactionRosters, adds, drops, player, bid));
	}

	for(let player in drops) {
		if(handled.indexOf(player) > -1) {
			continue;
		}

		let move = new Array(transactionRosters.length).fill(null);
		if(!player) {
			continue;
		}
		move[transactionRosters.indexOf(drops[player])] = {
			type: "Dropped",
			player
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

	return {digestedTransaction, season, success: true};
}

const handleAdds = (rosters, adds, drops, player, bid) => {
	let move = new Array(rosters.length).fill(null);
	if(drops && drops[player]) {
		move[rosters.indexOf(drops[player])] = {
			type: "trade",
			player
		}

		move[rosters.indexOf(adds[player])] = "destination";
		return move;
	}

	move[rosters.indexOf(adds[player])] = {
		type: "Added",
		player,
		bid
	}

	return move;
}