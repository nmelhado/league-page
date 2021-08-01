import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import {news} from '$lib/stores';

const NBC_URL = 'https://www.nbcsportsedge.com/edge/api/player_news?sort=-created&page%5Blimit%5D=10&page%5Boffset%5D=0&filter%5Bleague.meta.drupal_internal__id%5D=21&include=player,position,team,team.secondary_logo,player.image,related_players,related_teams';
const REDDIT_DYNASTY = 'https://www.reddit.com/r/DynastyFF/new.json';
const SERVER_API = './api/fetch_serverside_news';

export const getNews = async (bypass = false) => {
	if(get(news)[0] && !bypass) {
		return {articles: get(news), fresh: false};
	}
	const [nbcNews, redditDynasty, serverRes] = await waitForAll(
		getFeed(NBC_URL, processNBC),
		getFeed(REDDIT_DYNASTY, processReddit),
		fetch(SERVER_API, {compress: true}),
	).catch((err) => { console.error(err); });
	const serverData = await serverRes.json().catch((err) => { console.error(err); });

	const articles = [...nbcNews, ...redditDynasty, ...serverData].sort((a, b) => (a.ts < b.ts) ? 1 : -1);
	news.update(() => articles);

	return {articles, fresh: true};
}

const getFeed = async (feed, callback) => {
	const res = await fetch(feed, {compress: true}).catch((err) => { console.error(err); });
	const data = await res.json().catch((err) => { console.error(err); });
	
	if (res.ok) {
		return callback(data.data);
	} else {
		throw new Error(data);
	}
}

const processNBC = (rawArticles) => {
	let finalArticles = [];
	for(const rawArticle of rawArticles) {
		const ts = Date.parse(rawArticle.attributes.changed);
		const d = new Date(ts);
		const date = stringDate(d);
		finalArticles.push({
			title: rawArticle.attributes.headline,
			article: `${rawArticle.attributes.news.processed}${rawArticle.attributes.analysis ? rawArticle.attributes.analysis.processed : ''}`,
			link: rawArticle.attributes.source_url,
			author: rawArticle.attributes.source,
			ts,
			date,
			icon: 'newsIcons/nbcSportsEdge.jpeg',
		});
	}
	return finalArticles;
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
};

const stringDate = (d) => {
	return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`;
}