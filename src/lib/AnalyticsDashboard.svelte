<script>
    import EnhancedBarChart from './EnhancedBarChart.svelte';
    import TrendChart from './TrendChart.svelte';
    import RadarChart from './RadarChart.svelte';
    import { round } from '$lib/utils/helper';
    import { 
        calculateAdvancedMetrics, 
        generateTrendData, 
        generatePerformanceInsights,
        calculateStrengthRatings,
        formatComparisonData
    } from '$lib/utils/helperFunctions/advancedStats.js';

    export let managerStats;
    export let leagueTeamManagers;
    export let rosterID;
    export let managerID;

    // Process season data for visualizations
    $: seasons = managerStats?.seasons || [];
    
    // Performance trend data
    $: winsTrendData = seasons.map(season => ({
        x: season.year,
        y: season.wins,
        label: season.year.toString(),
        description: `${season.wins}-${season.losses} record`
    })).reverse(); // Show chronologically

    $: pointsTrendData = seasons.map(season => ({
        x: season.year,
        y: round(season.fpts),
        label: season.year.toString(),
        description: `${round(season.fpts)} points scored`,
        change: seasons.indexOf(season) > 0 ? 
            round(season.fpts - seasons[seasons.indexOf(season) - 1].fpts) : null
    })).reverse();

    // Efficiency trend data
    $: efficiencyTrendData = seasons.map(season => ({
        x: season.year,
        y: season.lineupEfficiency || 0,
        label: season.year.toString(),
        description: `${season.lineupEfficiency || 0}% lineup efficiency`
    })).reverse();

    // Performance comparison data (current season vs career avg)
    $: currentSeasonStats = seasons.length > 0 ? seasons[0] : null;
    $: careerAverages = seasons.length > 0 ? {
        wins: round(seasons.reduce((sum, s) => sum + s.wins, 0) / seasons.length),
        points: round(seasons.reduce((sum, s) => sum + s.fpts, 0) / seasons.length),
        efficiency: round(seasons.reduce((sum, s) => sum + (s.lineupEfficiency || 0), 0) / seasons.length)
    } : null;

    $: comparisonData = currentSeasonStats && careerAverages ? [
        {
            label: 'Current Season',
            y: currentSeasonStats.wins,
            secondaryY: careerAverages.wins,
            description: `${currentSeasonStats.wins} wins this season vs ${careerAverages.wins} career avg`
        },
        {
            label: 'Points',
            y: round(currentSeasonStats.fpts),
            secondaryY: careerAverages.points,
            description: `${round(currentSeasonStats.fpts)} pts vs ${careerAverages.points} avg`
        },
        {
            label: 'Efficiency',
            y: currentSeasonStats.lineupEfficiency || 0,
            secondaryY: careerAverages.efficiency,
            description: `${currentSeasonStats.lineupEfficiency || 0}% vs ${careerAverages.efficiency}% avg`
        }
    ] : [];

    // Radar chart data for multi-dimensional performance
    $: radarData = currentSeasonStats ? [
        {
            label: 'Wins',
            value: Math.min(currentSeasonStats.wins * 6, 100), // Scale wins to 100
            description: 'Regular season wins'
        },
        {
            label: 'Points',
            value: Math.min((currentSeasonStats.fpts / 20), 100), // Scale points to 100
            description: 'Fantasy points scored'
        },
        {
            label: 'Efficiency',
            value: currentSeasonStats.lineupEfficiency || 0,
            description: 'Lineup setting efficiency'
        },
        {
            label: 'Consistency',
            value: currentSeasonStats.fptsAgainst ? 
                Math.min((currentSeasonStats.fpts / currentSeasonStats.fptsAgainst) * 50, 100) : 50,
            description: 'Performance consistency metric'
        },
        {
            label: 'Playoffs',
            value: currentSeasonStats.playoffs ? 85 : 15,
            description: 'Playoff performance'
        },
        {
            label: 'Championships',
            value: currentSeasonStats.championship ? 100 : 
                   seasons.filter(s => s.championship).length > 0 ? 60 : 20,
            description: 'Championship success'
        }
    ] : [];

    // Calculate key insights
    $: insights = {
        bestSeason: seasons.length > 0 ? 
            seasons.reduce((best, season) => season.wins > best.wins ? season : best) : null,
        worstSeason: seasons.length > 0 ? 
            seasons.reduce((worst, season) => season.wins < worst.wins ? season : worst) : null,
        totalChampionships: seasons.filter(s => s.championship).length,
        playoffAppearances: seasons.filter(s => s.playoffs).length,
        averageWins: seasons.length > 0 ? 
            round(seasons.reduce((sum, s) => sum + s.wins, 0) / seasons.length) : 0,
        winTrend: seasons.length > 2 ? 
            (seasons[0].wins - seasons[seasons.length - 1].wins) : 0
    };

    // Performance streaks
    $: performanceStreaks = (() => {
        if (seasons.length < 2) return null;
        
        let currentStreak = 0;
        let streakType = null;
        let longestWinStreak = 0;
        let longestLossStreak = 0;
        
        for (let i = 0; i < seasons.length - 1; i++) {
            const current = seasons[i];
            const next = seasons[i + 1];
            
            if (current.wins > next.wins) {
                if (streakType === 'improving') {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                    streakType = 'improving';
                }
            } else if (current.wins < next.wins) {
                if (streakType === 'declining') {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                    streakType = 'declining';
                }
            } else {
                currentStreak = 0;
                streakType = null;
            }
        }
        
        return { currentStreak, streakType };
    })();
</script>

