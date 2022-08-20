import { get } from 'svelte/store';
import {posts} from '$lib/stores';

export const getBlogPosts = async (bypass = false) => {
	if(get(posts)[0]?.items && !bypass) {
		return {posts: get(posts), fresh: false};
	}
	const res = await fetch('/api/getBlogPosts', {compress: true})
    
	if(!res.ok) {
		const errs = await res.json();
		console.error(errs.basicErr)
		console.error(errs.detailedErr)
		if(get(posts)[0]?.items) {	
			return {posts: get(posts), fresh: true}
		}
		return {posts: [], fresh: true}
	}

	const newPosts = await res.json();

	// sort the results by create date
	const finalPosts = [...newPosts.items].sort((a, b) => Date.parse(b.sys.createdAt) - Date.parse(a.sys.createdAt));

	posts.update(() => finalPosts);

	return {posts: finalPosts, fresh: true};
}
