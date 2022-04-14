import { sortHighAndLow } from '../helperFunctions/universalFunctions';

/** this holds all the data and the functions necessary to compute a league's records (both per season, as well as for all-time) */
export class Records {
	/**
	 * Builds a Records object that holds all the data and the functions necessary to compute a league's records (both per season, as well as for all-time).
     * 
     * Can be used for both regular season, as well as playoff records.
	 */
	constructor() { // constructor returns empty records block
		this.leagueRosterRecords = {}; // every full season stat point (for each year and all years combined)
		this.seasonWeekRecords = []; // highest weekly points within a single season
		this.leagueWeekRecords = []; // keeps track of weekly points in all seasons combined
		this.seasonLongPoints = []; // keeps track of season long points
		this.allTimeMatchupDifferentials = []; // the difference in scores for every matchup (for all years combined)

		this.allTimeBiggestBlowouts = [];
		this.allTimeClosestMatchups = [];
		this.leastSeasonLongPoints = [];
		this.mostSeasonLongPoints = [];
		this.leagueWeekLows = [];
		this.leagueWeekHighs = [];

		this.currentManagers = [];
		this.currentYear = null;
		this.lastYear = null;
	}
}

// Class functions to help build league records below

/**
 * Check if a roster record exists for a given roster ID and, if not, create one.
 * @param {int} rosterID
 */
Records.prototype.confirmRosterRecord = function(rosterID) {
    // if no leagueRosterRecord exists for a roster, create one
    if(!this.leagueRosterRecords[rosterID]) {
        this.leagueRosterRecords[rosterID] = {
            wins: 0,
            losses: 0,
            ties: 0,
            fptsFor: 0,
            fptsAgainst: 0,
            potentialPoints: 0,
            pOGames: 0,
            byes: 0,
            years: []
        }
    }
}


/**
 * Update the internal leagueRosterRecords for a given roster ID
 * @param {number} rosterID
 * @param {Object} recordsData
 * @param {any} recordsData.manager
 * @param {number} recordsData.year
 * @param {number} recordsData.wins
 * @param {number} recordsData.losses
 * @param {number} recordsData.ties
 * @param {number} recordsData.fptsPerGame
 * @param {number} recordsData.fptsFor
 * @param {number} recordsData.fptsAgainst
 * @param {number} recordsData.potentialPoints
 * @param {number} recordsData.pOGames
 * @param {number} recordsData.byes
 */
Records.prototype.updateRosterRecord = function(rosterID, {manager, year, wins, losses, ties, fptsPerGame, fptsFor, fptsAgainst, potentialPoints, pOGames, byes}) {
    // check that a roster record has already been started for a given roster ID
    this.confirmRosterRecord(rosterID);

    // add all-time data
    this.leagueRosterRecords[rosterID].wins += wins;
    this.leagueRosterRecords[rosterID].losses += losses;
    this.leagueRosterRecords[rosterID].ties += ties;
    this.leagueRosterRecords[rosterID].fptsFor += fptsFor;
    this.leagueRosterRecords[rosterID].fptsAgainst += fptsAgainst;
    this.leagueRosterRecords[rosterID].potentialPoints += potentialPoints;
    this.leagueRosterRecords[rosterID].pOGames += pOGames;
    this.leagueRosterRecords[rosterID].byes += byes;

    // add the single season data
    this.leagueRosterRecords[rosterID].years.push({
        wins,
        losses,
        ties,
        fpts: fptsFor,
        fptsAgainst,
        fptsPerGame,
        potentialPoints,
        pOGames,
        byes,
        manager,
        year,
    });
}


/**
 * add an entry to the seasonLongPoints array
 * @param {Object} recordData
 * @param {int} recordData.rosterID
 * @param {float} recordData.fpts
 * @param {float} recordData.fptsPerGame
 * @param {int} recordData.year
 * @param {Object} recordData.manager
 */
