import { round } from './universalFunctions';

/**
 * Enhanced statistics calculations for fantasy football analytics
 */

/**
 * Calculate advanced performance metrics from season data
 * @param {Array} seasons - Array of season data objects
 * @returns {Object} Advanced metrics object
 */
export function calculateAdvancedMetrics(seasons) {
    if (!seasons || seasons.length === 0) {
        return {
            consistency: 0,
            volatility: 0,
            peakPerformance: 0,
            resilience: 0,
            efficiency: 0,
            growth: 0
        };
    }

    // Consistency: How stable performance is year over year
    const winPercentages = seasons.map(s => {
        const totalGames = s.wins + s.losses + (s.ties || 0);
        return totalGames > 0 ? (s.wins / totalGames) * 100 : 0;
    });
    
    const avgWinPercentage = winPercentages.reduce((sum, wp) => sum + wp, 0) / winPercentages.length;
    const variance = winPercentages.reduce((sum, wp) => sum + Math.pow(wp - avgWinPercentage, 2), 0) / winPercentages.length;
    const consistency = Math.max(0, 100 - Math.sqrt(variance));

    // Volatility: How much performance varies (inverse of consistency)
    const volatility = 100 - consistency;

    // Peak Performance: Best single season performance
    const peakPerformance = Math.max(...winPercentages);

    // Resilience: Ability to bounce back from poor seasons
    let resilienceScore = 50; // Default middle score
    if (seasons.length > 2) {
        let bouncebacks = 0;
        let opportunities = 0;
        
        for (let i = 1; i < seasons.length - 1; i++) {
            const prev = winPercentages[i + 1]; // Earlier season (reverse chronological)
            const curr = winPercentages[i];
            const next = winPercentages[i - 1]; // Later season
            
            if (prev < 50) { // Poor previous season
                opportunities++;
                if (curr > prev) { // Improved
                    bouncebacks++;
                }
            }
        }
        
        if (opportunities > 0) {
            resilienceScore = (bouncebacks / opportunities) * 100;
        }
    }

    // Efficiency: Average lineup efficiency if available
    const efficiencyScores = seasons.filter(s => s.lineupEfficiency).map(s => s.lineupEfficiency);
    const efficiency = efficiencyScores.length > 0 ? 
        efficiencyScores.reduce((sum, eff) => sum + eff, 0) / efficiencyScores.length : 0;

    // Growth: Trend over time (positive if improving, negative if declining)
    let growth = 0;
    if (seasons.length > 1) {
        const recent = winPercentages.slice(0, Math.min(3, seasons.length)); // Last 3 seasons
        const earlier = winPercentages.slice(-Math.min(3, seasons.length)); // First 3 seasons
        
        const recentAvg = recent.reduce((sum, wp) => sum + wp, 0) / recent.length;
        const earlierAvg = earlier.reduce((sum, wp) => sum + wp, 0) / earlier.length;
        
        growth = recentAvg - earlierAvg;
    }

    return {
        consistency: round(consistency),
        volatility: round(volatility),
        peakPerformance: round(peakPerformance),
        resilience: round(resilienceScore),
        efficiency: round(efficiency),
        growth: round(growth)
    };
}

/**
 * Generate trend analysis data for charts
 * @param {Array} seasons - Array of season data objects
 * @param {string} metric - Metric to analyze ('wins', 'points', 'efficiency')
 * @returns {Array} Chart data array
 */
export function generateTrendData(seasons, metric = 'wins') {
    if (!seasons || seasons.length === 0) return [];

    return seasons.map(season => {
        let value;
        let description;
        
        switch (metric) {
            case 'wins':
                value = season.wins || 0;
                description = `${value} wins in ${season.year}`;
                break;
            case 'points':
                value = round(season.fpts || 0);
                description = `${value} points in ${season.year}`;
                break;
            case 'efficiency':
                value = season.lineupEfficiency || 0;
                description = `${value}% efficiency in ${season.year}`;
                break;
            case 'winPercentage':
                const totalGames = season.wins + season.losses + (season.ties || 0);
                value = totalGames > 0 ? round((season.wins / totalGames) * 100) : 0;
                description = `${value}% win rate in ${season.year}`;
                break;
            default:
                value = 0;
                description = `No data for ${season.year}`;
        }

        return {
            x: season.year,
            y: value,
            label: season.year.toString(),
            description
        };
    }).reverse(); // Show chronologically (oldest to newest)
}

