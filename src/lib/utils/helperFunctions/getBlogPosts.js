import { get } from 'svelte/store';
import {posts} from '$lib/stores';

export const getBlogPosts = async (bypass = false) => {
	if(get(posts)[0] && !bypass) {
		return {posts: get(posts), fresh: false};
	}
	const res = await fetch('/api/getBlogPosts', {compress: true})
	const newPosts = await res.json();

	// sort the results by create date
	const finalPosts = [...newPosts.items].sort((a, b) => Date.parse(b.sys.createdAt) - Date.parse(a.sys.createdAt));

	posts.update(() => finalPosts);

	return {posts: finalPosts, fresh: true};
}
