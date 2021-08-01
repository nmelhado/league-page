<script>
    import {round} from '$lib/utils/helper'
  	import RecordsAndRankings from './RecordsAndRankings.svelte';

    export let leagueRosterRecords, leagueWeekRecords, currentManagers, mostSeasonLongPoints, transactionTotals;

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
    
        lineupIQs.push({
            rosterID: key,
            manager: currentManagers[key],
            iq: round(leagueRosterRecord.fptsFor / leagueRosterRecord.potentialPoints * 100),
            fpts: round(leagueRosterRecord.fptsFor),
            potentialPoints: round(leagueRosterRecord.potentialPoints),
        })
    
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