/**
 * Calculate league rankings and percentiles
 * @param {Object} managerStats - Current manager's stats
 * @param {Array} allManagerStats - All managers' stats for comparison
 * @returns {Object} Rankings and percentiles
 */
export function calculateLeagueRankings(managerStats, allManagerStats = []) {
    if (!managerStats?.seasons || allManagerStats.length === 0) {
        return {
            winRanking: 0,
            pointsRanking: 0,
            efficiencyRanking: 0,
            winPercentile: 0,
            pointsPercentile: 0,
            efficiencyPercentile: 0
        };
    }

    const currentSeason = managerStats.seasons[0];
    if (!currentSeason) return {};

    // Calculate current manager's metrics
    const managerWins = currentSeason.wins || 0;
    const managerPoints = currentSeason.fpts || 0;
    const managerEfficiency = currentSeason.lineupEfficiency || 0;

    // Compare against all managers
    const winsComparison = allManagerStats.map(m => m.seasons?.[0]?.wins || 0);
    const pointsComparison = allManagerStats.map(m => m.seasons?.[0]?.fpts || 0);
    const efficiencyComparison = allManagerStats.map(m => m.seasons?.[0]?.lineupEfficiency || 0);

    // Calculate rankings (1-based)
    const winRanking = winsComparison.filter(w => w > managerWins).length + 1;
    const pointsRanking = pointsComparison.filter(p => p > managerPoints).length + 1;
    const efficiencyRanking = efficiencyComparison.filter(e => e > managerEfficiency).length + 1;

    // Calculate percentiles
    const winPercentile = ((allManagerStats.length - winRanking + 1) / allManagerStats.length) * 100;
    const pointsPercentile = ((allManagerStats.length - pointsRanking + 1) / allManagerStats.length) * 100;
    const efficiencyPercentile = ((allManagerStats.length - efficiencyRanking + 1) / allManagerStats.length) * 100;

    return {
        winRanking,
        pointsRanking,
        efficiencyRanking,
        winPercentile: round(winPercentile),
        pointsPercentile: round(pointsPercentile),
        efficiencyPercentile: round(efficiencyPercentile),
        totalManagers: allManagerStats.length
    };
}

/**
 * Generate performance insights and recommendations
 * @param {Object} managerStats - Manager's historical stats
 * @param {Object} advancedMetrics - Advanced metrics object
 * @returns {Array} Array of insight objects
 */
export function generatePerformanceInsights(managerStats, advancedMetrics) {
    const insights = [];
    const seasons = managerStats?.seasons || [];
    
    if (seasons.length === 0) return insights;

    // Championship potential
    const championships = seasons.filter(s => s.championship).length;
    const playoffRate = seasons.filter(s => s.playoffs).length / seasons.length;
    
    if (championships > 0) {
        insights.push({
            type: 'achievement',
            icon: '🏆',
            title: 'Championship Pedigree',
            description: `${championships} championship${championships > 1 ? 's' : ''} won - proven winner!`,
            color: '#FFD700'
        });
    }

    // Consistency analysis
    if (advancedMetrics.consistency > 75) {
        insights.push({
            type: 'strength',
            icon: '🎯',
            title: 'Highly Consistent',
            description: 'Reliable performance year after year. You can count on steady results.',
            color: '#4CAF50'
        });
    } else if (advancedMetrics.consistency < 40) {
        insights.push({
            type: 'improvement',
            icon: '📊',
            title: 'Variable Performance',
            description: 'Performance varies significantly. Focus on consistent lineup management.',
            color: '#FF9800'
        });
    }

    // Growth trend
    if (advancedMetrics.growth > 10) {
        insights.push({
            type: 'positive',
            icon: '📈',
            title: 'Improving Trajectory',
            description: 'Performance trending upward. Keep up the great work!',
            color: '#4CAF50'
        });
    } else if (advancedMetrics.growth < -10) {
        insights.push({
            type: 'warning',
            icon: '📉',
            title: 'Recent Decline',
            description: 'Performance has dipped recently. Consider adjusting your strategy.',
            color: '#f44336'
        });
    }

    // Efficiency insights
    if (advancedMetrics.efficiency > 85) {
        insights.push({
            type: 'strength',
            icon: '⚡',
            title: 'Lineup Wizard',
            description: 'Excellent at setting optimal lineups. Your efficiency is top-tier.',
            color: '#2196F3'
        });
    } else if (advancedMetrics.efficiency < 70) {
        insights.push({
            type: 'improvement',
            icon: '🔧',
            title: 'Lineup Optimization',
            description: 'Room for improvement in lineup decisions. Consider using more data.',
            color: '#FF9800'
        });
    }

    // Resilience insights
    if (advancedMetrics.resilience > 70) {
        insights.push({
            type: 'strength',
            icon: '💪',
            title: 'Strong Resilience',
            description: 'Great at bouncing back from poor seasons. Mental toughness pays off.',
            color: '#4CAF50'
        });
    }

    return insights;
}