<style>
    .analytics-dashboard {
        display: grid;
        gap: 2em;
        margin: 2em 0;
    }

    .dashboard-header {
        text-align: center;
        margin-bottom: 2em;
    }

    .dashboard-title {
        font-size: 1.8em;
        font-weight: 700;
        color: var(--blueOne);
        margin-bottom: 0.5em;
    }

    .dashboard-subtitle {
        font-size: 1em;
        color: var(--g555);
        font-style: italic;
    }

    .charts-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2em;
        margin-bottom: 2em;
    }

    .trend-section {
        display: grid;
        gap: 2em;
    }

    .performance-overview {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2em;
    }

    .insights-panel {
        background: var(--fff);
        border-radius: 12px;
        padding: 1.5em;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-left: 4px solid var(--blueTwo);
    }

    .insights-title {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--blueOne);
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        gap: 0.5em;
    }

    .insight-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8em 0;
        border-bottom: 1px solid var(--eee);
    }

    .insight-item:last-child {
        border-bottom: none;
    }

    .insight-label {
        font-weight: 500;
        color: var(--g555);
    }

    .insight-value {
        font-weight: 600;
        color: var(--blueOne);
    }

    .highlight-positive {
        color: #4CAF50 !important;
    }

    .highlight-negative {
        color: #f44336 !important;
    }

    .highlight-neutral {
        color: #FFC107 !important;
    }

    .streak-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        padding: 0.3em 0.8em;
        border-radius: 15px;
        font-size: 0.8em;
        font-weight: 600;
    }

    .streak-improving {
        background: rgba(76, 175, 80, 0.1);
        color: #4CAF50;
    }

    .streak-declining {
        background: rgba(244, 67, 54, 0.1);
        color: #f44336;
    }

    .no-data-message {
        text-align: center;
        color: var(--g666);
        font-style: italic;
        padding: 3em;
        background: var(--f8f9fa);
        border-radius: 12px;
        border: 2px dashed var(--ccc);
    }

    @media (max-width: 1200px) {
        .charts-grid {
            grid-template-columns: 1fr;
        }
        
        .performance-overview {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 768px) {
        .analytics-dashboard {
            gap: 1em;
        }

        .dashboard-title {
            font-size: 1.4em;
        }

        .insights-panel {
            padding: 1em;
        }

        .insight-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.3em;
        }
    }
</style>

<div class="analytics-dashboard">
    <div class="dashboard-header">
        <h2 class="dashboard-title">📊 Advanced Analytics Dashboard</h2>
        <p class="dashboard-subtitle">Comprehensive performance insights and trend analysis</p>
    </div>

    {#if seasons.length > 0}
        <!-- Main Charts Grid -->
        <div class="charts-grid">
            <!-- Trend Analysis Section -->
            <div class="trend-section">
                {#if winsTrendData.length > 1}
                    <TrendChart 
                        data={winsTrendData}
                        title="🏆 Wins Progression Over Time"
                        showArea={true}
                        height={250}
                    />
                {/if}

                {#if pointsTrendData.length > 1}
                    <TrendChart 
                        data={pointsTrendData}
                        title="📈 Fantasy Points Trend"
                        color="var(--blueTwo)"
                        height={250}
                    />
                {/if}
            </div>

            <!-- Performance Overview -->
            <div class="performance-overview">
                {#if radarData.length > 0}
                    <RadarChart 
                        data={radarData}
                        title="🎯 Performance Profile"
                        size={280}
                    />
                {/if}

                <!-- Key Insights Panel -->
                <div class="insights-panel">
                    <div class="insights-title">
                        🔍 Key Insights
                    </div>
                    
                    {#if insights.bestSeason}
                        <div class="insight-item">
                            <span class="insight-label">Best Season</span>
                            <span class="insight-value highlight-positive">
                                {insights.bestSeason.year} ({insights.bestSeason.wins} wins)
                            </span>
                        </div>
                    {/if}

                    {#if insights.totalChampionships > 0}
                        <div class="insight-item">
                            <span class="insight-label">Championships</span>
                            <span class="insight-value highlight-positive">
                                {insights.totalChampionships} 🏆
                            </span>
                        </div>
                    {/if}

                    <div class="insight-item">
                        <span class="insight-label">Playoff Rate</span>
                        <span class="insight-value {insights.playoffAppearances / seasons.length > 0.5 ? 'highlight-positive' : 'highlight-neutral'}">
                            {round((insights.playoffAppearances / seasons.length) * 100)}%
                        </span>
                    </div>

                    <div class="insight-item">
                        <span class="insight-label">Career Average</span>
                        <span class="insight-value">
                            {insights.averageWins} wins/season
                        </span>
                    </div>

                    {#if performanceStreaks?.currentStreak > 0}
                        <div class="insight-item">
                            <span class="insight-label">Current Trend</span>
                            <span class="streak-indicator streak-{performanceStreaks.streakType}">
                                {performanceStreaks.streakType === 'improving' ? '📈' : '📉'}
                                {performanceStreaks.currentStreak} seasons {performanceStreaks.streakType}
                            </span>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Secondary Charts -->
        {#if comparisonData.length > 0}
            <EnhancedBarChart 
                data={comparisonData}
                title="📊 Current Season vs Career Average"
                height={200}
                showTrend={false}
            />
        {/if}

        {#if efficiencyTrendData.length > 1}
            <TrendChart 
                data={efficiencyTrendData}
                title="⚡ Lineup Efficiency Over Time"
                color="#8BC34A"
                height={200}
            />
        {/if}

    {:else}
        <div class="no-data-message">
            <h3>📈 Analytics Coming Soon!</h3>
            <p>Advanced analytics and trend visualizations will appear here once the manager completes their first season.</p>
            <small>Check back after the season ends for comprehensive performance insights.</small>
        </div>
    {/if}
</div>