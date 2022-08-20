<script>
    import { onMount } from "svelte";
	import LinearProgress from '@smui/linear-progress';
    import Post from "./Post.svelte";
    import { getBlogPosts, getLeagueRosters, getLeagueUsers } from "$lib/utils/helper";

    const lang = "en-US";

    let post;
    let createdAt;
    let loading = true;
    let users, rosters = [];

    onMount(async() => {
		const {posts, fresh} = await getBlogPosts();
		users = await getLeagueUsers();
		const rostersData = await getLeagueRosters();
		rosters = rostersData.rosters;
        for(const singlePost of posts) {
            if(singlePost.fields.featured) {
                createdAt = singlePost.sys.createdAt;
                post = singlePost.fields;
                break;
            }
        }

        if(!fresh) {
		    const {posts} = await getBlogPosts(true);
            for(const singlePost of posts) {
                if(singlePost.fields.featured) {
                    createdAt = singlePost.sys.createdAt;
                    post = singlePost.fields;
                    break;
                }
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

    h2 {
        font-size: 2em;
        text-align: center;
        margin-bottom: 1.5em;
    }

    .center {
        text-align: center;
        margin-bottom: 2em;
    }

    .viewAll {
        text-decoration: none;
        background-color: #920505;
        color: #fff;
        border-radius: 1em;
        padding: 0.5em 1em;
    }

    .viewAll:hover {
        background-color: #670404;
    }
</style>

{#if loading}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Blog Posts...</p>
        <LinearProgress indeterminate />
    </div>
{:else}
    <h2>League Blog</h2>
    <Post {users} {rosters} {post} {createdAt} home={true} />
    <div class="center">
        <a class="viewAll" href="/blog">View More Blog Posts</a>
    </div>
{/if}