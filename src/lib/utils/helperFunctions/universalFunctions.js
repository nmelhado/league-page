export const cleanName = (name) => {
    return name.replace('Team ', '').toLowerCase().replace(/[ ’'!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
}

export const round = (num) => {
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

export const findManagerLink = (managers, rosterID) => {
    const managersIndex = managers.indexOf(m => m.rosterID == rosterID);
    return `/managers?manager=${managersIndex}`;
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