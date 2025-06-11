<script>
    import { round } from "$lib/utils/helper";
	import { checkIfManagerReceivedAward, getTeamNameFromTeamManagers } from "$lib/utils/helperFunctions/universalFunctions";
    import { Icon } from '@smui/icon-button'; // Import SMUI Icon

    export let awards, records, rosterID, tookOver, leagueTeamManagers, managerID;

    let displayAwards = [];

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    let formerGlobal = false;

    const checkIfDeserves = (awardRosterID, userRosterID, year) => {
        if(!managerID || !year || !awardRosterID) {
            return awardRosterID == userRosterID;
        }
        return checkIfManagerReceivedAward(leagueTeamManagers, awardRosterID, year, managerID);
    }

    const checkIfDeservesWithManagerID = (recordManagerID, userRosterID) => {
        if(managerID) {
            return recordManagerID == managerID;
        }
        for(const year in leagueTeamManagers.teamManagersMap) {
            for(const rosterID in  leagueTeamManagers.teamManagersMap[year]) {
                if(leagueTeamManagers.teamManagersMap[year][rosterID].managers.indexOf(recordManagerID) > -1) {
                    return rosterID == userRosterID;
                }
            }
        }
        return false;
    }

    const computePodiums = (cRosterID) => {
        formerGlobal = false;
        displayAwards = [];

        // first look through annual awards (champion, second, etc)
        for(const podium of awards) {
            for(const award in podium) {
                if(award == 'year') continue;
                if(award == 'divisions') {
                    for(const division of podium[award]) {
                        if(checkIfDeserves(division.rosterID, cRosterID, podium.year)) {
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
                                originalName: getTeamNameFromTeamManagers(leagueTeamManagers, cRosterID, podium.year),
                                year: podium.year,
                                former
                            })
                        }
                    }
                } else if(checkIfDeserves(podium[award], cRosterID, podium.year)) {
                    const former = tookOver && tookOver > podium.year;
                    if(former) {
                        formerGlobal = true;
                    }
                    displayAwards.push({
                        award: capitalizeFirstLetter(award),
                        icon: '/awards/' + award + '.png',
                        type: 'award',
                        originalName: getTeamNameFromTeamManagers(leagueTeamManagers, cRosterID, podium.year),
                        year: podium.year,
                        former
                    })
                }
            }
        }

        // Next look through record books
        const leagueManagerRecords = [];
        for(const key in records.regularSeasonData.leagueManagerRecords) {
            const record = records.regularSeasonData.leagueManagerRecords[key];
            record.rosterID = key;
            leagueManagerRecords.push(record);
        }
        const winRecords = [...leagueManagerRecords].sort((a, b) => b.wins - a.wins);
        const pointsRecords = [...leagueManagerRecords].sort((a, b) => b.fptsFor - a.fptsFor);
        const iqRecords = [...leagueManagerRecords].sort((a, b) => (b.fptsFor/b.potentialPoints) - (a.fptsFor/a.potentialPoints));

        for(let i = 0; i < records.regularSeasonData.leagueWeekHighs.length; i++) {
            const leagueWeekRecord = records.regularSeasonData.leagueWeekHighs[i];
            const seasonLongRecord = records.regularSeasonData.mostSeasonLongPoints[i];
            const winRecord = winRecords[i];
            const pointsRecord = pointsRecords[i];
            const iqRecord = iqRecords[i];

            if(checkIfDeservesWithManagerID(winRecord?.rosterID, cRosterID) && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Wins Record',
                    extraInfo: winRecord.wins,
                    wins: true
                })
            }

            if(checkIfDeservesWithManagerID(pointsRecord?.rosterID, cRosterID) && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Fantasy Points Record',
                    extraInfo: round(pointsRecord.fptsFor)
                })
            }

            if(checkIfDeservesWithManagerID(iqRecord?.rosterID, cRosterID) && i < 3) {
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/record-' + (i+1) + '.png',
                    type: 'All-Time Lineup IQ Record',
                    extraInfo: round(iqRecord.fptsFor * 100 / iqRecord.potentialPoints),
                    iq: true
                })
            }

            if(checkIfDeserves(leagueWeekRecord.rosterID, cRosterID, leagueWeekRecord.year)) {
                const former = tookOver && tookOver > leagueWeekRecord.year;
                if(former) {
                    formerGlobal = true;
                }
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                    type: 'All-Time Single Week Record',
                    originalName: getTeamNameFromTeamManagers(leagueTeamManagers, cRosterID, leagueWeekRecord.year),
                    year: leagueWeekRecord.year,
                    week: leagueWeekRecord.week,
                    extraInfo: leagueWeekRecord.fpts,
                    former
                })
            }

            if(checkIfDeserves(seasonLongRecord.rosterID, cRosterID, seasonLongRecord.year)) {
                const former = tookOver && tookOver > seasonLongRecord.year;
                if(former) {
                    formerGlobal = true;
                }
                displayAwards.push({
                    award: i + 1,
                    icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                    type: 'All-Time Season Long Points',
                    originalName: getTeamNameFromTeamManagers(leagueTeamManagers, cRosterID, seasonLongRecord.year),
                    year: seasonLongRecord.year,
                    extraInfo: seasonLongRecord.fpts,
                    former
                })
            }
        }
        for(const yearRecords of records.regularSeasonData.seasonWeekRecords) {
            for(let i = 0; i < 3; i++) {
                const seasonPointsRecord = yearRecords.seasonPointsHighs[i];
                if(checkIfDeserves(seasonPointsRecord.rosterID, cRosterID, yearRecords.year)) {
                    const former = tookOver && tookOver > yearRecords.year;
                    if(former) {
                        formerGlobal = true;
                    }
                    displayAwards.push({
                        award: i + 1,
                        icon: '/awards/' + (i < 3 ? `record-${i+1}` : 'generic') + '.png',
                        type: `${yearRecords.year} Single Week Record`,
                        originalName: getTeamNameFromTeamManagers(leagueTeamManagers, cRosterID, seasonPointsRecord.year),
                        year: null,
                        week: seasonPointsRecord.week,
                        extraInfo: seasonPointsRecord.fpts,
                        former
                    })
                }
            }
        }
    }

    $: computePodiums(rosterID);

    // Icon mapping
    const awardIconMap = {
        'Champion': 'emoji_events',
        'Second': 'military_tech', // Could also be more specific if available like looks_two
        'Third': 'military_tech',  // Could also be more specific if available like looks_3
        'Division Champion': 'stars',
        'Regular Season Champion': 'shield',
        'Toilet Bowl': 'delete_sweep', // Or something more playful
        'All-Time Wins Record': 'leaderboard',
        'All-Time Fantasy Points Record': 'functions', // Sigma for sum/total
        'All-Time Lineup IQ Record': 'psychology',
        'All-Time Single Week Record': 'bolt', // For high score
        'All-Time Season Long Points': 'event_repeat', // For season-long consistency
        'default_record': 'analytics', // Default for other record types
        'default_place': 'verified_user', // Default for other place-based awards
    };

    const getMaterialIconName = (awardType, awardName) => {
        if (awardType === 'award') { // Annual awards like Champion, Second, etc.
            if(awardIconMap[awardName]) return awardIconMap[awardName];
            if(awardName.includes('Division Champion')) return awardIconMap['Division Champion'];
            if(awardName.includes('Regular Season Champion')) return awardIconMap['Regular Season Champion'];
            return awardIconMap['default_place'];
        }
        // For record types
        if(awardIconMap[awardType]) return awardIconMap[awardType];

        // Fallback for numbered places if not directly mapped
        if (typeof awardName === 'number') {
            if (awardName === 1) return 'looks_one';
            if (awardName === 2) return 'looks_two';
            if (awardName === 3) return 'looks_3';
        }
        return 'military_tech'; // A generic fallback
    };

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
    .awardsCase { /* This is the main container for all awards, part of Manager.svelte's card */
        /* background-color: var(--fff); */ /* Already in a card from Manager.svelte */
        padding: 1em 0; /* Adjusted padding */
        /* margin: 3em 0 4em; */ /* Handled by manager-section-card */
        /* border-bottom: 1px solid var(--aaa); */ /* Remove if inside a card */
        /* border-top: 1px solid var(--aaa); */   /* Remove if inside a card */
        /* box-shadow: 0 0 8px 4px var(--ccc); */ /* Remove if inside a card */
    }

    .awardsCaseInner { /* Flex container for individual award cards */
        display: flex;
        justify-content: center; /* Center cards if they don't fill the row */
        flex-wrap: wrap;
        gap: 1em; /* Spacing between award cards */
    }

    h3 { /* "Team Awards & Records" title */
        text-align: center;
        font-size: 1.3em; /* Adjusted size */
        margin: 0 0 1em; /* Adjusted margin */
        font-weight: 600; /* Bolder */
        color: var(--on-surface);
    }

    .award { /* Individual award card */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 1em;
        background-color: var(--background); /* Slightly different from surface for card-in-card */
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        width: 150px; /* Fixed width for each award card */
        min-height: 200px; /* Minimum height for consistency */
        box-sizing: border-box;
    }

    .awardHeader, .awardLabel, .subText {
        text-align: center;
        line-height: 1.2em;
        color: var(--on-surface-variant); /* Default text color for awards */
    }

    .awardHeader { /* Type of award, e.g., "All-Time Wins Record" */
        font-size: 0.8em;
        width: 100%;
        margin-bottom: 0.75em;
        font-weight: 500;
        min-height: 2.4em; /* Allow for two lines */
    }

    .awardLabel { /* Specific award, e.g., "2023 Champion" */
        font-size: 0.95em;
        margin-top: 0.75em;
        font-weight: 600; /* Make the main award label bolder */
        width: 100%;
        color: var(--on-surface); /* More prominent color for the award itself */
    }

    .subText { /* Extra details like points, year, week */
        font-size: 0.75em;
        width: 100%;
        color: var(--g555);
        margin-top: 0.3em;
        font-style: italic;
        min-height: 2.4em; /* Allow for two lines */
    }

    .sad { /* For "...nothing yet" message */
        color: var(--g999);
        font-style: italic;
        padding: 2em;
    }

    .awardIcon { /* Container for the Material Icon */
        font-size: 3em; /* Size of the Material Icon */
        color: var(--mdc-theme-primary, #007bff); /* Use primary color for icons */
        margin-bottom: 0.25em;
        /* Removed old image-specific styles like border-radius, box-shadow, overflow */
    }

    /* .awardImage class is no longer needed if using Material Icons directly */
    
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

<div class="awardsCase"> {/* This div is already inside a manager-section-card from Manager.svelte */}
    <h3>Team Awards & Records</h3>
    <div class="awardsCaseInner">
        {#each displayAwards as awardItem}
            <div class="award">
                <div class="awardHeader">{awardItem.type != 'award' ? awardItem.type : (awardItem.award == 'Champion' || awardItem.award == 'Second' || awardItem.award == 'Third' ? 'League Finish' : capitalizeFirstLetter(awardItem.award))}</div>
                <Icon class="material-icons awardIcon">
                    {getMaterialIconName(awardItem.type, awardItem.award)}
                </Icon>
                <div class="awardLabel">
                    {#if awardItem.type == 'award'}{awardItem.year} {/if}{computeAward(awardItem.award)}{awardItem.former ? '*' : ''}
                </div>
                {#if awardItem.extraInfo}
                    <div class="subText">
                        {#if awardItem.type != 'award' && awardItem.year}{awardItem.year} {/if}
                        {#if awardItem.week}Week {awardItem.week} {/if}
                        {#if (awardItem.type != 'award' && awardItem.year) || awardItem.week} - {/if}
                        {awardItem.extraInfo}{awardItem.wins ? ' Wins' : ''}{awardItem.iq ? '%' : ''}{!award.wins && !award.iq && typeof awardItem.extraInfo == 'number' ? ' pts' : ''}
                    </div>
                {/if}
                 {#if awardItem.originalName && awardItem.former}
                    <div class="subText">(as {awardItem.originalName})</div>
                {/if}
            </div>
        {:else}
            <p class="sad">This manager hasn't racked up any notable awards or records yet.</p>
        {/each}
    </div>
    {#if formerGlobal}
        <p class="disclaimer">* Indicates award was achieved by this team under a previous manager.</p>
    {/if}
</div>