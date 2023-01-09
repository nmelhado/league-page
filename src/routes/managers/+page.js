import {
    getLeagueTeamManagers,
    managers as managersObj
} from '$lib/utils/helper';

export async function load({ url }) {
    if(!managersObj.length) return false;
    const leagueTeamManagersData = getLeagueTeamManagers();

    const props = {
        managers: managersObj,
        leagueTeamManagersData
    }

    return props;
}