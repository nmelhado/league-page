/**
 * Enhanced Cache Integration Utilities
 * Provides developers with easy-to-use patterns for implementing caching throughout the app
 */

import { cacheManager, CACHE_DURATIONS } from './cacheManager';
import { get } from 'svelte/store';

/**
 * Higher-order function that adds caching to any API fetch function
 * @param {Function} fetchFunction - Original fetch function
 * @param {string} cacheKey - Base cache key
 * @param {number} duration - Cache duration in minutes
 * @param {Function} storeUpdater - Optional store updater function
 */
export function withCache(fetchFunction, cacheKey, duration = CACHE_DURATIONS.LEAGUE_DATA, storeUpdater = null) {
    return async function(...args) {
        const params = args.length > 0 ? { args: JSON.stringify(args) } : {};
        
        try {
            const result = await cacheManager.cachedFetch(
                null, // URL will be determined by the fetch function
                storeUpdater,
                duration,
                cacheKey,
                params
            );

            // If we got cached data, return it
            if (result.fromCache) {
                return result;
            }

            // Otherwise, call the original function
            const freshData = await fetchFunction.apply(this, args);
            
            // Cache the fresh data
            cacheManager.set(cacheKey, freshData, params, duration);
            
            // Update store if provided
            if (storeUpdater) {
                storeUpdater(freshData);
            }

            return {
                data: freshData,
                fromCache: false,
                isStale: false
            };
            
        } catch (error) {
            // Try to get stale data on error
            const cached = cacheManager.get(cacheKey, params, duration);
            if (cached && cached.data) {
                if (storeUpdater) {
                    storeUpdater(cached.data);
                }
                return {
                    data: cached.data,
                    fromCache: true,
                    isStale: true,
                    error: error.message
                };
            }
            throw error;
        }
    };
}

/**
 * Svelte store-aware cache wrapper
 * Automatically handles store updates and prevents unnecessary API calls
 * @param {Object} store - Svelte store
 * @param {string} storeKey - Key within the store
 * @param {Function} fetchFunction - Function to fetch fresh data
 * @param {string} cacheKey - Cache key
 * @param {number} duration - Cache duration
 */
export function createCachedStoreLoader(store, storeKey, fetchFunction, cacheKey, duration = CACHE_DURATIONS.LEAGUE_DATA) {
    return async function(forceRefresh = false) {
        // Check store first (unless forcing refresh)
        if (!forceRefresh) {
            const storeData = get(store)[storeKey];
            if (storeData) {
                return {
                    data: storeData,
                    fromCache: false,
                    isStale: false,
                    fromStore: true
                };
            }
        }

        // Clear cache if forcing refresh
        if (forceRefresh) {
            cacheManager.remove(cacheKey);
        }

        // Use cached fetch with store update
        return await cacheManager.cachedFetch(
            null, // URL determined by fetchFunction
            (data) => {
                store.update(currentStore => {
                    currentStore[storeKey] = data;
                    return currentStore;
                });
            },
            duration,
            cacheKey
        );
    };
}

/**
 * Batch cache operations for multiple related API calls
 * @param {Array} operations - Array of cache operations
 */
export async function batchCacheOperations(operations) {
    const results = await Promise.allSettled(
        operations.map(op => {
            const { url, storeUpdater, duration, cacheKey, params } = op;
            return cacheManager.cachedFetch(url, storeUpdater, duration, cacheKey, params);
        })
    );

    return results.map((result, index) => ({
        operation: operations[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
    }));
}

/**
 * Smart cache warming - preload frequently used data
 * @param {Array} warmupTargets - Array of cache targets to warm up
 */
export async function warmupCache(warmupTargets) {
    console.log('🔥 Starting cache warmup...');
    
    const warmupPromises = warmupTargets.map(async target => {
        try {
            await cacheManager.cachedFetch(
                target.url,
                target.storeUpdater || null,
                target.duration || CACHE_DURATIONS.LEAGUE_DATA,
                target.cacheKey,
                target.params || {}
            );
            console.log(`✅ Warmed up: ${target.cacheKey}`);
        } catch (error) {
            console.warn(`❌ Failed to warm up ${target.cacheKey}:`, error);
        }
    });

    await Promise.allSettled(warmupPromises);
    console.log('🔥 Cache warmup complete');
}

/**
 * Cache performance monitor
 * Tracks cache hit rates and provides performance insights
 */
export class CachePerformanceMonitor {
    constructor() {
        this.stats = {
            hits: 0,
            misses: 0,
            staleHits: 0,
            errors: 0,
            totalRequests: 0
        };
        this.startTime = Date.now();
    }

    recordHit() {
        this.stats.hits++;
        this.stats.totalRequests++;
    }

    recordMiss() {
        this.stats.misses++;
        this.stats.totalRequests++;
    }

    recordStaleHit() {
        this.stats.staleHits++;
        this.stats.totalRequests++;
    }

    recordError() {
        this.stats.errors++;
        this.stats.totalRequests++;
    }

    getStats() {
        const totalRequests = this.stats.totalRequests;
        const hitRate = totalRequests > 0 ? ((this.stats.hits + this.stats.staleHits) / totalRequests * 100).toFixed(2) : 0;
        const runTime = Math.round((Date.now() - this.startTime) / 1000);

        return {
            ...this.stats,
            hitRate: `${hitRate}%`,
            runTime: `${runTime}s`,
            requestsPerSecond: totalRequests > 0 ? (totalRequests / runTime).toFixed(2) : 0
        };
    }

    reset() {
        this.stats = {
            hits: 0,
            misses: 0,
            staleHits: 0,
            errors: 0,
            totalRequests: 0
        };
        this.startTime = Date.now();
    }
}

// Export singleton performance monitor
export const performanceMonitor = new CachePerformanceMonitor();

/**
 * Cache strategies for different types of data
 */
export const CACHE_STRATEGIES = {
    // Aggressive caching for static data
    AGGRESSIVE: {
        duration: CACHE_DURATIONS.PLAYERS,
        staleWhileRevalidate: true,
        backgroundRefresh: true
    },
    
    // Moderate caching for semi-static data
    MODERATE: {
        duration: CACHE_DURATIONS.LEAGUE_DATA,
        staleWhileRevalidate: true,
        backgroundRefresh: false
    },
    
    // Conservative caching for dynamic data
    CONSERVATIVE: {
        duration: CACHE_DURATIONS.MATCHUPS,
        staleWhileRevalidate: false,
        backgroundRefresh: false
    },
    
    // Real-time data (minimal caching)
    REALTIME: {
        duration: CACHE_DURATIONS.NEWS,
        staleWhileRevalidate: false,
        backgroundRefresh: false
    }
};

/**
 * Apply cache strategy to a fetch operation
 * @param {string} strategy - Strategy name from CACHE_STRATEGIES
 * @param {Object} options - Fetch options
 */
export function applyCacheStrategy(strategy, options) {
    const strategyConfig = CACHE_STRATEGIES[strategy];
    if (!strategyConfig) {
        console.warn(`Unknown cache strategy: ${strategy}`);
        return options;
    }

    return {
        ...options,
        duration: strategyConfig.duration,
        staleWhileRevalidate: strategyConfig.staleWhileRevalidate,
        backgroundRefresh: strategyConfig.backgroundRefresh
    };
}
