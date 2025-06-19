<script>
    export let records, awards, rosterID, viewManager;

    $: debugInfo = {
        hasRecords: !!records,
        recordsKeys: records ? Object.keys(records) : null,
        hasRegularSeasonData: !!(records?.regularSeasonData),
        hasLeagueManagerRecords: !!(records?.regularSeasonData?.leagueManagerRecords),
        leagueManagerRecordsKeys: records?.regularSeasonData?.leagueManagerRecords ? Object.keys(records.regularSeasonData.leagueManagerRecords) : null,
        hasLeagueRosterRecords: !!(records?.regularSeasonData?.leagueRosterRecords),
        leagueRosterRecordsKeys: records?.regularSeasonData?.leagueRosterRecords ? Object.keys(records.regularSeasonData.leagueRosterRecords) : null,
        rosterSeasonData: records?.regularSeasonData?.leagueRosterRecords?.[rosterID]?.years || [],
        rosterID: rosterID,
        rosterIDType: typeof rosterID,
        hasAwards: !!awards,
        awardsLength: awards ? awards.length : 0,
        awardsYears: awards ? awards.map(a => a.year) : [],
        managerName: viewManager?.name
    };

    $: console.log('DEBUG INFO:', debugInfo);
</script>

<style>
    .debug {
        background: #f0f0f0;
        border: 1px solid #ccc;
        padding: 1em;
        margin: 1em 0;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.8em;
    }
    
    .debug-title {
        font-weight: bold;
        margin-bottom: 0.5em;
        color: #333;
    }
    
    .debug-item {
        margin: 0.2em 0;
        padding: 0.2em 0;
        border-bottom: 1px dotted #ccc;
    }
    
    .debug-key {
        font-weight: bold;
        color: #666;
    }
    
    .debug-value {
        color: #333;
    }
</style>

<div class="debug">
    <div class="debug-title">🐛 DEBUG: Manager Data</div>
    
    <div class="debug-item">
        <span class="debug-key">Manager:</span>
        <span class="debug-value">{viewManager?.name || 'Unknown'}</span>
    </div>
    
    <div class="debug-item">
        <span class="debug-key">Roster ID:</span>
        <span class="debug-value">{rosterID} (type: {typeof rosterID})</span>
    </div>
    
    <div class="debug-item">
        <span class="debug-key">Has Records:</span>
        <span class="debug-value">{debugInfo.hasRecords ? '✅' : '❌'}</span>
    </div>
    
    {#if debugInfo.hasRecords}
        <div class="debug-item">
            <span class="debug-key">Records Keys:</span>
            <span class="debug-value">{debugInfo.recordsKeys?.join(', ')}</span>
        </div>
        
        <div class="debug-item">
            <span class="debug-key">Has Regular Season Data:</span>
            <span class="debug-value">{debugInfo.hasRegularSeasonData ? '✅' : '❌'}</span>
        </div>
        
        <div class="debug-item">
            <span class="debug-key">Has League Manager Records:</span>
            <span class="debug-value">{debugInfo.hasLeagueManagerRecords ? '✅' : '❌'}</span>
        </div>
        
        {#if debugInfo.hasLeagueManagerRecords}
            <div class="debug-item">
                <span class="debug-key">Available Roster IDs:</span>
                <span class="debug-value">{debugInfo.leagueManagerRecordsKeys?.join(', ')}</span>
            </div>
        {/if}
    {/if}
    
    <div class="debug-item">
        <span class="debug-key">Has Awards:</span>
        <span class="debug-value">{debugInfo.hasAwards ? '✅' : '❌'} ({debugInfo.awardsLength} items)</span>
    </div>
</div>