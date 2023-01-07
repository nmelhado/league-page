import { sortHighAndLow } from '../helperFunctions/universalFunctions';

/** this holds all the data and the functions necessary to compute a league's records (both per season, as well as for all-time) */
export class Records {
	/**
	 * Builds a Records object that holds all the data and the functions necessary to compute a league's records (both per season, as well as for all-time).
     * 
     * Can be used for both regular season, as well as playoff records.
	 */
	constructor() { // constructor returns empty records block
		this.leagueManagerRecords = {}; // holds the all-time stats for each manager in the league
		this.leagueRosterRecords = {}; // holds the per season stats for each roster (for each year)
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

		this.currentYear = null;
		this.lastYear = null;
	}
}

// Class functions to help build league records below

/**
 * Check if a manger record exists for a given manager ID and, if not, create one.
 * @param {int} managerID
 */
Records.prototype.confirmManagerRecord = function(managerID) {
    // if no leagueManagerRecord exists for a manager, create one
    if(!this.leagueManagerRecords[managerID]) {
        this.leagueManagerRecords[managerID] = {
            wins: 0,
            losses: 0,
            ties: 0,
            fptsFor: 0,
            fptsAgainst: 0,
            potentialPoints: 0,
            pOGames: 0,
            byes: 0,
            playoffAppearances: 0,
        }
    }
}

/**
 * Check if a roster record exists for a given roster ID and, if not, create one.
 * @param {int} rosterID
 */
Records.prototype.confirmRosterRecord = function(rosterID) {
    // if no leagueRosterRecords exists for a roster, create one
    if(!this.leagueRosterRecords[rosterID]) {
        this.leagueRosterRecords[rosterID] = {
            years: []
        }
    }
}


/**
 * Update the internal leagueManagerRecords for a given roster ID
 * @param {Object[]} managers array of managers that need this record attached
 * @param {Object} recordsData
 * @param {any} recordsData.team
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
Records.prototype.updateManagerRecord = function(managers, {rosterID, year, wins, losses, ties, fptsPerGame, fptsFor, fptsAgainst, potentialPoints, pOGames, byes}) {
    // check that a roster record has already been started for a given roster ID
    for(const managerID of managers) {
        this.confirmManagerRecord(managerID);

        // add all-time data
        this.leagueManagerRecords[managerID].wins += wins;
        this.leagueManagerRecords[managerID].losses += losses;
        this.leagueManagerRecords[managerID].ties += ties;
        this.leagueManagerRecords[managerID].fptsFor += fptsFor;
        this.leagueManagerRecords[managerID].fptsAgainst += fptsAgainst;
        this.leagueManagerRecords[managerID].potentialPoints += potentialPoints;
        this.leagueManagerRecords[managerID].pOGames += pOGames;
        this.leagueManagerRecords[managerID].byes += byes;
        this.leagueManagerRecords[managerID].playoffAppearances ++;
    }
    
    this.confirmRosterRecord(rosterID);
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
        rosterID,
        year,
    });
}


/**
 * add an entry to the seasonLongPoints array
 * @param {Object} recordData
 * @param {Object[]} recordData.rosterID
 * @param {float} recordData.fpts
 * @param {float} recordData.fptsPerGame
 * @param {int} recordData.year
 * @param {Object} recordData.team
 */
Records.prototype.addSeasonLongPoints = function({rosterID, fpts, fptsPerGame, year}) {
    this.seasonLongPoints.push({
        rosterID,
        fpts,
        fptsPerGame,
        year,
    });
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
 * @param {int} currentYear
 * @param {int} lastYear
 */
 Records.prototype.finalizeAllTimeRecords = function({currentYear, lastYear}) {
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
        leagueManagerRecords: this.leagueManagerRecords,
        leagueRosterRecords: this.leagueRosterRecords,
        currentYear: this.currentYear,
        lastYear: this.lastYear,
    }
}
