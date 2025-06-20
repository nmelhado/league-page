import { browser } from '$app/environment';

/**
 * Centralized cache manager for Sleeper API responses
 * Provides localStorage-based caching with expiration and stale data handling
 */

class CacheManager {
    constructor() {
        this.defaultExpirationMinutes = 60; // 1 hour default
        this.keyPrefix = 'trl_cache_';
    }

    /**
     * Generate cache key for a given API endpoint and parameters
     */
    generateKey(endpoint, params = {}) {
        const sortedParams = Object.keys(params).sort().reduce((sorted, key) => {
            sorted[key] = params[key];
            return sorted;
        }, {});
        
        const paramString = Object.keys(sortedParams).length > 0 
            ? '_' + JSON.stringify(sortedParams).replace(/[{}":\s,]/g, '')
            : '';
        
        return `${this.keyPrefix}${endpoint}${paramString}`;
    }

    /**
     * Get cached data if available and not expired
     */
    get(endpoint, params = {}, expirationMinutes = this.defaultExpirationMinutes) {
        if (!browser) return null;

        const key = this.generateKey(endpoint, params);
        const dataKey = `${key}_data`;
        const expirationKey = `${key}_expiration`;

        try {
            const cachedData = localStorage.getItem(dataKey);
            const expiration = parseInt(localStorage.getItem(expirationKey));
            
            if (!cachedData || !expiration) {
                return null;
            }

            const now = Math.round(new Date().getTime() / 1000);
            const isExpired = now > expiration;

            return {
                data: JSON.parse(cachedData),
                isExpired,
                isStale: isExpired
            };
        } catch (error) {
            console.warn('Cache read error:', error);
            this.remove(endpoint, params);
            return null;
        }
    }

    /**
     * Set data in cache with expiration
     */
    set(endpoint, data, params = {}, expirationMinutes = this.defaultExpirationMinutes) {
        if (!browser) return;

        const key = this.generateKey(endpoint, params);
        const dataKey = `${key}_data`;
        const expirationKey = `${key}_expiration`;

        try {
            const now = Math.round(new Date().getTime() / 1000);
            const expiration = now + (expirationMinutes * 60);

            localStorage.setItem(dataKey, JSON.stringify(data));
            localStorage.setItem(expirationKey, expiration.toString());
        } catch (error) {
            console.warn('Cache write error:', error);
            // If localStorage is full, try to clear some space
            this.cleanup();
            try {
                localStorage.setItem(dataKey, JSON.stringify(data));
                localStorage.setItem(expirationKey, expiration.toString());
            } catch (secondError) {
                console.error('Failed to cache data even after cleanup:', secondError);
            }
        }
    }

    /**
     * Remove specific cache entry
     */
    remove(endpoint, params = {}) {
        if (!browser) return;

        const key = this.generateKey(endpoint, params);
        const dataKey = `${key}_data`;
        const expirationKey = `${key}_expiration`;

        localStorage.removeItem(dataKey);
        localStorage.removeItem(expirationKey);
    }

    /**
     * Clean up expired cache entries
     */
    cleanup() {
        if (!browser) return;

        const now = Math.round(new Date().getTime() / 1000);
        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.keyPrefix) && key.endsWith('_expiration')) {
                const expiration = parseInt(localStorage.getItem(key));
                if (expiration && now > expiration) {
                    const baseKey = key.replace('_expiration', '');
                    keysToRemove.push(baseKey + '_data');
                    keysToRemove.push(key);
                }
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Clear all TRL cache entries
     */
    clearAll() {
        if (!browser) return;

        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.keyPrefix)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Get cache statistics
     */
    getStats() {
        if (!browser) return { totalEntries: 0, expiredEntries: 0, totalSize: 0 };

        const now = Math.round(new Date().getTime() / 1000);
        let totalEntries = 0;
        let expiredEntries = 0;
        let totalSize = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.keyPrefix)) {
                const value = localStorage.getItem(key);
                totalSize += key.length + (value ? value.length : 0);
                
                if (key.endsWith('_data')) {
                    totalEntries++;
                    const expirationKey = key.replace('_data', '_expiration');
                    const expiration = parseInt(localStorage.getItem(expirationKey));
                    if (expiration && now > expiration) {
                        expiredEntries++;
                    }
                }
            }
        }

