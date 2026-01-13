import {
    getLeagueTeamManagers,
    managers,
} from '$lib/utils/helpers/helper';

export async function load() {
    if(!managers.length) return {managers};
    const leagueTeamManagersData = getLeagueTeamManagers();

    const props = {
        managers,
        leagueTeamManagersData
    }

    return props;
}