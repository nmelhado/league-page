<script>
    import { onMount } from 'svelte';
    import { cacheManager } from '$lib/utils/cacheManager';
    import { browser } from '$app/environment';

    let cacheStats = {
        totalEntries: 0,
        expiredEntries: 0,
        totalSize: 0,
        formattedSize: '0 Bytes'
    };

    let showDetails = false;
    let cacheEntries = [];

    function refreshStats() {
        if (browser) {
            cacheStats = cacheManager.getStats();
            loadCacheEntries();
        }
    }

    function loadCacheEntries() {
        if (!browser) return;
        
        const entries = [];
        const now = Math.round(new Date().getTime() / 1000);
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('trl_cache_') && key.endsWith('_data')) {
                const baseKey = key.replace('_data', '');
                const expirationKey = baseKey + '_expiration';
                const expiration = parseInt(localStorage.getItem(expirationKey));
                const value = localStorage.getItem(key);
                
                entries.push({
                    key: baseKey.replace('trl_cache_', ''),
                    size: key.length + (value ? value.length : 0),
                    expiration,
                    isExpired: expiration ? now > expiration : true,
                    timeToExpiry: expiration ? Math.max(0, expiration - now) : 0
                });
            }
        }
        
        cacheEntries = entries.sort((a, b) => b.expiration - a.expiration);
    }

    function clearAllCache() {
        if (confirm('Are you sure you want to clear all cached data? This will force fresh API calls.')) {
            cacheManager.clearAll();
            refreshStats();
        }
    }

    function cleanupExpired() {
        cacheManager.cleanup();
        refreshStats();
    }

    function formatTime(seconds) {
        if (seconds <= 0) return 'Expired';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }

    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    onMount(() => {
        refreshStats();
        // Refresh stats every 30 seconds
        const interval = setInterval(refreshStats, 30000);
        return () => clearInterval(interval);
    });
</script>

<div class="cache-manager">
    <div class="cache-header">
        <h3>Cache Manager</h3>
        <button class="refresh-btn" on:click={refreshStats}>
            🔄 Refresh
        </button>
    </div>

    <div class="cache-stats">
        <div class="stat-card">
            <div class="stat-label">Total Entries</div>
            <div class="stat-value">{cacheStats.totalEntries}</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Expired Entries</div>
            <div class="stat-value expired">{cacheStats.expiredEntries}</div>
        </div>
        
        <div class="stat-card">
            <div class="stat-label">Total Size</div>
            <div class="stat-value">{cacheStats.formattedSize}</div>
        </div>
    </div>

    <div class="cache-actions">
        <button class="action-btn cleanup" on:click={cleanupExpired}>
            🧹 Cleanup Expired
        </button>
        
        <button class="action-btn details" on:click={() => showDetails = !showDetails}>
            {showDetails ? '📋 Hide Details' : '📋 Show Details'}
        </button>
        
        <button class="action-btn clear" on:click={clearAllCache}>
            🗑️ Clear All Cache
        </button>
    </div>

    {#if showDetails}
        <div class="cache-details">
            <h4>Cache Entries</h4>
            
            {#if cacheEntries.length === 0}
                <p class="no-entries">No cache entries found</p>
            {:else}
                <div class="entries-list">
                    {#each cacheEntries as entry}
                        <div class="entry-row" class:expired={entry.isExpired}>
                            <div class="entry-key">{entry.key}</div>
                            <div class="entry-info">
                                <span class="entry-size">{formatBytes(entry.size)}</span>
                                <span class="entry-expiry" class:expired={entry.isExpired}>
                                    {formatTime(entry.timeToExpiry)}
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .cache-manager {
        background: var(--background-color, #f8f9fa);
        border: 1px solid var(--border-color, #dee2e6);
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .cache-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .cache-header h3 {
        margin: 0;
        color: var(--text-color, #333);
    }

    .refresh-btn {
        background: var(--primary-color, #007bff);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 0.875rem;
    }

    .refresh-btn:hover {
        background: var(--primary-hover-color, #0056b3);
    }

    .cache-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .stat-card {
        background: white;
        border: 1px solid var(--border-color, #dee2e6);
        border-radius: 6px;
        padding: 1rem;
        text-align: center;
    }

    .stat-label {
        font-size: 0.875rem;
        color: var(--text-muted, #6c757d);
        margin-bottom: 0.25rem;
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-color, #333);
    }

    .stat-value.expired {
        color: var(--danger-color, #dc3545);
    }

    .cache-actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }

    .action-btn {
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: background-color 0.2s;
    }

    .action-btn.cleanup {
        background: var(--warning-color, #ffc107);
        color: var(--dark-color, #212529);
    }

    .action-btn.cleanup:hover {
        background: #e0a800;
    }

    .action-btn.details {
        background: var(--info-color, #17a2b8);
        color: white;
    }

    .action-btn.details:hover {
        background: #138496;
    }

    .action-btn.clear {
        background: var(--danger-color, #dc3545);
        color: white;
    }

    .action-btn.clear:hover {
        background: #c82333;
    }

    .cache-details {
        border-top: 1px solid var(--border-color, #dee2e6);
        padding-top: 1rem;
    }

    .cache-details h4 {
        margin: 0 0 1rem 0;
        color: var(--text-color, #333);
    }

    .no-entries {
        text-align: center;
        color: var(--text-muted, #6c757d);
        font-style: italic;
        margin: 2rem 0;
    }

    .entries-list {
        max-height: 300px;
        overflow-y: auto;
    }

    .entry-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        border-bottom: 1px solid var(--border-light, #f1f3f4);
        background: white;
        margin-bottom: 0.25rem;
        border-radius: 4px;
    }

    .entry-row.expired {
        background: #ffeaea;
        border-left: 3px solid var(--danger-color, #dc3545);
    }

    .entry-key {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.875rem;
        color: var(--text-color, #333);
        word-break: break-all;
        flex: 1;
    }

    .entry-info {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .entry-size {
        font-size: 0.75rem;
        color: var(--text-muted, #6c757d);
        background: var(--light-color, #f8f9fa);
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
    }

    .entry-expiry {
        font-size: 0.75rem;
        color: var(--success-color, #28a745);
        font-weight: 500;
    }

    .entry-expiry.expired {
        color: var(--danger-color, #dc3545);
    }

    @media (max-width: 768px) {
        .cache-stats {
            grid-template-columns: 1fr;
        }
        
        .cache-actions {
            flex-direction: column;
        }
        
        .entry-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .entry-info {
            justify-content: space-between;
            width: 100%;
        }
    }
</style>