Records.prototype.addSeasonLongPoints = function({rosterID, fpts, fptsPerGame, year, manager}) {
    this.seasonLongPoints.push({
        rosterID,
        fpts,
        fptsPerGame,
        year,
        manager
    })
}


/**
 * Add an entry to the leagueWeekRecord array.
 * 
 * The leagueWeekRecord is used to compute the highest and lowest scoring weeks of all-time.
 * @param {Object} entry
 */
Records.prototype.addLeagueWeekRecord = function(entry) {
    this.leagueWeekRecords.push(entry);
}


/**
 * Add matchupDifferentials to the allTimeMatchupDifferentials array.
 * 
 * The allTimeMatchupDifferentials is used to compute the biggest blowouts and narrowest victories of all-time.
 * @param {Object[]} matchupDifferentials
 */
Records.prototype.addAllTimeMatchupDifferentials = function(matchupDifferentials) {
    this.allTimeMatchupDifferentials = this.allTimeMatchupDifferentials.concat(matchupDifferentials);
}


/**
 * Adds an entry to the seasonWeekRecords array.
 * 
 * The seasonWeekRecords is an array of objects that contain the biggest blowouts, narrowest
 * victories, highest scoring weekly performances, and lowest scoring weekly performances for a given year.
 * @param {Object} entry
 */
Records.prototype.addSeasonWeekRecord = function(entry) {
    this.seasonWeekRecords.push(entry)
}

/**
 * Once all data has been gathered, finalizeAllTimeRecords will compute the allTimeBiggestBlowouts, allTimeClosestMatchups,
 * leagueWeekHighs, leagueWeekLows, mostSeasonLongPoints, and leastSeasonLongPoints as well as adding the current season managers,
 * currentYear, and lastYear to the records Class
 * @param {Object[]} currentManagers
 * @param {int} currentYear
 * @param {int} lastYear
 */
 Records.prototype.finalizeAllTimeRecords = function({currentManagers, currentYear, lastYear}) {
    // sort allTimeMatchupDifferentials and return the biggest blowouts and narrowest victories
    const [allTimeBiggestBlowouts, allTimeClosestMatchups] = sortHighAndLow(this.allTimeMatchupDifferentials, 'differential')
    this.allTimeBiggestBlowouts = allTimeBiggestBlowouts;
    this.allTimeClosestMatchups = allTimeClosestMatchups;

    // sort leagueWeekRecords and return the highest weekly scores and lowest weekly scores
    const [leagueWeekHighs, leagueWeekLows] = sortHighAndLow(this.leagueWeekRecords, 'fpts')
    this.leagueWeekHighs = leagueWeekHighs;
    this.leagueWeekLows = leagueWeekLows;

    // sort seasonLongPoints and return the highest season-long scores and lowest season-long scores
    const [mostSeasonLongPoints, leastSeasonLongPoints] = sortHighAndLow(this.seasonLongPoints, 'fptsPerGame')
    this.mostSeasonLongPoints = mostSeasonLongPoints;
    this.leastSeasonLongPoints = leastSeasonLongPoints;

    this.currentManagers = currentManagers;
    this.currentYear = currentYear;
    this.lastYear = lastYear;
}


/**
 * Returns an object with the data needed to build the records page
 * @returns {Object}
 */
Records.prototype.returnRecords = function() {
    return {
        allTimeBiggestBlowouts: this.allTimeBiggestBlowouts,
        allTimeClosestMatchups: this.allTimeClosestMatchups,
        leastSeasonLongPoints: this.leastSeasonLongPoints,
        mostSeasonLongPoints: this.mostSeasonLongPoints,
        leagueWeekLows: this.leagueWeekLows,
        leagueWeekHighs: this.leagueWeekHighs,
        seasonWeekRecords: this.seasonWeekRecords,
        leagueRosterRecords: this.leagueRosterRecords,
        currentManagers: this.currentManagers,
        currentYear: this.currentYear,
        lastYear: this.lastYear,
    }
}
