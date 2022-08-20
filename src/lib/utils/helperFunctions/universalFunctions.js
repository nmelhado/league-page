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
    goto(`/managers?manager=${managersIndex}`);
}

export const getAuthor = (rosters, users, author) => {
    let user = null;
    for(const userKey of Object.keys(users)) {
        if(users[userKey].display_name.toLowerCase() == author.toLowerCase()) {
            user = users[userKey];
            break;
        }
    }
    if(!user) {
        return author;
    }
    const userID = user.user_id;
    const roster = rosters.find(r => r.owner_id == userID || (r.co_owners && r.co_owners.indexOf(userID) > -1));
    return `<a href="/managers?manager=${managers.findIndex(m => m.roster == roster.roster_id)}">${user.metadata.team_name ? user.metadata.team_name : user.display_name}</a>`;
}

export const getAvatar = (users, author) => {
    let user = null;
    for(const userKey of Object.keys(users)) {
        if(users[userKey].display_name.toLowerCase() == author.toLowerCase()) {
            user = users[userKey];
            break;
        }
    }
    if(!user) {
        return 'managers/question.jpg';
    }

    return `https://sleepercdn.com/avatars/thumbs/${user.avatar}`;
}

export const parseDate = (rawDate) => {
    const ts = Date.parse(rawDate);
    const d = new Date(ts);
    return stringDate(d);
}

export const generateGraph = ({stats, x, y, stat, header, field, short, secondField = null}, roundOverride = 10, yMinOverride = null) => {
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

    const sortedStats = [...stats].sort((a, b) => a.rosterID - b.rosterID);

    for(const indivStat of sortedStats) {
        graph.stats.push(Math.round(indivStat[field]));
        if(secondField) {
            graph.secondStats.push(Math.round(indivStat[secondField]));
        }
        graph.managers.push(indivStat.manager);
        graph.rosterIDs.push(indivStat.rosterID)
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