/**
 * Calculate strength ratings for radar chart
 * @param {Object} managerStats - Manager's stats
 * @param {Object} advancedMetrics - Advanced metrics
 * @returns {Array} Radar chart data array
 */
export function calculateStrengthRatings(managerStats, advancedMetrics) {
    const seasons = managerStats?.seasons || [];
    const currentSeason = seasons[0];
    
    if (!currentSeason) return [];

    // Calculate win rate score
    const totalGames = currentSeason.wins + currentSeason.losses + (currentSeason.ties || 0);
    const winRateScore = totalGames > 0 ? (currentSeason.wins / totalGames) * 100 : 0;

    // Calculate points score (normalized to 0-100 scale)
    const pointsScore = Math.min((currentSeason.fpts || 0) / 20, 100);

    // Calculate experience score based on seasons played
    const experienceScore = Math.min((seasons.length / 10) * 100, 100);

    // Calculate championship success score
    const championships = seasons.filter(s => s.championship).length;
    const playoffAppearances = seasons.filter(s => s.playoffs).length;
    const successScore = Math.min(((championships * 30) + (playoffAppearances * 10)) / seasons.length, 100);

    return [
        {
            label: 'Win Rate',
            value: round(winRateScore),
            description: 'Season winning percentage'
        },
        {
            label: 'Scoring',
            value: round(pointsScore),
            description: 'Fantasy points production'
        },
        {
            label: 'Consistency',
            value: advancedMetrics.consistency || 0,
            description: 'Performance stability'
        },
        {
            label: 'Efficiency',
            value: advancedMetrics.efficiency || 0,
            description: 'Lineup optimization'
        },
        {
            label: 'Experience',
            value: round(experienceScore),
            description: 'Years in the league'
        },
        {
            label: 'Success',
            value: round(successScore),
            description: 'Playoffs and championships'
        }
    ];
}

/**
 * Format performance comparison data
 * @param {Object} currentStats - Current season stats
 * @param {Object} careerAverages - Career average stats
 * @returns {Array} Comparison chart data
 */
export function formatComparisonData(currentStats, careerAverages) {
    if (!currentStats || !careerAverages) return [];

    return [
        {
            label: 'Wins',
            y: currentStats.wins || 0,
            secondaryY: careerAverages.wins || 0,
            description: `${currentStats.wins || 0} this season vs ${careerAverages.wins || 0} career avg`
        },
        {
            label: 'Points',
            y: round(currentStats.fpts || 0),
            secondaryY: round(careerAverages.points || 0),
            description: `${round(currentStats.fpts || 0)} pts vs ${round(careerAverages.points || 0)} avg`
        },
        {
            label: 'Efficiency',
            y: currentStats.lineupEfficiency || 0,
            secondaryY: careerAverages.efficiency || 0,
            description: `${currentStats.lineupEfficiency || 0}% vs ${careerAverages.efficiency || 0}% avg`
        }
    ];
}