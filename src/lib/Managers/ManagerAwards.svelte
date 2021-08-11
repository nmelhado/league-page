<script>
    import { round } from "$lib/utils/helper";

    export let awards, records, roster, tookOver;

    let displayAwards = [];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    let formerGlobal = false;

    const computePodiums = (currentRoster) => {
        formerGlobal = false;
        displayAwards = [];

        // first lookl through annual awards (champion, second, etc)
        for(const podium of awards.podiums) {
            for(const award in podium) {
                if(podium[award]?.rosterID == currentRoster.roster_id) {
                    const former = tookOver && tookOver > podium.year;
                    if(former) {
                        formerGlobal = true;
                    }
                    displayAwards.push({
                        award: capitalizeFirstLetter(award),
                        icon: '/awards/' + award + '.png',
                        type: 'award',
                        originalName: podium[award].name,
                        year: podium.year,
                        former
                    })
                }
                if(award == 'divisions') {
                    for(const division of podium[award]) {
                        if(division.roster == currentRoster.roster_id) {
                            const former = tookOver && tookOver > podium.year;
                            if(former) {
                                formerGlobal = true;
                            }
                            let awardTitle = 'Regular Season Champion';
                            if(division.name) {
                                awardTitle = `${division.name} Division Champion`;
                            }
                            displayAwards.push({
                                award: awardTitle,
                                icon: '/awards/division.png',
                                type: 'award',
                                originalName: division.manager.name,
                                year: podium.year,
                                former
                            })
                        }
                    }
                }
            }
        }

        // Next look through record books
        const leagueRosterRecords = [];
        for(const key in records.leagueRosterRecords) {
            const record = records.leagueRosterRecords[key];
            record.rosterID = key;
            leagueRosterRecords.push(record);
        }
        const winRecords = [...leagueRosterRecords].sort((a, b) => b.wins - a.wins);
        const pointsRecords = [...leagueRosterRecords].sort((a, b) => b.fptsFor - a.fptsFor);
        const iqRecords = [...leagueRosterRecords].sort((a, b) => (b.fptsFor/b.potentialPoints) - (a.fptsFor/a.potentialPoints));

        for(let i = 0; i < records.leagueWeekRecords.length; i++) {
            const leagueWeekRecord = records.leagueWeekRecords[i];
            const seasonLongRecord = records.mostSeasonLongPoints[i];
            const winRecord = winRecords[i];
            const pointsRecord = pointsRecords[i];
            const iqRecord = iqRecords[i];

            if(winRecord?.rosterID == currentRoster.roster_id && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Wins Record',
                    extraInfo: winRecord.wins,
                    wins: true
                })
            }

            if(pointsRecord?.rosterID == currentRoster.roster_id && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Fantasy Points Record',
                    extraInfo: round(pointsRecord.fptsFor)
                })
            }

            if(iqRecord?.rosterID == currentRoster.roster_id && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Lineup IQ Record',
                    extraInfo: round(iqRecord.fptsFor * 100 / iqRecord.potentialPoints),
                    iq: true
                })
            }

            if(leagueWeekRecord.rosterID == currentRoster.roster_id) {
                const former = tookOver && tookOver > leagueWeekRecord.year;
                if(former) {
                    formerGlobal = true;
                }
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                    type: 'All-Time Single Week Record',
                    originalName: leagueWeekRecord.manager.name,
                    year: leagueWeekRecord.year,
                    week: leagueWeekRecord.week,
                    extraInfo: leagueWeekRecord.fpts,
                    former
                })
            }

            if(seasonLongRecord.rosterID == currentRoster.roster_id) {
                const former = tookOver && tookOver > seasonLongRecord.year;
                if(former) {
                    formerGlobal = true;
                }
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                    type: 'All-Time Season Long Points',
                    originalName: seasonLongRecord.manager.name,
                    year: seasonLongRecord.year,
                    extraInfo: seasonLongRecord.fpts,
                    former
                })
            }
        }
        for(const yearRecords of records.seasonWeekRecords) {
            for(let i = 0; i < 3; i++) {
                const seasonPointsRecord = yearRecords.seasonPointsRecords[i];

                if(seasonPointsRecord.rosterID == currentRoster.roster_id) {
                    const former = tookOver && tookOver > yearRecords.year;
                if(former) {
                    formerGlobal = true;
                }
                    displayAwards.push({
                        award: i + 1,
                        icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                        type: `${yearRecords.year} Single Week Record`,
                        originalName: seasonPointsRecord.manager.name,
                        year: null,
                        week: seasonPointsRecord.week,
                        extraInfo: seasonPointsRecord.fpts,
                        former
                    })
                }
            }
        }
    }

    $: computePodiums(roster);

    const computeAward = (award) => {
        switch (award) {
            case 1:
                return '1st Place'
            case 2:
                return '2nd Place'
            case 3:
                return '3rd Place'
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return award + 'th Place';
            case 'Champion':
                return award
            case 'Second':
            case 'Third':
                return award + ' Place'
            case 'Toilet':
                return award + ' Bowl'
            default:
                return award;
        }
    }
