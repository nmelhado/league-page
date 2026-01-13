import {getLeagueData} from '$lib/utils/api/leagueData';
import {dues, leagueID, leagueName, dynasty, managers, homepageText} from '$lib/utils/leagueInfo';
import {getLeagueTransactions} from '$lib/utils/api/leagueTransactions';
import {getNflState} from '$lib/utils/api/nflState';
import {getLeagueRosters} from '$lib/utils/api/leagueRosters';
import {getLeagueTeamManagers} from '$lib/utils/api/leagueTeamManagers';
import {getLeagueMatchups} from '$lib/utils/api/leagueMatchups'
import {getRivalryMatchups} from '$lib/utils/api/rivalryMatchups'
import {getNews, stringDate} from '$lib/utils/api/news';
import {loadPlayers} from '$lib/utils/api/players';
import { waitForAll } from '$lib/utils/helpers/multiPromise';
import { getUpcomingDraft, getPreviousDrafts } from '$lib/utils/api/leagueDrafts'
import { getLeagueRecords } from '$lib/utils/api/leagueRecords'
import { getAwards } from '$lib/utils/api/leagueAwards'
import { cleanName, round, generateGraph, getTeamFromTeamManagers, gotoManager, getAuthor, parseDate, getAvatar } from '$lib/utils/helpers/universalFunctions';
import { predictScores } from '$lib/utils/processors/predictOptimalScore';
import { getBrackets } from '$lib/utils/api/leagueBrackets';
import { getLeagueStandings } from '$lib/utils/api/leagueStandings';

export {
    homepageText,
    gotoManager,
    managers,
    getLeagueData,
    getLeagueTransactions,
    getNflState, 
    getLeagueRosters,
    getLeagueTeamManagers,
    getLeagueMatchups,
    getRivalryMatchups,
    getNews,
    loadPlayers,
    waitForAll,
    getUpcomingDraft,
    getPreviousDrafts,
    getLeagueRecords,
    cleanName,
    round,
    dues,
    leagueID,
    leagueName,
    dynasty,
    getAwards,
    stringDate,
    getBrackets,
    generateGraph,
    predictScores,
    getLeagueStandings,
    getAuthor,
    parseDate,
    getAvatar,
    getTeamFromTeamManagers,
}