        return {
            totalEntries,
            expiredEntries,
            totalSize,
            formattedSize: this.formatBytes(totalSize)
        };
    }

    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Generic cached fetch function
     */
    async cachedFetch(
        url, 
        storeUpdater = null, 
        expirationMinutes = this.defaultExpirationMinutes,
        endpoint = null,
        params = {}
    ) {
        // Generate endpoint name from URL if not provided
        if (!endpoint) {
            const urlObj = new URL(url, 'https://api.sleeper.app');
            endpoint = urlObj.pathname.replace('/v1/', '').replace(/\//g, '_');
        }

        // Check cache first
        const cached = this.get(endpoint, params, expirationMinutes);
        if (cached && !cached.isExpired) {
            // Update store if provided
            if (storeUpdater) {
                storeUpdater(cached.data);
            }
            return {
                data: cached.data,
                fromCache: true,
                isStale: false
            };
        }

        // If we have stale data, return it but mark as stale
        if (cached && cached.isStale) {
            if (storeUpdater) {
                storeUpdater(cached.data);
            }
            
            // Fetch fresh data in background (fire and forget)
            this.backgroundRefresh(url, endpoint, params, storeUpdater, expirationMinutes);
            
            return {
                data: cached.data,
                fromCache: true,
                isStale: true
            };
        }

        // Fetch fresh data
        try {
            const res = await fetch(url, { compress: true });
            const data = await res.json();

            if (res.ok) {
                // Cache the data
                this.set(endpoint, data, params, expirationMinutes);

                // Update store if provided
                if (storeUpdater) {
                    storeUpdater(data);
                }

                return {
                    data,
                    fromCache: false,
                    isStale: false
                };
            } else {
                // If fetch fails but we have stale data, return it
                if (cached) {
                    if (storeUpdater) {
                        storeUpdater(cached.data);
                    }
                    return {
                        data: cached.data,
                        fromCache: true,
                        isStale: true,
                        error: data
                    };
                }
                throw new Error(data);
            }
        } catch (error) {
            // If fetch fails but we have stale data, return it
            if (cached) {
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
    }

    /**
     * Background refresh for stale data
     */
    async backgroundRefresh(url, endpoint, params, storeUpdater, expirationMinutes) {
        try {
            const res = await fetch(url, { compress: true });
            const data = await res.json();

            if (res.ok) {
                this.set(endpoint, data, params, expirationMinutes);
                if (storeUpdater) {
                    storeUpdater(data);
                }
            }
        } catch (error) {
            console.warn('Background refresh failed:', error);
        }
    }
}

// Export singleton instance
export const cacheManager = new CacheManager();

// Export cache configuration constants
export const CACHE_DURATIONS = {
    PLAYERS: 24 * 60,        // 24 hours - players data changes infrequently
    LEAGUE_DATA: 4 * 60,     // 4 hours - league settings change rarely
    ROSTERS: 30,             // 30 minutes - rosters can change with trades/waivers
    MATCHUPS: 15,            // 15 minutes - scores update frequently during games
    STANDINGS: 30,           // 30 minutes - standings change with each week
    TRANSACTIONS: 10,        // 10 minutes - transactions happen frequently
    DRAFTS: 2 * 60,          // 2 hours - draft data rarely changes after completion
    BRACKETS: 60,            // 1 hour - playoff brackets
    NEWS: 5,                 // 5 minutes - news updates frequently
    NFL_STATE: 60            // 1 hour - NFL state (week, season info)
};
