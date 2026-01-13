import { round } from "$lib/utils/helpers/helper";
import { getTeamNameFromTeamManagers } from "$lib/utils/helpers/universalFunctions";

/**
 * Computes annual awards (champion, second place, division champions, etc.)
 *
 * @param {Array} awards - Array of annual award podiums
 * @param {string|number} cRosterID - Current roster ID to check awards for
 * @param {Function} checkIfDeserves - Function to check if roster deserves award
 * @param {number|null} tookOver - Year the manager took over (for former award marking)
 * @param {Function} capitalizeFirstLetter - Function to capitalize first letter of string
 * @param {Object} leagueTeamManagers - League team managers data
 * @returns {Array} Array of annual award objects
 */
export function computeAnnualAwards(awards, cRosterID, checkIfDeserves, tookOver, capitalizeFirstLetter, leagueTeamManagers) {
    const annualAwards = [];

    for(const podium of awards) {
        for(const award in podium) {
            if(award == 'year') continue;
            if(award == 'divisions') {
                for(const division of podium[award]) {
                    if(checkIfDeserves(division.rosterID, cRosterID, podium.year)) {
                        const former = tookOver && tookOver > podium.year;
                        let awardTitle = 'Regular Season Champion';
                        if(division.name) {
                            awardTitle = `${division.name} Division Champion`;
                        }
                        annualAwards.push({
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
                annualAwards.push({
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

    return annualAwards;
}

/**
 * Computes all-time records (wins, fantasy points, lineup IQ)
 *
 * @param {Object} records - Records object containing league statistics
 * @param {string|number} cRosterID - Current roster ID to check records for
 * @param {Function} checkIfDeservesWithManagerID - Function to check if manager deserves record
 * @returns {Array} Array of all-time record objects
 */
export function computeAllTimeRecords(records, cRosterID, checkIfDeservesWithManagerID) {
    const allTimeRecords = [];

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
        const winRecord = winRecords[i];
        const pointsRecord = pointsRecords[i];
        const iqRecord = iqRecords[i];

        if(checkIfDeservesWithManagerID(winRecord?.rosterID, cRosterID) && i < 3) {
            allTimeRecords.push({
                award: i + 1,
                icon: '/awards/record-' + (i+1) + '.png',
                type: 'All-Time Wins Record',
                extraInfo: winRecord.wins,
                wins: true
            })
        }

        if(checkIfDeservesWithManagerID(pointsRecord?.rosterID, cRosterID) && i < 3) {
            allTimeRecords.push({
                award: i + 1,
                icon: '/awards/record-' + (i+1) + '.png',
                type: 'All-Time Fantasy Points Record',
                extraInfo: round(pointsRecord.fptsFor)
            })
        }

        if(checkIfDeservesWithManagerID(iqRecord?.rosterID, cRosterID) && i < 3) {
            allTimeRecords.push({
                award: i + 1,
                icon: '/awards/record-' + (i+1) + '.png',
                type: 'All-Time Lineup IQ Record',
                extraInfo: round(iqRecord.fptsFor * 100 / iqRecord.potentialPoints),
                iq: true
            })
        }
    }

    return allTimeRecords;
}

/**
 * Computes week and season long records (single week highs, season long points)
 *
 * @param {Object} records - Records object containing league statistics
 * @param {string|number} cRosterID - Current roster ID to check records for
 * @param {Function} checkIfDeserves - Function to check if roster deserves record
 * @param {number|null} tookOver - Year the manager took over (for former record marking)
 * @param {Object} leagueTeamManagers - League team managers data
 * @returns {Array} Array of week record objects
 */
export function computeWeekRecords(records, cRosterID, checkIfDeserves, tookOver, leagueTeamManagers) {
    const weekRecords = [];

    for(let i = 0; i < records.regularSeasonData.leagueWeekHighs.length; i++) {
        const leagueWeekRecord = records.regularSeasonData.leagueWeekHighs[i];
        const seasonLongRecord = records.regularSeasonData.mostSeasonLongPoints[i];

        if(checkIfDeserves(leagueWeekRecord.rosterID, cRosterID, leagueWeekRecord.year)) {
            const former = tookOver && tookOver > leagueWeekRecord.year;
            weekRecords.push({
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
            weekRecords.push({
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

    return weekRecords;
}

/**
 * Computes season-specific records (single week records for each season)
 *
 * @param {Object} records - Records object containing league statistics
 * @param {string|number} cRosterID - Current roster ID to check records for
 * @param {Function} checkIfDeserves - Function to check if roster deserves record
 * @param {number|null} tookOver - Year the manager took over (for former record marking)
 * @param {Object} leagueTeamManagers - League team managers data
 * @returns {Array} Array of season record objects
 */
export function computeSeasonRecords(records, cRosterID, checkIfDeserves, tookOver, leagueTeamManagers) {
    const seasonRecords = [];

    for(const yearRecords of records.regularSeasonData.seasonWeekRecords) {
        for(let i = 0; i < 3; i++) {
            const seasonPointsRecord = yearRecords.seasonPointsHighs[i];
            if(checkIfDeserves(seasonPointsRecord.rosterID, cRosterID, yearRecords.year)) {
                const former = tookOver && tookOver > yearRecords.year;
                seasonRecords.push({
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

    return seasonRecords;
}
