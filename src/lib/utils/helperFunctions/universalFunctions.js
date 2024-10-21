import { managers as managersObj } from '$lib/utils/leagueInfo';
import { goto } from "$app/navigation";
import { stringDate } from './news';

const QUESTION = 'managers/question.jpg';

export const cleanName = (name) => {
    return name.replace('Team ', '').toLowerCase().replace(/[ ’'!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
}

export const round = (num) => {
    if(typeof(num) =="string") {
        num = parseFloat(num)
    }
    return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

const min = (stats, roundOverride, max) => {
    const num = Math.min(...stats);
    let minAnswer = Math.floor(num / roundOverride) * roundOverride;
    if(max && num > 0) {
        let i = 0;
        while(minAnswer > 0 && (num - minAnswer) / (max - minAnswer) < .15) {
            minAnswer -= roundOverride;
            i++;
            // prevent infinite loop, emergency exit
            if(i > 100) {
                break;
            }
        }
    }
    return minAnswer > 0 ? minAnswer : 0;
}

const max = (stats, roundOverride) => {
    const num = Math.max(...stats);
    return Math.ceil(num / roundOverride) * roundOverride;
}

export const gotoManager = ({leagueTeamManagers, managerID, rosterID, year}) => {
    if(!managersObj.length) return;
    let managersIndex = -1;

    if(!year || year > leagueTeamManagers.currentSeason) {
        year = leagueTeamManagers.currentSeason;
    }

    if(managerID) {
        // modern approach
        managersIndex = managersObj.findIndex(m => m.managerID == managerID);

        // support for league pages still using deprecated roster field
        if(managersIndex < 0 && leagueTeamManagers.teamManagersMap[year] != null) {
            for(const rID in leagueTeamManagers.teamManagersMap[year]) {
                if(leagueTeamManagers.teamManagersMap[year][rID] == null) continue;
                for(const mID of leagueTeamManagers.teamManagersMap[year][rID].managers) {
                    if(mID == managerID) {
                        managersIndex =  managersObj.findIndex(m => m.roster == rID);
                        goto(`/manager?manager=${managersIndex}`);
                        return;
                    }
                }
            }
        }
    } else if(rosterID) {
        // check for matching managerID first
        if(leagueTeamManagers.teamManagersMap[year] != null) {
            for(const mID of leagueTeamManagers.teamManagersMap[year][rosterID].managers) {
                managersIndex = managersObj.findIndex(m => m.managerID == mID);
                if(managersIndex > -1) {
                    goto(`/manager?manager=${managersIndex}`);
                    return;
                }
            }
        }
        
        // support for league pages still using deprecated roster field
        managersIndex = managersObj.findIndex(m => m.roster == rosterID);
    }

    // if no manager exists for that roster, -1 will take you to the main managers page
    goto(`/manager?manager=${managersIndex}`);
}

export const getAuthor = (leagueTeamManagers, author) => {
    for(const userID in leagueTeamManagers.users) {
        if(leagueTeamManagers.users[userID].user_name.toLowerCase() == author.toLowerCase()) {
            return [`<a href="/manager?manager=${managersObj.findIndex(m => m.managerID == String(userID))}">${leagueTeamManagers.users[userID].display_name}</a>`, ]
        }
    }
    return author;
}

export const getAvatar = (leagueTeamManagers, author) => {
    for(const uID in leagueTeamManagers.users) {
        if(leagueTeamManagers.users[uID].user_name.toLowerCase() == author.toLowerCase()) {
            return `https://sleepercdn.com/avatars/thumbs/${leagueTeamManagers.users[uID].avatar}`;
        }
    }
    return QUESTION;
}

export const parseDate = (rawDate) => {
    const ts = Date.parse(rawDate);
    const d = new Date(ts);
    return stringDate(d);
}

export const generateGraph = ({stats, x, stat, header, field, short, secondField = null}, year, roundOverride = 10, xMinOverride = null) => {
    if(!stats) {
        return null;
    }
    const graph = {
        stats: [],
        secondStats: [],
        managerIDs: [],
        rosterIDs: [],
        labels: {x, stat},
        header,
        xMin: 0,
        xMax: 0,
        short,
        year
    }

    const sortedStats = [...stats].sort((a, b) => b[field] - a[field]);

    for(const indivStat of sortedStats) {
        graph.stats.push(indivStat[field]);
        if(secondField) {
            graph.secondStats.push(indivStat[secondField]);
        }
        if(indivStat.managerID) {
            graph.managerIDs.push(indivStat.managerID);
            graph.rosterIDs.push(null);
        } else if(indivStat.rosterID) {
            graph.managerIDs.push(null);
            graph.rosterIDs.push(indivStat.rosterID);
        }
    }

    graph.xMax = max(graph.stats, roundOverride);
    graph.xMin = min(graph.stats, roundOverride, graph.xMax);
    if(secondField) {
        graph.xMin = min(graph.secondStats, roundOverride, graph.xMax);
    }
    if(xMinOverride) {
        graph.xMin = xMinOverride;
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
			avatar: user.metadata?.avatar ? user.metadata.avatar : `https://sleepercdn.com/avatars/thumbs/${user.avatar}`,
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
    const yearManagers = teamManagers.teamManagersMap[year];
    if(yearManagers == null) {
        return QUESTION;
    }
    const roster = yearManagers[rosterID];
    if(roster == null) {
        return QUESTION;
    }
    return roster.team?.avatar;
}

export const getTeamNameFromTeamManagers = (teamManagers, rosterID, year) => {
    if(!year || year > teamManagers.currentSeason) {
        year = teamManagers.currentSeason;
    }
    return teamManagers.teamManagersMap[year][rosterID].team.name;
}

export const renderManagerNames = (teamManagers, rosterID, year) => {
    if(!year || year > teamManagers.currentSeason) {
        year = teamManagers.currentSeason;
    }
    let managersString = "";
    for(const managerID of teamManagers.teamManagersMap[year][rosterID].managers) {
        const manager = teamManagers.users[managerID];
        if(manager) {
            if(managersString != "") {
                managersString += ", "
            }
            managersString += manager.display_name;
        }
    }
    return managersString;
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

export const getDatesActive = (teamManagers, managerID) => {
    if(!managerID) return;
    let datesActive = {start: null, end: null};
    const years = Object.keys(teamManagers.teamManagersMap).sort((a, b) => b - a);
    for(const year of years) {
        for(const rosterID in  teamManagers.teamManagersMap[year]) {
            if(teamManagers.teamManagersMap[year][rosterID].managers.indexOf(managerID) > -1) {
                datesActive.start = year;
                if(!datesActive.end) {
                    datesActive.end = year;
                }
                break;
            }
        }
    }
    if(datesActive.end == teamManagers.currentSeason) {
        datesActive.end = null;
    }
    return datesActive;
}

export const getRosterIDFromManagerID = (teamManagers, managerID) => {
    if(!managerID) return null;
    const years = Object.keys(teamManagers.teamManagersMap).sort((a, b) => b - a);
    for(const year of years) {
        for(const rosterID in  teamManagers.teamManagersMap[year]) {
            if(teamManagers.teamManagersMap[year][rosterID].managers.indexOf(managerID) > -1) {
                return {rosterID, year};
            }
        }
    }
    return null;
}

export const getRosterIDFromManagerIDAndYear = (teamManagers, managerID, year) => {
    if(!managerID || !year) return null;
    for(const rosterID in  teamManagers.teamManagersMap[year]) {
        if(teamManagers.teamManagersMap[year][rosterID].managers.indexOf(managerID) > -1) {
            return rosterID;
        }
    }
    return null;
}

export const checkIfManagerReceivedAward = (teamManagers, awardRosterID, year, managerID) => {
    if(!managerID) return false;
    return teamManagers.teamManagersMap[year][awardRosterID].managers.indexOf(managerID) > -1;
}