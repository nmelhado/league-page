import {
    waitForAll,
    getLeagueRosters,
    getLeagueTeamManagers,
    getLeagueData,
    getLeagueTransactions,
    getAwards,
    getLeagueRecords,
    managers as managersObj
} from '$lib/utils/helper';
export async function load({ url }) {
    if(!managersObj.length) return false;
    const managersInfo = waitForAll(
        getLeagueRosters(),    
        getLeagueTeamManagers(),
        getLeagueData(),
        getLeagueTransactions(),
        getAwards(),
        getLeagueRecords(),
    );

    const manager = url?.searchParams?.get('manager');

    const props = {
        manager: null,
        managers: managersObj,
        managersInfo
    }
    if(manager && (manager >= 0 && manager < managersObj.length)) {
        props.manager = manager;
    }

    return props;
}