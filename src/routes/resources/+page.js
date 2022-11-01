import { getNews } from '$lib/utils/helper';

export async function load({fetch}) {
    const articlesData = getNews(fetch);

    return {
        articlesData
    };
}