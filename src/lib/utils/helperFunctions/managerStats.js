import { round } from './universalFunctions';

/**
 * Computes manager statistics from real league data
 * @param {Object} manager - The manager object
 * @param {Object} leagueTeamManagers - League team manager data
 * @param {Object} records - League records data
 * @param {String} rosterID - Current roster ID
 * @param {Array} awards - Awards data
 * @returns {Object} Manager statistics object
 */
export function computeManagerStats(manager, leagueTeamManagers, records, rosterID, awards) {
    console.log('computeManagerStats called with:', { manager, rosterID, hasRecords: !!records, recordsStructure: records ? Object.keys(records) : null });
    
    // Check if we have the required data
    if (!records || !records.regularSeasonData || !records.regularSeasonData.leagueManagerRecords) {
        console.log('Missing records data structure');
        return { seasons: [] };
    }

    const managerRecords = records.regularSeasonData.leagueManagerRecords;
    console.log('Available manager IDs in records:', Object.keys(managerRecords));
    console.log('Looking for rosterID:', rosterID);
    
    // Convert rosterID to userID using leagueTeamManagers data
    let userID = null;
    if (leagueTeamManagers && leagueTeamManagers.teamManagersMap) {
        // Get the most recent year's data
        const years = Object.keys(leagueTeamManagers.teamManagersMap).map(Number).sort((a, b) => b - a);
        for (const year of years) {
            const yearData = leagueTeamManagers.teamManagersMap[year];
            if (yearData && yearData[rosterID] && yearData[rosterID].managers && yearData[rosterID].managers.length > 0) {
                userID = yearData[rosterID].managers[0]; // Get the primary manager ID
                break;
            }
        }
    }
    
    console.log('Converted rosterID', rosterID, 'to userID:', userID);
    
    // Look up records by userID for aggregated totals
    const managerRecord = userID ? managerRecords[userID] : null;
    
    if (!managerRecord) {
        console.log('No record found for userID:', userID, 'converted from rosterID:', rosterID);
        return { seasons: [] };
    }

    console.log('Found manager record:', managerRecord);

    // Get individual season data from leagueRosterRecords
    const rosterRecords = records.regularSeasonData.leagueRosterRecords;
    const seasonData = rosterRecords && rosterRecords[rosterID] ? rosterRecords[rosterID].years || [] : [];
    
    console.log('Season data for roster', rosterID, ':', seasonData);

    const seasons = [];
    
    // Create season entries for each year the manager played
    for (const yearData of seasonData) {
        let playoffs = false;
        let championship = false;
        let divisionChamp = false;
        
        // Check awards for this specific year and roster
        if (awards && Array.isArray(awards)) {
            for (const award of awards) {
                if (award.year === yearData.year) {
                    const rosterNum = parseInt(rosterID);
                    
                    // Check for championship
                    if (award.champion === rosterNum) {
                        championship = true;
                        playoffs = true;
                    }
                    
                    // Check for runner-up or third place (playoff appearances)
                    if (award.second === rosterNum || award.third === rosterNum) {
                        playoffs = true;
                    }
                    
                    // Check for division championships
                    if (award.divisions && Array.isArray(award.divisions)) {
                        for (const division of award.divisions) {
                            if (division.rosterID === rosterNum) {
                                playoffs = true;
                                divisionChamp = true;
                            }
                        }
                    }
                }
            }
        }

        const season = {
            year: yearData.year,
            wins: yearData.wins || 0,
            losses: yearData.losses || 0,
            ties: yearData.ties || 0,
            fpts: round(yearData.fpts || 0),
            fptsAgainst: round(yearData.fptsAgainst || 0),
            playoffs,
            championship,
            divisionChamp,
            potentialPoints: round(yearData.potentialPoints || 0),
            lineupEfficiency: yearData.potentialPoints > 0 ? 
                round((yearData.fpts / yearData.potentialPoints) * 100) : 0
        };

        seasons.push(season);
    }

    // Sort seasons by year (most recent first)
    seasons.sort((a, b) => b.year - a.year);
    
    console.log('Computed season data:', seasons);

    return { seasons };
}