</script>

<style>
    .awardsCase {
        background-color: var(--fff);
        padding: 0 0 2em;
        margin: 3em 0 4em;
        border-bottom: 1px solid var(--aaa);
        border-top: 1px solid var(--aaa);
        box-shadow: 0 0 8px 4px var(--ccc);
    }

    .awardsCaseInner {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    h3 {
        text-align: center;
        font-size: 1.5em;
        margin: 1.5em 0 0.5em;
        font-weight: 200;
    }

    .award {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin: 1em 0.5em 2em;
    }

    .awardHeader, .awardLabel, .subText {
        text-align: center;
        line-height: 1.2em;
    }

    .awardHeader {
        height: 2.4em;
        font-size: 0.85em;
        width: 110px;
        margin-bottom: 0.5em;
    }

    .awardLabel {
        font-size: 0.9em;
        margin-top: 1em;
        font-weight: 500;
        width: 130px;
    }

    .subText {
        font-size: 0.8em;
        width: 130px;
        color: var(--g555);
        margin-top: 0.3em;
        font-style: italic;
    }

    .sad {
        color: var(--g999);
        font-style: italic;
    }

    .awardIcon {
        height: 80px;
        width: 80px;
        border-radius: 100%;
        box-shadow: 0 0 4px 1px var(--ccc);
        text-align: center;
        overflow: hidden;
    }

    .awardImage{
        height: 100%;
    }
    
    .disclaimer {
        font-size: 0.8em;
        color: var(--g999);
        font-style: italic;
        text-align: center;
        margin: 0;
        line-height: 1em;
    }

    @media (max-width: 730px) {
        .awardHeader {
            height: 3.6em;
            font-size: 0.8em;
            width: 90px;
        }

        .awardLabel {
            width: 90px;
        }

        .subText {
            width: 90px;
        }
    }

    @media (max-width: 530px) {
        .awardIcon {
            height: 60px;
            width: 60px;
        }

        .awardHeader {
            height: 3.6em;
            font-size: 0.58em;
            width: 65px;
        }

        .awardLabel {
            font-size: 0.7em;
            width: 65px;
        }

        .subText {
            font-size: 0.6em;
            width: 65px;
        }
    }


</style>

<div class="awardsCase">
    <h3>Team Awards & Records</h3>
    <div class="awardsCaseInner">
        {#each displayAwards as award}
            <div class="award">
                <div class="awardHeader">{award.type != 'award' ? award.type : ''}</div>
                <div class="awardIcon">
                    <img class="awardImage" src="{award.icon}" alt="trophy" />
                </div>
                <div class="awardLabel">{award.type == 'award' ? `${award.year} ` : ''}{computeAward(award.award)}{award.former ? '*' : ''}</div>
                {#if award.extraInfo}
                    <div class="subText">{award.year ? `${award.year} ` : ''}{award.week ? `Week ${award.week} ` : ''}{award.year || award.week ? ' - ' : ''}{award.extraInfo}{award.wins ? ' Wins' : ''}{award.iq ? '%' : ''}{!award.wins && !award.iq ? 'pts' : ''}</div>
                {/if}
            </div>

        {/each}
        {#if displayAwards.length == 0}
            <p class="sad">...nothing yet</p>
        {/if}
    </div>
    {#if formerGlobal}
        <p class="disclaimer">*Awarded under a previous manager</p>
    {/if}
</div>