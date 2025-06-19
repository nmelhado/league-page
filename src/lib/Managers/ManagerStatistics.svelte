<script>
    import { round } from '$lib/utils/helper';
    import BarChart from '$lib/BarChart.svelte';

    export let managerStats, leagueTeamManagers, rosterID, managerID;

    // Debug logging
    $: if (managerStats) {
        console.log('ManagerStatistics received data:', { managerStats, rosterID, seasons: managerStats.seasons });
    }

    // Calculate manager performance metrics
    $: seasons = managerStats?.seasons || [];
    $: totalWins = seasons.reduce((sum, season) => sum + (season.wins || 0), 0);
    $: totalLosses = seasons.reduce((sum, season) => sum + (season.losses || 0), 0);
    $: totalPoints = seasons.reduce((sum, season) => sum + (season.fpts || 0), 0);
    $: winPercentage = totalWins + totalLosses > 0 ? round((totalWins / (totalWins + totalLosses)) * 100) : 0;
    $: averagePointsPerSeason = seasons.length > 0 ? round(totalPoints / seasons.length) : 0;
    $: playoffAppearances = seasons.filter(season => season.playoffs).length;
    $: championships = seasons.filter(season => season.championship).length;

    // Performance trends for visualization
    $: winTrendData = seasons.map(season => ({
        x: season.year,
        y: season.wins || 0
    }));

    $: pointsTrendData = seasons.map(season => ({
        x: season.year,
        y: season.fpts || 0
    }));

    $: performanceLevel = (() => {
        if (winPercentage >= 70) return { level: 'Elite', color: '#4CAF50', description: 'Dominant manager with consistent success' };
        if (winPercentage >= 60) return { level: 'Excellent', color: '#8BC34A', description: 'Strong performer above league average' };
        if (winPercentage >= 50) return { level: 'Solid', color: '#FFC107', description: 'Competitive manager around .500' };
        if (winPercentage >= 40) return { level: 'Developing', color: '#FF9800', description: 'Building toward consistent success' };
        return { level: 'Rebuilding', color: '#f44336', description: 'Working to improve performance' };
    })();
</script>

<style>
    .statisticsContainer {
        background-color: var(--fff);
        padding: 1.5em;
        margin: 2em 0;
        border-radius: 12px;
        border: 1px solid var(--ccc);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .sectionTitle {
        font-size: 1.4em;
        font-weight: 600;
        color: var(--blueOne);
        margin-bottom: 1.5em;
        text-align: center;
        border-bottom: 2px solid var(--blueOne);
        padding-bottom: 0.5em;
    }

    .statsGrid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5em;
        margin-bottom: 2em;
    }

    .statCard {
        background: linear-gradient(135deg, var(--fff) 0%, var(--f8f9fa) 100%);
        border: 1px solid var(--e9ecef);
        border-radius: 8px;
        padding: 1.2em;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .statCard:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    .statValue {
        font-size: 2em;
        font-weight: 700;
        color: var(--blueOne);
        margin-bottom: 0.3em;
    }

    .statLabel {
        font-size: 0.9em;
        color: var(--g555);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .performanceLevel {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        margin: 1.5em 0;
        padding: 1em;
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%);
        border-left: 4px solid var(--performance-color);
    }

    .levelBadge {
        padding: 0.5em 1em;
        border-radius: 20px;
        color: white;
        font-weight: 600;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .levelDescription {
        font-style: italic;
        color: var(--g666);
        font-size: 0.9em;
    }

    .chartSection {
        margin-top: 2em;
    }

    .chartTitle {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--g555);
        margin-bottom: 1em;
        text-align: center;
    }

    .noDataMessage {
        text-align: center;
        color: var(--g666);
        font-style: italic;
        padding: 2em;
        background-color: var(--f8f9fa);
        border-radius: 8px;
        border: 1px dashed var(--ccc);
    }

    .achievementHighlight {
        background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
        border: 1px solid #fadb14;
        color: #8b4513;
    }

    .trendContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2em;
        margin-top: 1.5em;
    }

    @media (max-width: 768px) {
        .statsGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1em;
        }

        .statCard {
            padding: 1em;
        }

        .statValue {
            font-size: 1.5em;
        }

        .trendContainer {
            grid-template-columns: 1fr;
        }

        .performanceLevel {
            flex-direction: column;
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        .statsGrid {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="statisticsContainer">
    <div class="sectionTitle">Manager Performance Statistics</div>
    
    {#if seasons.length > 0}
        <div class="statsGrid">
            <div class="statCard">
                <div class="statValue">{totalWins}</div>
                <div class="statLabel">Total Wins</div>
            </div>
            
            <div class="statCard">
                <div class="statValue">{totalLosses}</div>
                <div class="statLabel">Total Losses</div>
            </div>
            
            <div class="statCard">
                <div class="statValue">{winPercentage}%</div>
                <div class="statLabel">Win Rate</div>
            </div>
            
            <div class="statCard">
                <div class="statValue">{round(averagePointsPerSeason)}</div>
                <div class="statLabel">Avg Points/Season</div>
            </div>
            
            <div class="statCard {playoffAppearances > 0 ? 'achievementHighlight' : ''}">
                <div class="statValue">{playoffAppearances}</div>
                <div class="statLabel">Playoff Appearances</div>
            </div>
            
            <div class="statCard {championships > 0 ? 'achievementHighlight' : ''}">
                <div class="statValue">{championships}</div>
                <div class="statLabel">Championships</div>
            </div>
        </div>

        <div class="performanceLevel" style="--performance-color: {performanceLevel.color}">
            <div class="levelBadge" style="background-color: {performanceLevel.color}">
                {performanceLevel.level}
            </div>
            <div class="levelDescription">{performanceLevel.description}</div>
        </div>

        {#if winTrendData.length > 1}
            <div class="trendContainer">
                <div class="chartSection">
                    <div class="chartTitle">Wins by Season</div>
                    <BarChart data={winTrendData} />
                </div>
                
                <div class="chartSection">
                    <div class="chartTitle">Points by Season</div>
                    <BarChart data={pointsTrendData} />
                </div>
            </div>
        {/if}
    {:else}
        <div class="noDataMessage">
            📊 No historical statistics available yet.<br>
            <small>Stats will appear after the manager completes their first season.</small>
        </div>
    {/if}
</div>