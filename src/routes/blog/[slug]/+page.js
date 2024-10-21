
import { enableBlog, getBlogPosts, getLeagueTeamManagers } from '$lib/utils/helper';

export function load({ fetch, params }) {
    if(!enableBlog) return false;
    
    const postID = params.slug;
    const postsData = getBlogPosts(fetch);
    const leagueTeamManagersData = getLeagueTeamManagers();

    return {
        postsData,
        postID,
        leagueTeamManagersData,
    };
}