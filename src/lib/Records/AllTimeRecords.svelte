<script>
    import {round} from '$lib/utils/helper'
  	import RecordsAndRankings from './RecordsAndRankings.svelte';

    export let leagueRosterRecords, leagueWeekRecords, allTimeBiggestBlowouts, allTimeClosestMatchups, currentManagers, mostSeasonLongPoints, transactionTotals;

    let winPercentages = [];
    let lineupIQs = [];
    const fptsHistories = [];
    const tradesData = [];
    const waiversData = [];

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


    for(const key in leagueRosterRecords) {
        const leagueRosterRecord = leagueRosterRecords[key];
        winPercentages.push({
            rosterID: key,
            manager: currentManagers[key],
            percentage: round((leagueRosterRecord.wins + leagueRosterRecord.ties / 2) / (leagueRosterRecord.wins + leagueRosterRecord.ties + leagueRosterRecord.losses) * 100),
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
        })
    
        if(leagueRosterRecord.ties > 0) showTies = true;
    }

    winPercentages.sort((a, b) => b.percentage - a.percentage);
    lineupIQs.sort((a, b) => b.iq - a.iq);
    fptsHistories.sort((a, b) => b.fptsFor - a.fptsFor);
    tradesData.sort((a, b) => b.trades - a.trades);
    waiversData.sort((a, b) => b.waivers - a.waivers);
</script>

<RecordsAndRankings
    {currentManagers}
    blowouts={allTimeBiggestBlowouts}
    closestMatchups={allTimeClosestMatchups}
    weekRecords={leagueWeekRecords}
    seasonLongRecords={mostSeasonLongPoints}
    {showTies}
    {winPercentages}
    {fptsHistories}
    {lineupIQs}
    {tradesData}
    {waiversData}
    prefix="All-Time"
    allTime={true}
/>
