<script context="module">
	import { enableContentful, getBlogPosts } from '$lib/utils/helper';

    export function load({ page }) {
        if(!enableContentful) return false;
        const queryPage = page.query.get('page') || 1;
        const filterKey = page.query.get('filter') || '';
		const postsData = getBlogPosts();
	
		return {
			props: {
                queryPage,
				postsData,
                filterKey,
			}
		};
	}
</script>

<script>
    import { Posts } from "$lib/components";

    export let postsData, queryPage, filterKey;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
        display: block;
        margin: 30px auto;
		width: 95%;
		max-width: 1000px;
        overflow-y: hidden;
    }
</style>

<div id="main">
    <Posts {postsData} {queryPage} {filterKey} />
</div>