<script>
    import Button, { Group, Label } from '@smui/button';
    import {round} from '$lib/utils/helper'
  	import RecordsAndRankings from './RecordsAndRankings.svelte';

    export let leagueRosterRecords, seasonWeekRecords, leagueTeamManagers, currentYear, lastYear, transactionTotals, key;

    let yearsObj = {};
    let years = [];

    const setData = (lRR) => {
        yearsObj = {};
        years = [];

        let loopYear = currentYear;
        while(loopYear >= lastYear) {
            yearsObj[loopYear] = {
                seasonLongRecords: [],
                winPercentages: [],
                lineupIQs: [],
                fptsHistories: [],
                tradesData: [],
                waiversData: [],
                blowouts: [],
                closestMatchups: [],
                showTies: false,
                year: loopYear
            }
            loopYear--;
        }

        for(const seasonWeekRecord of seasonWeekRecords) {
            yearsObj[seasonWeekRecord.year].weekRecords = seasonWeekRecord.seasonPointsHighs;
            yearsObj[seasonWeekRecord.year].weekLows = seasonWeekRecord.seasonPointsLows;
            yearsObj[seasonWeekRecord.year].blowouts = seasonWeekRecord.biggestBlowouts;
            yearsObj[seasonWeekRecord.year].closestMatchups = seasonWeekRecord.closestMatchups;
        }
        
        for(const season in transactionTotals.seasons) {
            if(!yearsObj[season]) continue;
            for(const rosterID in transactionTotals.seasons[season]) {
                yearsObj[season].tradesData.push({
                    rosterID,
                    trades: transactionTotals.seasons[season][rosterID].trade,
                })
                yearsObj[season].waiversData.push({
                    rosterID,
                    waivers: transactionTotals.seasons[season][rosterID].waiver,
                })
            }
        }
        for(const rosterID in lRR) {
            const leagueManagerRecord = lRR[rosterID];
            for(const season of leagueManagerRecord.years) {
                // check for ties
                if(season.ties > 0) {
                    yearsObj[season.year].showTies = true;
                }

                const fpts = round(season.fpts);
                const fptsPerGame = round(season.fptsPerGame);

                // add season-long scoring record
                yearsObj[season.year].seasonLongRecords.push({
                    rosterID,
                    fpts,
                    fptsPerGame,
                    year: null,
                })

                // add win percentage rankings
                yearsObj[season.year].winPercentages.push({
                    rosterID,
                    percentage: round((season.wins + season.ties / 2) / (season.wins + season.ties + season.losses) * 100),
                    wins: season.wins,
                    ties: season.ties,
                    losses: season.losses,
                })

                // add lineup IQ rankings
                let lineupIQ = {
                    rosterID,
                    fpts: round(season.fpts),
                }
                if(season.potentialPoints) {
                    lineupIQ.iq = round(season.fpts / season.potentialPoints * 100);
                    lineupIQ.potentialPoints = round(season.potentialPoints);
                }

                yearsObj[season.year].lineupIQs.push(lineupIQ)

                // add fantasy points histories
                yearsObj[season.year].fptsHistories.push({
                    rosterID,
                    fptsFor: round(season.fpts),
                    fptsAgainst: round(season.fptsAgainst),
                    fptsPerGame: round(season.fptsPerGame),
                })
            }
        }

        for(const key in yearsObj) {
            // sort records
            yearsObj[key].seasonLongLows = yearsObj[key].seasonLongRecords.slice().sort((a, b) => a.fpts - b.fpts).slice(0, 10);
            yearsObj[key].seasonLongRecords = yearsObj[key].seasonLongRecords.sort((a, b) => b.fpts - a.fpts).slice(0, 10);
            
            // sort rankings
            yearsObj[key].winPercentages.sort((a, b) => b.percentage - a.percentage);
            yearsObj[key].lineupIQs.sort((a, b) => b.iq - a.iq);
            yearsObj[key].fptsHistories.sort((a, b) => b.fptsFor - a.fptsFor);
            yearsObj[key].tradesData.sort((a, b) => b.trades - a.trades);
            yearsObj[key].waiversData.sort((a, b) => b.waivers - a.waivers);

            // add to array
            years.push(yearsObj[key]);
        }

        years.sort((a, b) => b.year - a.year);
    }

    let display = 0;

    $: setData(leagueRosterRecords);
</script>

<style>
    /* Button Styling */
    .buttonHolder {
        text-align: center;
        margin: 0;
    }

    /* Start button resizing */

    @media (max-width: 540px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.6em;
        }
    }

    @media (max-width: 415px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.5em;
            padding: 0 6px;
        }
    }

    @media (max-width: 315px) {
        :global(.buttonHolder .selectionButtons) {
            font-size: 0.45em;
            padding: 0 3px;
        }
    }

    /* End button resizing */
</style>

<div class="buttonHolder">
    <Group variant="outlined">
        {#each years as {year}, ix}
            <Button class="selectionButtons" on:click={() => display = ix} variant="{display == ix ? "raised" : "outlined"}">
                <Label>{year}</Label>
            </Button>
        {/each}
    </Group>
</div>

<RecordsAndRankings
    waiversData={years[display].waiversData}
    tradesData={years[display].tradesData}
    weekRecords={years[display].weekRecords}
    weekLows={years[display].weekLows}
    seasonLongLows={years[display].seasonLongLows}
    seasonLongRecords={years[display].seasonLongRecords}
    showTies={years[display].showTies}
    winPercentages={years[display].winPercentages}
    fptsHistories={years[display].fptsHistories}
    lineupIQs={years[display].lineupIQs}
    blowouts={years[display].blowouts}
    closestMatchups={years[display].closestMatchups}
    prefix={years[display].year}
    {leagueTeamManagers}
    {key}
/>
