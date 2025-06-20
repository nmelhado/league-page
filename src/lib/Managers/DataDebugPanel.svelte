<script>
    export let managerStats, records, rosterID, viewManager;
    
    $: console.log('Debug Component Data:', {
        managerStats,
        seasons: managerStats?.seasons,
        seasonsLength: managerStats?.seasons?.length,
        records: records ? 'Present' : 'Missing',
        recordsStructure: records ? Object.keys(records) : null,
        rosterID,
        managerID: viewManager?.managerID
    });
</script>

<style>
    .debug-panel {
        background: #f0f8f4;
        border: 2px solid #1B7D3E;
        border-radius: 8px;
        padding: 1em;
        margin: 1em 0;
        font-family: monospace;
        font-size: 0.9em;
    }
    
    .debug-title {
        font-weight: bold;
        color: #1B7D3E;
        margin-bottom: 0.5em;
    }
    
    .debug-item {
        margin: 0.3em 0;
    }
    
    .debug-value {
        color: #333;
    }
    
    .missing {
        color: #d32f2f;
        font-weight: bold;
    }
    
    .present {
        color: #1B7D3E;
        font-weight: bold;
    }
</style>

<div class="debug-panel">
    <div class="debug-title">🔍 Manager Stats Debug Info</div>
    
    <div class="debug-item">
        <strong>Manager ID:</strong> 
        <span class="debug-value">{viewManager?.managerID || 'Not found'}</span>
    </div>
    
    <div class="debug-item">
        <strong>Roster ID:</strong> 
        <span class="debug-value">{rosterID || 'Not found'}</span>
    </div>
    
    <div class="debug-item">
        <strong>Records Data:</strong> 
        <span class="debug-value {records ? 'present' : 'missing'}">
            {records ? 'Available' : 'Missing'}
        </span>
    </div>
    
    {#if records}
        <div class="debug-item">
            <strong>Records Structure:</strong> 
            <span class="debug-value">{Object.keys(records).join(', ')}</span>
        </div>
        
        {#if records.regularSeasonData}
            <div class="debug-item">
                <strong>Regular Season Data:</strong> 
                <span class="debug-value present">Available</span>
            </div>
            
            {#if records.regularSeasonData.leagueManagerRecords}
                <div class="debug-item">
                    <strong>Manager Records:</strong> 
                    <span class="debug-value present">
                        {Object.keys(records.regularSeasonData.leagueManagerRecords).length} managers
                    </span>
                </div>
                
                <div class="debug-item">
                    <strong>Available Manager IDs:</strong> 
                    <span class="debug-value">
                        {Object.keys(records.regularSeasonData.leagueManagerRecords).join(', ')}
                    </span>
                </div>
            {:else}
                <div class="debug-item">
                    <strong>Manager Records:</strong> 
                    <span class="debug-value missing">Missing</span>
                </div>
            {/if}
        {:else}
            <div class="debug-item">
                <strong>Regular Season Data:</strong> 
                <span class="debug-value missing">Missing</span>
            </div>
        {/if}
    {/if}
    
    <div class="debug-item">
        <strong>Manager Stats Seasons:</strong> 
        <span class="debug-value {managerStats?.seasons?.length > 0 ? 'present' : 'missing'}">
            {managerStats?.seasons?.length || 0} seasons found
        </span>
    </div>
    
    {#if managerStats?.seasons?.length > 0}
        <div class="debug-item">
            <strong>Sample Season Data:</strong>
            <div style="margin-left: 1em; margin-top: 0.5em;">
                {#each managerStats.seasons.slice(0, 2) as season}
                    <div>Year {season.year}: {season.wins}W-{season.losses}L, {Math.round(season.fpts)} pts</div>
                {/each}
            </div>
        </div>
    {/if}
    
    <div class="debug-item" style="margin-top: 1em; padding-top: 0.5em; border-top: 1px solid #ccc;">
        <small><strong>Note:</strong> Check browser console for detailed logs. Advanced charts will show when seasons data is available.</small>
    </div>
</div>