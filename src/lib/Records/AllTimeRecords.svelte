<script>
    import {round} from '$lib/utils/helper'
  	import RecordsAndRankings from './RecordsAndRankings.svelte';

    export let key, leagueRosterRecords, leagueWeekHighs, leagueWeekLows, allTimeBiggestBlowouts, allTimeClosestMatchups, currentManagers, mostSeasonLongPoints, leastSeasonLongPoints, transactionTotals;

    let winPercentages = [];
    let lineupIQs = [];
    let fptsHistories = [];
    let tradesData = [];
    let waiversData = [];

    let showTies = false;
    
    for(const rosterID in transactionTotals.allTime) {
        tradesData.push({
            rosterID,
            manager: currentManagers[rosterID],
            trades: transactionTotals.allTime[rosterID].trade,
        })
        waiversData.push({
            rosterID,
            manager: currentManagers[rosterID],
            waivers: transactionTotals.allTime[rosterID].waiver,
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
            const leagueRosterRecord = lRR[key];
            const denominator = (leagueRosterRecord.wins + leagueRosterRecord.ties + leagueRosterRecord.losses) > 0 ? (leagueRosterRecord.wins + leagueRosterRecord.ties + leagueRosterRecord.losses) : 1;
            winPercentages.push({
                rosterID: key,
                manager: currentManagers[key],
                percentage: round((leagueRosterRecord.wins + leagueRosterRecord.ties / 2) / denominator * 100),
                wins: leagueRosterRecord.wins,
                ties: leagueRosterRecord.ties,
                losses: leagueRosterRecord.losses,
            })

            let lineupIQ = {
                rosterID: key,
                manager: currentManagers[key],
                fpts: round(leagueRosterRecord.fptsFor),
            }

            if(leagueRosterRecord.potentialPoints) {
                lineupIQ.iq = round(leagueRosterRecord.fptsFor / leagueRosterRecord.potentialPoints * 100);
                lineupIQ.potentialPoints = round(leagueRosterRecord.potentialPoints);
            }

            lineupIQs.push(lineupIQ)
        
            fptsHistories.push({
                rosterID: key,
                manager: currentManagers[key],
                fptsFor: round(leagueRosterRecord.fptsFor),
                fptsAgainst: round(leagueRosterRecord.fptsAgainst),
                fptsPerGame: round(leagueRosterRecord.fptsFor / denominator),
            })
        
            if(leagueRosterRecord.ties > 0) showTies = true;
        }

        for(const rosterID in transactionTotals.allTime) {
            tradesData.push({
                rosterID,
                manager: currentManagers[rosterID],
                trades: transactionTotals.allTime[rosterID].trade,
            })
            waiversData.push({
                rosterID,
                manager: currentManagers[rosterID],
                waivers: transactionTotals.allTime[rosterID].waiver,
            })
        }


        winPercentages.sort((a, b) => b.percentage - a.percentage);
        lineupIQs.sort((a, b) => b.iq - a.iq);
        fptsHistories.sort((a, b) => b.fptsFor - a.fptsFor);
        tradesData.sort((a, b) => b.trades - a.trades);
        waiversData.sort((a, b) => b.waivers - a.waivers);
    }

    $:setRankingsData(leagueRosterRecords)
</script>

<RecordsAndRankings
    {currentManagers}
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
    {key}
/>
