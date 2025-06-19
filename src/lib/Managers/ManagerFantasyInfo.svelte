<script>
    export let viewManager, players, changeManager;

    // Enhanced manager analysis
    $: managerProfile = (() => {
        const profile = {
            playstyle: 'Balanced',
            description: 'A well-rounded fantasy manager',
            riskLevel: 'Moderate',
            strengths: [],
            personality: 'Steady'
        };

        // Analyze trading tendencies
        if (viewManager.tradingScale >= 8) {
            profile.playstyle = 'Aggressive Trader';
            profile.description = 'Loves making deals and roster moves';
            profile.personality = 'Deal Maker';
            profile.strengths.push('Active in trade negotiations');
        } else if (viewManager.tradingScale <= 3) {
            profile.playstyle = 'Set and Forget';
            profile.description = 'Prefers stable roster construction';
            profile.personality = 'Steady Hand';
            profile.strengths.push('Patient roster management');
        }

        // Analyze rebuild vs win-now mentality
        if (viewManager.mode === 'Win Now') {
            profile.riskLevel = 'High';
            profile.strengths.push('Focused on immediate success');
        } else if (viewManager.mode === 'Rebuild') {
            profile.riskLevel = 'Low';
            profile.strengths.push('Building for future dominance');
        }

        // Analyze rookie vs vet preference
        if (viewManager.rookieOrVets === 'Rookies') {
            profile.strengths.push('Eye for young talent');
        } else if (viewManager.rookieOrVets === 'Vets') {
            profile.strengths.push('Values proven production');
        }

        return profile;
    })();

    const getTradingPersonality = (scale) => {
        if (scale >= 9) return { label: 'Trade Addict', emoji: '🔥', color: '#e74c3c' };
        if (scale >= 7) return { label: 'Deal Seeker', emoji: '💼', color: '#f39c12' };
        if (scale >= 5) return { label: 'Opportunist', emoji: '🎯', color: '#3498db' };
        if (scale >= 3) return { label: 'Selective', emoji: '🤔', color: '#9b59b6' };
        return { label: 'Hands Off', emoji: '🏛️', color: '#95a5a6' };
    };

    $: tradingPersonality = viewManager.tradingScale ? getTradingPersonality(viewManager.tradingScale) : null;
</script>