/**
 * Computes head-to-head records from matchup data
 * @param {Object} manager - The manager object
 * @param {Object} leagueTeamManagers - League team manager data
 * @param {String} rosterID - Current roster ID
 * @param {Array} matchupData - Optional matchup history data
 * @returns {Object} Head-to-head records
 */
export function computeHeadToHeadRecords(manager, leagueTeamManagers, rosterID, matchupData = null) {
    console.log('computeHeadToHeadRecords called with:', { rosterID, hasMatchupData: !!matchupData });
    
    // For now, return a simple example until we can implement full matchup processing
    // This would require access to historical matchup data which isn't currently passed
    
    if (!leagueTeamManagers || !leagueTeamManagers.teamManagersMap) {
        return {};
    }

    // Create example head-to-head data for demonstration
    // In a real implementation, this would process actual matchup history
    const h2hRecords = {};
    
    // Get other roster IDs from current season
    const currentYear = Math.max(...Object.keys(leagueTeamManagers.teamManagersMap).map(Number));
    const currentSeasonRosters = leagueTeamManagers.teamManagersMap[currentYear];
    
    if (currentSeasonRosters) {
        const otherRosterIDs = Object.keys(currentSeasonRosters).filter(id => id !== rosterID.toString());
        
        // For demonstration, create some sample H2H data
        // This should be replaced with actual matchup processing
        otherRosterIDs.slice(0, 3).forEach((opponentRosterID, index) => {
            h2hRecords[opponentRosterID] = {
                wins: Math.floor(Math.random() * 5),
                losses: Math.floor(Math.random() * 5),
                ties: 0,
                pointsFor: Math.floor(Math.random() * 1000) + 1500,
                pointsAgainst: Math.floor(Math.random() * 1000) + 1500
            };
        });
    }
    
    console.log('Generated H2H records:', h2hRecords);
    return h2hRecords;
}

/**
 * Get manager performance level based on win percentage
 * @param {Number} winPercentage - Win percentage (0-100)
 * @returns {Object} Performance level object with color and description
 */
export function getManagerPerformanceLevel(winPercentage) {
    if (winPercentage >= 70) {
        return { 
            level: 'Elite', 
            color: '#4CAF50', 
            description: 'Dominant manager with consistent success' 
        };
    }
    if (winPercentage >= 60) {
        return { 
            level: 'Excellent', 
            color: '#8BC34A', 
            description: 'Strong performer above league average' 
        };
    }
    if (winPercentage >= 50) {
        return { 
            level: 'Solid', 
            color: '#FFC107', 
            description: 'Competitive manager around .500' 
        };
    }
    if (winPercentage >= 40) {
        return { 
            level: 'Developing', 
            color: '#FF9800', 
            description: 'Building toward consistent success' 
        };
    }
    return { 
        level: 'Rebuilding', 
        color: '#f44336', 
        description: 'Working to improve performance' 
    };
}

/**
 * Compute manager rankings based on various metrics
 * @param {Object} records - League records data
 * @param {String} rosterID - Current roster ID
 * @returns {Object} Manager rankings
 */
export function computeManagerRankings(records, rosterID) {
    if (!records?.regularSeasonData?.leagueManagerRecords) {
        return {};
    }

    const allRecords = Object.entries(records.regularSeasonData.leagueManagerRecords)
        .map(([id, record]) => ({ rosterID: id, ...record }));

    // Sort by various metrics
    const winRanking = allRecords
        .sort((a, b) => b.wins - a.wins)
        .findIndex(record => record.rosterID === rosterID) + 1;

    const pointsRanking = allRecords
        .sort((a, b) => b.fptsFor - a.fptsFor)
        .findIndex(record => record.rosterID === rosterID) + 1;

    const efficiencyRanking = allRecords
        .sort((a, b) => (b.fptsFor / (b.potentialPoints || 1)) - (a.fptsFor / (a.potentialPoints || 1)))
        .findIndex(record => record.rosterID === rosterID) + 1;

    return {
        winRanking,
        pointsRanking,
        efficiencyRanking,
        totalManagers: allRecords.length
    };
}