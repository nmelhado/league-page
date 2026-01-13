import { writable } from 'svelte/store';

// ============================================================================
// LEAGUE DATA STORES
// Core league information and metadata
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} League configuration and settings */
export const leagueDataStore = writable({});

/** @type {import('svelte/store').Writable<Object>} Current NFL season state and week info */
export const nflStateStore = writable({});

// ============================================================================
// TEAM & ROSTER STORES
// Team rosters, lineups, and manager information
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} Team rosters and player lineups */
export const rostersStore = writable({});

/** @type {import('svelte/store').Writable<Object>} Team managers and ownership info */
export const teamManagersStore = writable({});

/** @type {import('svelte/store').Writable<Object>} League standings by division and overall */
export const standingsStore = writable({});

// ============================================================================
// PLAYER DATA STORES
// Player information and statistics
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} All player data from Sleeper API */
export const playersStore = writable({});

// ============================================================================
// MATCHUP & SCORING STORES
// Games, matchups, brackets, and scoring data
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} Weekly matchups and scores */
export const matchupsStore = writable({});

/** @type {import('svelte/store').Writable<Object>} Playoff brackets and results */
export const bracketsStore = writable({});

/** @type {import('svelte/store').Writable<Object>} Historical records (highs, lows, streaks) */
export const recordsStore = writable({});

// ============================================================================
// TRANSACTION STORES
// Trades, waivers, and roster moves
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} All league transactions (trades + waivers) */
export const transactionsStore = writable({});

// ============================================================================
// DRAFT STORES
// Draft history and upcoming draft information
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} Next scheduled draft info */
export const upcomingDraftStore = writable({});

/** @type {import('svelte/store').Writable<Array>} Historical draft data by year */
export const previousDraftsStore = writable([]);

// ============================================================================
// AWARDS & ACHIEVEMENTS STORES
// League awards, championships, and accolades
// ============================================================================

/** @type {import('svelte/store').Writable<Object>} Annual and all-time awards */
export const awardsStore = writable({});

// ============================================================================
// CONTENT STORES
// News and external content
// ============================================================================

/** @type {import('svelte/store').Writable<Array>} News articles from RSS feeds */
export const newsStore = writable([]);
