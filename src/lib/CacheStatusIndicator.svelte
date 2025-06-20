<script>
    import { onMount } from 'svelte';
    import { cacheManager } from '$lib/utils/cacheManager';

    export let showDetails = false;
    
    let cacheHits = 0;
    let cacheMisses = 0;
    let staleHits = 0;
    let isVisible = false;

    // Create a simple performance monitor
    const originalFetch = window.fetch;
    let apiCalls = 0;

    onMount(() => {
        // Monitor API calls
        window.fetch = function(...args) {
            // Only count Sleeper API calls
            if (args[0] && args[0].includes('api.sleeper.app')) {
                apiCalls++;
            }
            return originalFetch.apply(this, args);
        };

        // Override cacheManager methods to track stats
        const originalCachedFetch = cacheManager.cachedFetch;
        cacheManager.cachedFetch = async function(...args) {
            const result = await originalCachedFetch.apply(this, args);
            
            if (result.fromCache) {
                if (result.isStale) {
                    staleHits++;
                } else {
                    cacheHits++;
                }
            } else {
                cacheMisses++;
            }
            
            return result;
        };

        return () => {
            // Restore original fetch
            window.fetch = originalFetch;
        };
    });

    function toggleVisibility() {
        isVisible = !isVisible;
    }

    function resetStats() {
        cacheHits = 0;
        cacheMisses = 0;
        staleHits = 0;
        apiCalls = 0;
    }

    $: totalRequests = cacheHits + cacheMisses + staleHits;
    $: cacheEfficiency = totalRequests > 0 ? ((cacheHits + staleHits) / totalRequests * 100).toFixed(1) : 0;
</script>

{#if showDetails}
    <div class="cache-status" class:visible={isVisible}>
        <div class="cache-toggle" on:click={toggleVisibility}>
            <span class="cache-icon">⚡</span>
            <span class="cache-text">Cache</span>
            <span class="cache-arrow" class:rotated={isVisible}>▼</span>
        </div>

        {#if isVisible}
            <div class="cache-details">
                <div class="cache-stats">
                    <div class="stat">
                        <span class="stat-label">Hits:</span>
                        <span class="stat-value hit">{cacheHits}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="stat-label">Stale:</span>
                        <span class="stat-value stale">{staleHits}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="stat-label">Misses:</span>
                        <span class="stat-value miss">{cacheMisses}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="stat-label">API Calls:</span>
                        <span class="stat-value api">{apiCalls}</span>
                    </div>
                    
                    <div class="stat">
                        <span class="stat-label">Efficiency:</span>
                        <span class="stat-value efficiency">{cacheEfficiency}%</span>
                    </div>
                </div>
                
                <button class="reset-btn" on:click={resetStats}>Reset</button>
            </div>
        {/if}
    </div>
{/if}

<style>
    .cache-status {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.75rem;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 100px;
    }

    .cache-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s;
    }

    .cache-toggle:hover {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
    }

    .cache-icon {
        font-size: 1rem;
    }

    .cache-text {
        font-weight: 500;
    }

    .cache-arrow {
        font-size: 0.625rem;
        transition: transform 0.2s;
        margin-left: auto;
    }

    .cache-arrow.rotated {
        transform: rotate(180deg);
    }

    .cache-details {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.75rem;
    }

    .cache-stats {
        display: grid;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
    }

    .stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stat-label {
        color: rgba(255, 255, 255, 0.8);
    }

    .stat-value {
        font-weight: 600;
        font-variant-numeric: tabular-nums;
    }

    .stat-value.hit {
        color: #4ade80; /* green */
    }

    .stat-value.stale {
        color: #fbbf24; /* yellow */
    }

    .stat-value.miss {
        color: #f87171; /* red */
    }

    .stat-value.api {
        color: #60a5fa; /* blue */
    }

    .stat-value.efficiency {
        color: #a78bfa; /* purple */
    }

    .reset-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.2s;
    }

    .reset-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
        .cache-status {
            top: 10px;
            right: 10px;
            font-size: 0.6875rem;
        }
        
        .cache-toggle {
            padding: 0.375rem 0.5rem;
        }
        
        .cache-details {
            padding: 0.5rem;
        }
    }
</style>