<style>
    .fantasyInfoContainer {
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

    .profileSummary {
        background: linear-gradient(135deg, var(--f8f9fa) 0%, var(--e9ecef) 100%);
        border-radius: 8px;
        padding: 1.2em;
        margin-bottom: 2em;
        border-left: 4px solid var(--blueOne);
    }

    .profileHeader {
        display: flex;
        align-items: center;
        gap: 1em;
        margin-bottom: 0.8em;
    }

    .playstyleBadge {
        background: var(--blueOne);
        color: white;
        padding: 0.4em 0.8em;
        border-radius: 15px;
        font-size: 0.8em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .profileDescription {
        color: var(--g666);
        font-style: italic;
        margin-bottom: 0.8em;
    }

    .strengthsList {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    .strengthTag {
        background-color: rgba(52, 152, 219, 0.1);
        color: var(--blueOne);
        padding: 0.3em 0.6em;
        border-radius: 12px;
        font-size: 0.8em;
        border: 1px solid rgba(52, 152, 219, 0.2);
    }

    .fantasyInfos {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1.5em;
        margin-top: 1.5em;
    }

    .infoSlot {
        text-align: center;
        background: linear-gradient(135deg, var(--fff) 0%, var(--f8f9fa) 100%);
        border: 1px solid var(--e9ecef);
        border-radius: 10px;
        padding: 1.2em;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
    }

    .infoSlot:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    .infoSlot.clickable {
        cursor: pointer;
    }

    .infoSlot.clickable:hover {
        background: linear-gradient(135deg, var(--f8f9fa) 0%, var(--e9ecef) 100%);
    }

    .infoIcon {
        display: inline-flex;
        height: 70px;
        width: 70px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 2px solid var(--dee2e6);
        overflow: hidden;
        background-color: var(--fff);
        margin: 0 auto 1em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }

    .infoSlot:hover .infoIcon {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .playerIcon {
        align-items: flex-end;
    }

    .infoLabel {
        font-size: 0.8em;
        color: var(--blueOne);
        font-weight: 600;
        margin-bottom: 1em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2em;
    }

    .infoAnswer {
        font-size: 0.9em;
        color: var(--g555);
        margin-top: 1em;
        font-weight: 500;
        line-height: 1.2em;
    }

    .tradingScale {
        line-height: 70px;
        font-size: 2.2em;
        font-weight: 700;
        color: var(--blueOne);
    }

    .tradingPersonality {
        font-size: 0.7em;
        padding: 0.3em 0.6em;
        border-radius: 10px;
        margin-top: 0.5em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .rookiesOrVets {
        height: 60px;
        width: 60px;
        object-fit: contain;
    }

    .rival {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .rebuildOrWin {
        height: 60px;
        width: 60px;
        object-fit: contain;
    }

    .valuePosition {
        line-height: 70px;
        font-size: 1.8em;
        font-weight: 700;
        color: var(--fff);
        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .QB {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    .WR {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }

    .RB {
        background: linear-gradient(135deg, #27ae60, #229954);
    }

    .TE {
        background: linear-gradient(135deg, #f39c12, #e67e22);
    }

    .Picks {
        background: linear-gradient(135deg, #73b647, #5a9236);
    }

    .K {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
    }

    .DEF {
        background: linear-gradient(135deg, #34495e, #2c3e50);
    }

    .favoritePlayer {
        height: 65px;
        width: 65px;
        object-fit: cover;
        border-radius: 50%;
    }

    .positionBadge {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        background: var(--blueOne);
        color: white;
        padding: 0.2em 0.4em;
        border-radius: 8px;
        font-size: 0.6em;
        font-weight: 600;
    }

    .noDataSlot {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 120px;
        color: var(--g666);
        font-style: italic;
        background: linear-gradient(135deg, var(--f8f9fa) 0%, var(--e9ecef) 100%);
        border: 1px dashed var(--dee2e6);
    }

    .noDataIcon {
        font-size: 2em;
        margin-bottom: 0.5em;
        opacity: 0.5;
    }

    /* Media queries */
    @media (max-width: 768px) {
        .fantasyInfos {
            grid-template-columns: repeat(2, 1fr);
            gap: 1em;
        }

        .profileHeader {
            flex-direction: column;
            align-items: flex-start;
        }

        .strengthsList {
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .fantasyInfos {
            grid-template-columns: 1fr;
        }

        .infoSlot {
            padding: 1em;
        }

        .infoIcon {
            height: 60px;
            width: 60px;
        }

        .tradingScale {
            font-size: 1.8em;
        }

        .valuePosition {
            font-size: 1.4em;
        }
    }
</style>

<div class="fantasyInfoContainer">
    <div class="sectionTitle">Fantasy Football Profile</div>

    <!-- Manager Profile Summary -->
    <div class="profileSummary">
        <div class="profileHeader">
            <div class="playstyleBadge">{managerProfile.playstyle}</div>
            {#if tradingPersonality}
                <div class="tradingPersonality" style="background-color: {tradingPersonality.color}20; color: {tradingPersonality.color};">
                    {tradingPersonality.emoji} {tradingPersonality.label}
                </div>
            {/if}
        </div>
        <div class="profileDescription">{managerProfile.description}</div>
        {#if managerProfile.strengths.length > 0}
            <div class="strengthsList">
                {#each managerProfile.strengths as strength}
                    <span class="strengthTag">{strength}</span>
                {/each}
            </div>
        {/if}
    </div>

    <div class="fantasyInfos">
        <!-- Trading Scale -->
        {#if viewManager.tradingScale}
            <div class="infoSlot">
                <div class="infoLabel">Trading Activity</div>
                <div class="infoIcon">
                    <span class="tradingScale">{viewManager.tradingScale}</span>
                </div>
                <div class="infoAnswer">{viewManager.tradingScale}/10 Scale</div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">📊</div>
                <div>Trading preference not set</div>
            </div>
        {/if}

        <!-- Favorite Position -->
        {#if viewManager.valuePosition}
            <div class="infoSlot">
                <div class="infoLabel">Favorite Position</div>
                <div class="infoIcon {viewManager.valuePosition}">
                    <span class="valuePosition">{viewManager.valuePosition}</span>
                </div>
                <div class="infoAnswer">Most Valued Asset</div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">🏈</div>
                <div>Position preference not set</div>
            </div>
        {/if}

        <!-- Rookie or Vet Preference -->
        {#if viewManager.rookieOrVets}
            <div class="infoSlot">
                <div class="infoLabel">Player Preference</div>
                <div class="infoIcon">
                    <img class="rookiesOrVets" src="/{viewManager.rookieOrVets}.png" alt="rookie or vet preference"/>
                </div>
                <div class="infoAnswer">{viewManager.rookieOrVets}</div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">👶</div>
                <div>Age preference not set</div>
            </div>
        {/if}

        <!-- Favorite Player -->
        {#if viewManager.favoritePlayer && players[viewManager.favoritePlayer]}
            <div class="infoSlot">
                <div class="infoLabel">Favorite Player</div>
                <div class="infoIcon playerIcon">
                    <img class="favoritePlayer" src="https://sleepercdn.com/content/nfl/players/{viewManager.favoritePlayer}.jpg" alt="favorite player"/>
                    <div class="positionBadge">{players[viewManager.favoritePlayer].pos || 'NFL'}</div>
                </div>
                <div class="infoAnswer">
                    {players[viewManager.favoritePlayer].fn} {players[viewManager.favoritePlayer].ln}
                </div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">⭐</div>
                <div>Favorite player not set</div>
            </div>
        {/if}

        <!-- Strategy Mode -->
        {#if viewManager.mode}
            <div class="infoSlot">
                <div class="infoLabel">Strategy Mode</div>
                <div class="infoIcon">
                    <img class="rebuildOrWin" src="/{viewManager.mode.replace(' ', '%20')}.png" alt="win now or rebuild"/>
                </div>
                <div class="infoAnswer">{viewManager.mode}</div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">🎯</div>
                <div>Strategy not set</div>
            </div>
        {/if}

        <!-- Rival -->
        {#if viewManager.rival}
            <div class="infoSlot clickable" on:click={() => changeManager(viewManager.rival.link)}>
                <div class="infoLabel">Primary Rival</div>
                <div class="infoIcon">
                    <img class="rival" src="{viewManager.rival.image}" alt="rival"/>
                </div>
                <div class="infoAnswer">{viewManager.rival.name}</div>
            </div>
        {:else}
            <div class="infoSlot noDataSlot">
                <div class="noDataIcon">⚔️</div>
                <div>No rival designated</div>
            </div>
        {/if}
    </div>
</div>