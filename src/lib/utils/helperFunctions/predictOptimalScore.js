export const predictScores = (players, week, leagueData) => {
    const starterPositions = getStarterPositions(leagueData);

    // sort roster by highest projected points for that week
    const projectedPlayers = [...players].sort((a, b) => (b.weeklyInfo[week] ? b.weeklyInfo[week].projection : 0) - (a.weeklyInfo[week] ? a.weeklyInfo[week].projection : 0));

    // now that the players are sorted, grab the QBs
    const qbs = projectedPlayers.filter(p => p.position == 'QB');
    // and the WRs
    const wrs = projectedPlayers.filter(p => p.position == 'WR');
    // and the RBs
    const rbs = projectedPlayers.filter(p => p.position == 'RB');
    // and the TEs
    const tes = projectedPlayers.filter(p => p.position == 'TE');
    // and the DEFs
    const defs = projectedPlayers.filter(p => p.position == 'DEF');
    // and the Ks
    const ks = projectedPlayers.filter(p => p.position == 'K');
    // and the IDPs
    const idps = projectedPlayers.filter(p => p.position == 'IDP');
    // and the DLs
    const dls = projectedPlayers.filter(p => p.position == 'DL');
    // and the LBs
    const lbs = projectedPlayers.filter(p => p.position == 'LB');
    // and the DBs
    const dbs = projectedPlayers.filter(p => p.position == 'DB');

    let powerScore = 0;
    // next, use the roster configuration to grab the highest scorer at each position
    for(const starterPosition of starterPositions) {
        const qb = qbs[0]?.weeklyInfo[week]?.projection || 0;
        const rb = rbs[0]?.weeklyInfo[week]?.projection || 0;
        const wr = wrs[0]?.weeklyInfo[week]?.projection || 0;
        const te = tes[0]?.weeklyInfo[week]?.projection || 0;
        const dl = dls[0]?.weeklyInfo[week]?.projection || 0;
        const lb = lbs[0]?.weeklyInfo[week]?.projection || 0;
        const db = dbs[0]?.weeklyInfo[week]?.projection || 0;
        switch (starterPosition) {
            case 'QB':
                if (qb > 0) {
                    powerScore += parseFloat(qbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else {
                    powerScore += parseFloat(0);
                }
                break;
            case 'RB':
                powerScore += parseFloat(rbs.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'WR':
                powerScore += parseFloat(wrs.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'TE':
                powerScore += parseFloat(tes.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'DEF':
                powerScore += parseFloat(defs.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'K':
                powerScore += parseFloat(ks.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'DL':
                powerScore += parseFloat(dls.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'LB':
                powerScore += parseFloat(lbs.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            case 'DB':
                powerScore += parseFloat(dbs.shift()?.weeklyInfo[week]?.projection || 0);
                break;
            // Start of flex players
            case 'FLEX':
                if(rb >= wr && rb >= te) {
                    powerScore += parseFloat(rbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else if (wr >= rb && wr >= te) {
                    powerScore += parseFloat(wrs.shift()?.weeklyInfo[week]?.projection || 0);
                } else {
                    powerScore += parseFloat(tes.shift()?.weeklyInfo[week]?.projection || 0);
                }
                break;
            case 'WRRB_FLEX':
                if(rb >= wr) {
                    powerScore += parseFloat(rbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else {
                    powerScore += parseFloat(wrs.shift()?.weeklyInfo[week]?.projection || 0);
                }
                break;
            case 'SUPER_FLEX':
                if(qb >= wr && qb >= te && qb >= rb) {
                    powerScore += parseFloat(qbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else if (rb >= wr && rb >= te && rb >= qb) {
                    powerScore += parseFloat(rbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else if (wr >= rb && wr >= te && wr >= qb) {
                    powerScore += parseFloat(wrs.shift()?.weeklyInfo[week]?.projection || 0);
                } else {
                    powerScore += parseFloat(tes.shift()?.weeklyInfo[week]?.projection || 0);
                }
                break;
            case 'IDP':
                if(dl >= lb && dl >= db) {
                    powerScore += parseFloat(dls.shift()?.weeklyInfo[week]?.projection || 0);
                } else if (lb >= dl && lb >= db) {
                    powerScore += parseFloat(lbs.shift()?.weeklyInfo[week]?.projection || 0);
                } else {
                    powerScore += parseFloat(dbs.shift()?.weeklyInfo[week]?.projection || 0);
                }
                break;
            default:
                break;
        }
    }
    return powerScore;
}

export const getStarterPositions = (leagueData) => {
    const rosterPositions = leagueData.roster_positions;
    const firstBench = rosterPositions.indexOf('BN');

    return rosterPositions.slice(0, firstBench);
}
