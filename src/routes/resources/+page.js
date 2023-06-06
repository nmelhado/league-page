import { getNews } from '$lib/utils/helper';

// // Added by JCH - Jun 5, 2023
// import {getLeagueMatchups} from '$lib/utils/helperFunctions/leagueMatchups'
// // End Edit

export async function load({fetch}) {
    const articlesData = getNews(fetch);

    return {
        articlesData
    };
}

// //Edit by JCH - Jun 5, 2023
// export {
//     getLeagueMatchups,
// }

// // End Edit
