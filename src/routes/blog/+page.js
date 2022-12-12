
import { enableBlog, getBlogPosts, getLeagueRosters, getLeagueUsers } from '$lib/utils/helper';

export function load({ url, fetch }) {
    if(!enableBlog) return false;

    const queryPage = url?.searchParams?.get('page') || 1;
    const filterKey = url?.searchParams?.get('filter') || '';
    const postsData = getBlogPosts(fetch);
    const usersData = getLeagueUsers();
    const rostersData = getLeagueRosters();

    return {
        queryPage,
        postsData,
        filterKey,
        usersData,
        rostersData,
    };
}