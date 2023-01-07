import { managers } from '$lib/utils/leagueInfo';
import { goto } from "$app/navigation";
import { stringDate } from './news';

export const cleanName = (name) => {
    return name.replace('Team ', '').toLowerCase().replace(/[ ’'!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
}

export const round = (num) => {
    if(typeof(num) =="string") {
        num = parseFloat(num)
    }
    return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

const min = (stats, roundOverride) => {
    const num = Math.min(...stats)
    return Math.floor(num / roundOverride) * roundOverride;
}

const max = (stats, roundOverride) => {
    const num = Math.max(...stats)
    return Math.ceil(num / roundOverride) * roundOverride;
}

export const gotoManager = (rosterID) => {
    if(!managers.length) return;
    const managersIndex = managers.findIndex(m => m.roster == rosterID);
    // if no manager exists for that roster, -1 will take you to the main managers page
    goto(`/manager?manager=${managersIndex}`);
}

export const getAuthor = (leagueTeamManagers, author) => {
    for(const yearKey in leagueTeamManagers.teamManagersMap) {
        for(const rosterKey in leagueTeamManagers.teamManagersMap[yearKey]) {
            for(const manager of leagueTeamManagers.teamManagersMap[yearKey][rosterKey].managers) {
                if(leagueTeamManagers.users[manager].display_name.toLowerCase() == author.toLowerCase()) {
                    return `<a href="/managers?manager=${managers.findIndex(m => m.roster == rosterKey)}">${leagueTeamManagers.users[manager].display_name}</a>`;
                }
            }
        }
    }
    return author;
}

export const getAvatar = (leagueTeamManagers, author) => {
    for(const yearKey in leagueTeamManagers.teamManagersMap) {
        for(const rosterKey in leagueTeamManagers.teamManagersMap[yearKey]) {
            for(const manager of leagueTeamManagers.teamManagersMap[yearKey][rosterKey].managers) {
                if(leagueTeamManagers.users[manager].display_name.toLowerCase() == author.toLowerCase()) {
                    return getTeamFromTeamManagers(leagueTeamManagers, rosterKey).avatar;
                }
            }
        }
    }
    return 'managers/question.jpg';
}

export const parseDate = (rawDate) => {
    const ts = Date.parse(rawDate);
    const d = new Date(ts);
    return stringDate(d);
}

export const generateGraph = ({stats, x, y, stat, header, field, short, secondField = null}, leagueTeamManagers, year, roundOverride = 10, yMinOverride = null) => {
    if(!stats) {
        return null;
    }
    const graph = {
        stats: [],
        secondStats: [],
        managers: [],
        rosterIDs: [],
        labels: {x, y, stat},
        header,
        yMin: 0,
        yMax: 0,
        short
    }

    const sortedStats = [...stats].sort((a, b) => (a.rosterID || a.managerID) - (b.rosterID || b.managerID));

    for(const indivStat of sortedStats) {
        graph.stats.push(Math.round(indivStat[field]));
        if(secondField) {
            graph.secondStats.push(Math.round(indivStat[secondField]));
        }
        if(indivStat.managerID) {
            graph.managers.push(leagueTeamManagers.users[indivStat.managerID].display_name);
            graph.rosterIDs.push(indivStat.managerID);
        }
        if(indivStat.rosterID) {
            graph.managers.push(getTeamNameFromTeamManagers(leagueTeamManagers, indivStat.rosterID, year));
            graph.rosterIDs.push(indivStat.rosterID);
        }
    }

    graph.yMax = max(graph.stats, roundOverride);
    graph.yMin = min(graph.stats, roundOverride);
    if(secondField) {
        graph.yMin = min(graph.secondStats, roundOverride);
    }
    if(yMinOverride) {
        graph.yMin = yMinOverride;
    }

    return graph;
}


/**
 * takes an array and array field, sorts the array, and returns
 * the 10 highest and lowest members of the array in desc and asc order respectively
 * @param {Object[]} arr the array to be sorted
 * @param {string} field the field to sort on
 * @returns {arr|arr} [high, low] an array where the first element is the 10 highest records and the second is the 10 lowest elements
 */
 export const sortHighAndLow = (arr, field) => {
	const sorted = arr.sort((a, b) => b[field] - a[field]);
	const high = sorted.slice(0, 10);
	const low = sorted.slice(-10).reverse();
	return [high, low]
}

/**
 * get all managers of a roster
 * @param {Object} roster an object with all data for a roster
 * @returns {Object[]} [managerIDs...] an array of manager IDs
 */
export const getManagers = (roster) => {
	const managers = [];
    if(roster.owner_id) {
        managers.push(roster.owner_id);
    }
    if(roster.co_owners) {
        for(const coOwner of roster.co_owners) {
            managers.push(coOwner);
        }
    }
    return managers;
}

/**
 * takes in a map of users and a owner ID and returns an object with a user's avatar and name
 * @param {Object} users the map of users
 * @param {string} ownerID the ID of the owner
 * @returns {Object} {avatar, name} an object containing a user's avatar image url and their name
 */
export const getTeamData = (users, ownerID) => {
	const user = users[ownerID];
	if(user) {
		return {
			avatar: `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
			name: user.metadata.team_name ? user.metadata.team_name : user.display_name,
		}
	}
    return {
        avatar: `https://sleepercdn.com/images/v2/icons/player_default.webp`,
        name: 'Unknown Team',
    }
}

export const getAvatarFromTeamManagers = (teamManagers, rosterID, year) => {
    if(!year || year > teamManagers.currentSeason) {
        year = teamManagers.currentSeason;
    }
    return teamManagers.teamManagersMap[year][rosterID]['team'].avatar;
}

export const getTeamNameFromTeamManagers = (teamManagers, rosterID, year) => {
    if(!year || year > teamManagers.currentSeason) {
        year = teamManagers.currentSeason;
    }
    return teamManagers.teamManagersMap[year][rosterID]['team'].name;
}

export const getTeamFromTeamManagers = (teamManagers, rosterID, year) => {
    if(!year || year > teamManagers.currentSeason) {
        year = teamManagers.currentSeason;
    }
    return teamManagers.teamManagersMap[year][rosterID]['team'];
}

export const getNestedTeamNamesFromTeamManagers = (teamManagers, year, rosterID) => {
    const originalName = teamManagers.teamManagersMap[year][rosterID]['team']['name'];
    const currentName = teamManagers.teamManagersMap[teamManagers.currentSeason][rosterID]['team']['name'];
    if(cleanName(originalName) != cleanName(currentName)) {
        return `${originalName}<div class="curOwner">(${currentName})</div>`;
    }
    return originalName;
}