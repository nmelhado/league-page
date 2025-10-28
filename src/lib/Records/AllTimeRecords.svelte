<script>
    import {round} from '$lib/utils/helper'
    import { getRosterIDFromManagerID } from '$lib/utils/helperFunctions/universalFunctions';
	import RecordsAndRankings from './RecordsAndRankings.svelte';

    let { key, leagueManagerRecords, leagueTeamManagers, leagueWeekHighs, leagueWeekLows, allTimeBiggestBlowouts, allTimeClosestMatchups, mostSeasonLongPoints, leastSeasonLongPoints, transactionTotals } = $props();

    let winPercentages = $state([]);
    let lineupIQs = $state([]);
    let fptsHistories = $state([]);
    let tradesData = $state([]);
    let waiversData = $state([]);

    let showTies = $state(false);
    
    for(const managerID in transactionTotals.allTime) {
        tradesData.push({
            managerID,
            trades: transactionTotals.allTime[managerID].trade,
        })
        waiversData.push({
            managerID,
            waivers: transactionTotals.allTime[managerID].waiver,
        })
    }


    const setRankingsData = (lRR) => {
        winPercentages = [];
        lineupIQs = [];
        fptsHistories = [];
        tradesData = [];
        waiversData = [];
        showTies = false;

        for(const key in lRR) {
            const leagueManagerRecord = lRR[key];
            const denominator = (leagueManagerRecord.wins + leagueManagerRecord.ties + leagueManagerRecord.losses) > 0 ? (leagueManagerRecord.wins + leagueManagerRecord.ties + leagueManagerRecord.losses) : 1;
            
            // Get rosterID for this managerID to support co-owner display
            const rosterInfo = getRosterIDFromManagerID(leagueTeamManagers, key);
            const rosterID = rosterInfo ? rosterInfo.rosterID : null;
            
            winPercentages.push({
                managerID: key,
                rosterID: rosterID,
                percentage: round((leagueManagerRecord.wins + leagueManagerRecord.ties / 2) / denominator * 100),
                wins: leagueManagerRecord.wins,
                ties: leagueManagerRecord.ties,
                losses: leagueManagerRecord.losses,
            })

            let lineupIQ = {
                managerID: key,
                rosterID: rosterID,
                fpts: round(leagueManagerRecord.fptsFor),
            }

            if(leagueManagerRecord.potentialPoints) {
                lineupIQ.iq = round(leagueManagerRecord.fptsFor / leagueManagerRecord.potentialPoints * 100);
                lineupIQ.potentialPoints = round(leagueManagerRecord.potentialPoints);
            }

            lineupIQs.push(lineupIQ)
        
            fptsHistories.push({
                managerID: key,
                rosterID: rosterID,
                fptsFor: round(leagueManagerRecord.fptsFor),
                fptsAgainst: round(leagueManagerRecord.fptsAgainst),
                fptsPerGame: round(leagueManagerRecord.fptsFor / denominator),
            })
        
            if(leagueManagerRecord.ties > 0) showTies = true;
        }

        for(const managerID in transactionTotals.allTime) {
            // Get rosterID for this managerID to support co-owner display
            const rosterInfo = getRosterIDFromManagerID(leagueTeamManagers, managerID);
            const rosterID = rosterInfo ? rosterInfo.rosterID : null;
            
            tradesData.push({
                managerID,
                rosterID: rosterID,
                trades: transactionTotals.allTime[managerID].trade,
            })
            waiversData.push({
                managerID,
                rosterID: rosterID,
                waivers: transactionTotals.allTime[managerID].waiver,
            })
        }


        winPercentages.sort((a, b) => b.percentage - a.percentage);
        lineupIQs.sort((a, b) => b.iq - a.iq);
        fptsHistories.sort((a, b) => b.fptsFor - a.fptsFor);
        tradesData.sort((a, b) => b.trades - a.trades);
        waiversData.sort((a, b) => b.waivers - a.waivers);
    }

    $effect(() => {
        setRankingsData(leagueManagerRecords);
    });
</script>

<RecordsAndRankings
    blowouts={allTimeBiggestBlowouts}
    closestMatchups={allTimeClosestMatchups}
    weekRecords={leagueWeekHighs}
    weekLows={leagueWeekLows}
    seasonLongRecords={mostSeasonLongPoints}
    seasonLongLows={leastSeasonLongPoints}
    {showTies}
    {winPercentages}
    {fptsHistories}
    {lineupIQs}
    {tradesData}
    {waiversData}
    prefix="All-Time"
    allTime={true}
    {leagueTeamManagers}
    {key}
/>
