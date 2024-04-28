import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { getNflState } from './nflState';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {transactionsStore} from '$lib/stores';
import { browser } from '$app/environment';
import { getLeagueTeamManagers } from './leagueTeamManagers';

export const getLeagueTransactions = async (preview, refresh = false) => {
	const transactionsStoreVal = get(transactionsStore);

	if(transactionsStoreVal.totals) {
		return {
			transactions: checkPreview(preview, transactionsStoreVal.transactions),
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

	const {transactionsData, currentSeason} = await combThroughTransactions(week, leagueID).catch((err) => { console.error(err); });

	const { transactions, totals } = await digestTransactions({transactionsData, currentSeason});

	const transactionPackage = {
		transactions,
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
	let currentSeason = null;

	while(currentLeagueID && currentLeagueID != 0) {
		// gather supporting info simultaneously
		const leagueData = await getLeagueData(currentLeagueID).catch((err) => { console.error(err); });

		leagueIDs.push(currentLeagueID);

		if(!currentSeason) {
			currentSeason = leagueData.season;
		}

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
			if (transactionRes == null || !transactionRes.ok) {
                console.error(transactionRes);
                continue;
			}
			transactionDataPromises.push(transactionRes.json());
	}

	const transactionsDataJson = await waitForAll(...transactionDataPromises).catch((err) => { console.error(err); });

	let transactionsData = [];

	for(const transactionDataJson of transactionsDataJson) {
		transactionsData = transactionsData.concat(transactionDataJson);
	}

	return {transactionsData, currentSeason};
}

const digestTransactions = async ({transactionsData, currentSeason}) => {
	const transactions = [];
	const totals = {
		allTime: {},
		seasons: {}
	};

    const leagueTeamManagers = await getLeagueTeamManagers();

	// trades can be out of order because they are aded to sleeper when the offer is sent
	// this sort puts everything in the correct order
	const transactionOrder = transactionsData.sort((a,b) => b.status_updated - a.status_updated);
	
	for(const transaction of transactionOrder) {
		let {digestedTransaction, season, success} = digestTransaction({transaction, currentSeason});
		if(!success) continue;
		transactions.push(digestedTransaction);
        if(!leagueTeamManagers.teamManagersMap[season]) {
            // the league may not have converted over yet
            season--;
            // there is an edge case when a league is created in the calendar
            // year before the first fantasy season (issue #206)
            if(!leagueTeamManagers.teamManagersMap[season]) {
                season += 2;
            }
        }

		for(const roster of digestedTransaction.rosters) {
			const type = digestedTransaction.type;
            for(const manager of leagueTeamManagers.teamManagersMap[season][roster].managers) {
			    // add to league long totals for each manager involved with the transaction
                if(!totals.allTime[manager]) {
                    totals.allTime[manager] = {
                        trade: 0,
                        waiver: 0
                    };
                }
                totals.allTime[manager][type]++;
            }

            // add to season long totals for each manager
            if(!totals.seasons[season]) {
                totals.seasons[season] = {};
            }
            if(!totals.seasons[season][roster]) {
                totals.seasons[season][roster] = {
                    trade: 0,
                    waiver: 0,
                    rosterID: roster,
                };
            }
            totals.seasons[season][roster][type]++;
		}
	}
	return {transactions, totals};
}

const digestDate = (tStamp) => {
	const a = new Date(tStamp);
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	const hour = a.getHours();
	const min = a.getMinutes();
	return month + ' ' + date + ' ' + year + ', ' + (hour % 12 == 0 ? 12 : hour % 12) + ':' + min + (hour / 12 >= 1 ? "PM" : "AM");
}

const digestTransaction = ({transaction, currentSeason}) => {
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
        season,
		type: "waiver",
		rosters: transactionRosters,
		moves : []
	}
	
	if(transaction.type == "trade") {
		digestedTransaction.type = "trade";
	}
	
	if(season != currentSeason) {
		digestedTransaction.previousOwners = true;
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

		move[transactionRosters.indexOf(pick.owner_id)] = {
			type: "trade",
			pick: {
				season: pick.season,
				round: pick.round,
				original_owner: null,
			},
		}

		if(pick.roster_id != pick.previous_owner_id) {
			move[transactionRosters.indexOf(pick.owner_id)].pick.original_owner = pick.roster_id;
		}

		move[transactionRosters.indexOf(pick.previous_owner_id)] = "origin";

		digestedTransaction.moves.push(move);
	}

	for(let wBudget of transaction.waiver_budget) {

		let move = new Array(transactionRosters.length).fill(null);

		move[transactionRosters.indexOf(wBudget.receiver)] = {
			type: "trade",
			budget: {
				amount: wBudget.amount,
			},
		}

		move[transactionRosters.indexOf(wBudget.sender)] = "origin";

		digestedTransaction.moves.push(move);
	}

	return {digestedTransaction, season, success: true};
}

const handleAdds = (rosters, adds, drops, player, bid) => {
	let move = new Array(rosters.length).fill(null);
	if(drops && drops[player]) {
		move[rosters.indexOf(adds[player])] = {
			type: "trade",
			player
		}

		move[rosters.indexOf(drops[player])] = "origin";
		return move;
	}

	move[rosters.indexOf(adds[player])] = {
		type: "Added",
		player,
		bid
	}

	return move;
}