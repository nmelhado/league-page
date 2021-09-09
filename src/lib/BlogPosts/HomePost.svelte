<script>
    import { onMount } from "svelte";
	import LinearProgress from '@smui/linear-progress';
    import Post from "./Post.svelte";

    let post;
    let createdAt;
    let loading = true;

    onMount(async() => {
		const res = await fetch('/api/getBlogPosts', {compress: true})
		const posts = await res.json();

        for(const singlePost of posts.items) {
            if(singlePost.fields.featured) {
                createdAt = singlePost.sys.createdAt;
                post = singlePost.fields;
                break;
            }
        }
        
        loading = false;
    })
</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

{#if loading}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Blog Posts...</p>
        <LinearProgress indeterminate />
    </div>
{:else}
    <Post {post} {createdAt} />
{/if}