<script>
    import { goto } from '$app/navigation';
    import { getTeamNameFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
    import { round } from '$lib/utils/helper';

    export let viewManager, managers, headToHeadRecords, leagueTeamManagers;

    // Debug logging
    $: if (headToHeadRecords !== undefined) {
        console.log('ManagerHeadToHead received data:', { 
            headToHeadRecords, 
            recordCount: headToHeadRecords ? Object.keys(headToHeadRecords).length : 0,
            viewManagerName: viewManager?.name 
        });
    }

    // Process head-to-head records
    $: h2hData = headToHeadRecords ? Object.entries(headToHeadRecords)
        .map(([opponentRosterID, record]) => {
            const opponentManager = managers.find(m => {
                if (m.managerID) {
                    // Find roster ID for this manager
                    for (const year in leagueTeamManagers.teamManagersMap) {
                        for (const rID in leagueTeamManagers.teamManagersMap[year]) {
                            if (leagueTeamManagers.teamManagersMap[year][rID].managers.includes(m.managerID)) {
                                return rID === opponentRosterID;
                            }
                        }
                    }
                }
                return m.roster === parseInt(opponentRosterID);
            });

            return {
                opponentRosterID,
                opponentManager,
                wins: record.wins || 0,
                losses: record.losses || 0,
                ties: record.ties || 0,
                pointsFor: record.pointsFor || 0,
                pointsAgainst: record.pointsAgainst || 0,
                winPercentage: (record.wins || 0) + (record.losses || 0) > 0 
                    ? ((record.wins || 0) / ((record.wins || 0) + (record.losses || 0))) * 100 
                    : 0
            };
        })
        .filter(record => record.opponentManager)
        .sort((a, b) => b.winPercentage - a.winPercentage) : [];

    const navigateToManager = (opponentManager) => {
        const managerIndex = managers.findIndex(m => m === opponentManager);
        if (managerIndex !== -1) {
            goto(`/manager?manager=${managerIndex}`);
        }
    };

    const getRecordClass = (winPercentage) => {
        if (winPercentage >= 70) return 'dominant';
        if (winPercentage >= 60) return 'strong';
        if (winPercentage >= 40) return 'competitive';
        return 'struggling';
    };

    const getRecordEmoji = (winPercentage) => {
        if (winPercentage >= 70) return '🔥';
        if (winPercentage >= 60) return '💪';
        if (winPercentage >= 40) return '⚔️';
        return '📈';
    };
</script>

<style>
    .headToHeadContainer {
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

    .recordsGrid {
        display: grid;
        gap: 1em;
    }

    .recordRow {
        display: grid;
        grid-template-columns: auto 1fr auto auto auto;
        align-items: center;
        gap: 1em;
        padding: 1em;
        background: linear-gradient(135deg, var(--fff) 0%, var(--f8f9fa) 100%);
        border: 1px solid var(--e9ecef);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .recordRow:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        background: linear-gradient(135deg, var(--f8f9fa) 0%, var(--e9ecef) 100%);
    }

    .opponentPhoto {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--ccc);
    }

    .opponentInfo {
        display: flex;
        flex-direction: column;
        gap: 0.3em;
    }

    .opponentName {
        font-weight: 600;
        color: var(--g333);
        font-size: 1em;
    }

    .opponentTeam {
        font-size: 0.8em;
        color: var(--g666);
        font-style: italic;
    }

    .recordStat {
        text-align: center;
        padding: 0.5em;
        border-radius: 6px;
        min-width: 80px;
    }

    .recordLabel {
        font-size: 0.7em;
        color: var(--g666);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.2em;
    }

    .recordValue {
        font-weight: 700;
        font-size: 1.1em;
    }

    .dominant {
        background-color: #e8f5e8;
        border: 1px solid #4caf50;
        color: #2e7d32;
    }

    .strong {
        background-color: #e1f5fe;
        border: 1px solid #03a9f4;
        color: #0277bd;
    }

    .competitive {
        background-color: #fff8e1;
        border: 1px solid #ffc107;
        color: #f57c00;
    }

    .struggling {
        background-color: #ffebee;
        border: 1px solid #f44336;
        color: #d32f2f;
    }

    .recordEmoji {
        font-size: 1.5em;
        margin-left: 0.5em;
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

    .summaryStats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1em;
        margin-bottom: 1.5em;
        padding: 1em;
        background: linear-gradient(135deg, var(--f8f9fa) 0%, var(--e9ecef) 100%);
        border-radius: 8px;
        border: 1px solid var(--dee2e6);
    }

    .summaryCard {
        text-align: center;
    }

    .summaryValue {
        font-size: 1.5em;
        font-weight: 700;
        color: var(--blueOne);
    }

    .summaryLabel {
        font-size: 0.8em;
        color: var(--g555);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        .recordRow {
            grid-template-columns: auto 1fr;
            gap: 0.8em;
        }

        .recordStats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5em;
            margin-top: 0.5em;
        }

        .recordStat {
            min-width: auto;
            padding: 0.3em;
        }

        .recordValue {
            font-size: 0.9em;
        }

        .recordLabel {
            font-size: 0.6em;
        }

        .summaryStats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .opponentPhoto {
            width: 32px;
            height: 32px;
        }

        .summaryStats {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="headToHeadContainer">
    <div class="sectionTitle">Head-to-Head Records</div>
    
    {#if h2hData.length > 0}
        <!-- Summary Statistics -->
        {@const totalWins = h2hData.reduce((sum, record) => sum + record.wins, 0)}
        {@const totalLosses = h2hData.reduce((sum, record) => sum + record.losses, 0)}
        {@const totalTies = h2hData.reduce((sum, record) => sum + record.ties, 0)}
        {@const dominatingCount = h2hData.filter(record => record.winPercentage >= 70).length}
        
        <div class="summaryStats">
            <div class="summaryCard">
                <div class="summaryValue">{totalWins}</div>
                <div class="summaryLabel">Total H2H Wins</div>
            </div>
            <div class="summaryCard">
                <div class="summaryValue">{totalLosses}</div>
                <div class="summaryLabel">Total H2H Losses</div>
            </div>
            <div class="summaryCard">
                <div class="summaryValue">{round(totalWins + totalLosses > 0 ? (totalWins / (totalWins + totalLosses)) * 100 : 0)}%</div>
                <div class="summaryLabel">H2H Win Rate</div>
            </div>
            <div class="summaryCard">
                <div class="summaryValue">{dominatingCount}</div>
                <div class="summaryLabel">Dominated Opponents</div>
            </div>
        </div>

        <div class="recordsGrid">
            {#each h2hData as record}
                <div class="recordRow" on:click={() => navigateToManager(record.opponentManager)}>
                    <img 
                        class="opponentPhoto" 
                        src={record.opponentManager.photo} 
                        alt={record.opponentManager.name}
                    />
                    
                    <div class="opponentInfo">
                        <div class="opponentName">{record.opponentManager.name}</div>
                        <div class="opponentTeam">
                            {getTeamNameFromTeamManagers(leagueTeamManagers, record.opponentRosterID)}
                        </div>
                    </div>
                    
                    <div class="recordStats">
                        <div class="recordStat {getRecordClass(record.winPercentage)}">
                            <div class="recordLabel">Record</div>
                            <div class="recordValue">{record.wins}-{record.losses}{record.ties > 0 ? `-${record.ties}` : ''}</div>
                        </div>
                        
                        <div class="recordStat">
                            <div class="recordLabel">Win %</div>
                            <div class="recordValue">{round(record.winPercentage)}%</div>
                        </div>
                        
                        <div class="recordStat">
                            <div class="recordLabel">Pts Diff</div>
                            <div class="recordValue">+{round(record.pointsFor - record.pointsAgainst)}</div>
                        </div>
                    </div>
                    
                    <div class="recordEmoji">
                        {getRecordEmoji(record.winPercentage)}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="noDataMessage">
            🤝 No head-to-head records available yet.<br>
            <small>Records will appear after completing matchups against other managers.</small>
        </div>
    {/if}
</div>