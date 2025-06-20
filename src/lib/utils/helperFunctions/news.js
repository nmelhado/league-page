import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { news } from '$lib/stores';
import { dynasty } from '$lib/utils/leagueInfo';
import { cacheManager, CACHE_DURATIONS } from '$lib/utils/cacheManager';

const REDDIT_DYNASTY = 'https://www.reddit.com/r/DynastyFF/new.json';
const REDDIT_FANTASY = 'https://www.reddit.com/r/fantasyfootball/new.json';
const SERVER_API = '/api/fetch_serverside_news';

export const getNews = async (servFetch, bypass = false) => {
	if(get(news)[0] && !bypass) {
		return {articles: get(news), fresh: false};
	}
    
    const smartFetch = servFetch ?? fetch;
    
    try {
        // Use cached fetch for server news
        const serverNewsResult = await cacheManager.cachedFetch(
            SERVER_API,
            null, // No store updater needed here
            CACHE_DURATIONS.NEWS,
            'server_news'
        );

        // Use cached fetch for Reddit news
        const redditEndpoint = dynasty ? REDDIT_DYNASTY : REDDIT_FANTASY;
        const redditResult = await cacheManager.cachedFetch(
            redditEndpoint,
            null, // No store updater needed here
            CACHE_DURATIONS.NEWS,
            'reddit_news',
            { dynasty: dynasty }
        );

        // Process Reddit data
        const redditArticles = processReddit(redditResult.data?.data || {});
        
        // Combine articles
        const articles = [...redditArticles, ...serverNewsResult.data].sort((a, b) => (a.ts < b.ts) ? 1 : -1);
        
        // Update store
        news.update(() => articles);

        return {
            articles, 
            fresh: !serverNewsResult.fromCache || !redditResult.fromCache
        };
        
    } catch (error) {
        console.error('Failed to fetch news:', error);
        
        // Fallback to any cached data we might have
        const cachedServerNews = cacheManager.get('server_news', {}, CACHE_DURATIONS.NEWS);
        const cachedRedditNews = cacheManager.get('reddit_news', {}, { dynasty: dynasty }, CACHE_DURATIONS.NEWS);
        
        if (cachedServerNews?.data || cachedRedditNews?.data) {
            const redditArticles = cachedRedditNews?.data?.data ? processReddit(cachedRedditNews.data.data) : [];
            const serverArticles = cachedServerNews?.data || [];
            const articles = [...redditArticles, ...serverArticles].sort((a, b) => (a.ts < b.ts) ? 1 : -1);
            
            news.update(() => articles);
            return {articles, fresh: false};
        }
        
        throw error;
    }

}

const getFeed = async (feed, callback) => {
	const res = await fetch(feed, {compress: true}).catch((err) => { console.error(err); });
    
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok && data && data.data) {
		return callback(data.data);
	} else {
		console.error(data);
        return [];
	}
}

const processReddit = (rawArticles) => {
	const bannedAuthors = [
		"AutoModerator",
		"FFBot",
		"Brookskbrothers",
		"FTAKJ"
	]
	const bannedIcons = [
		"",
		"self",
		"thumbnail",
		"default",
	]
	let finalArticles = [];
	const children = rawArticles.children;
	for(const rawArticle of children) {
		const data = rawArticle.data;
		if(bannedAuthors.includes(data.author)) {
			continue;
		}
		const ts = data.created_utc * 1000;
		const d = new Date(ts);
		const icon = !bannedIcons.includes(data.thumbnail) ? data.thumbnail : `newsIcons/${data.subreddit}.png`;
		const date = stringDate(d);
		let article = `<a href="${data.url}" class="body-link">${data.url}</a>`;
		if(data.selftext_html) {
			article = decodeHTML(data.selftext_html);
		}
		if(data.secure_media_embed?.content) {
			decodeHTML(data.secure_media_embed.content)
		 }
		finalArticles.push({
			title: data.title,
			article,
			link: `https://www.reddit.com${data.permalink}`,
			author: `${data.subreddit_name_prefixed} - u/${data.author}`,
			ts,
			date,
			icon,
		});
	}
	return finalArticles;
}

var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
};

function decodeHTML(str) {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        let match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
}

export const stringDate = (d) => {
	return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} ${d.getHours() % 12}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}${d.getHours() / 12 >= 1 ? "PM" : "AM"}`;
}