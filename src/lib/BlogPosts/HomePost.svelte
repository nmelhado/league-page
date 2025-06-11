<script>
    import { onMount } from "svelte";
	import LinearProgress from '@smui/linear-progress';
    import Post from "./Post.svelte";
    import { getBlogPosts, getLeagueTeamManagers, waitForAll } from "$lib/utils/helper";
    import Button, { Label } from '@smui/button'; // Import SMUI Button

    const lang = "en-US";

    let post;
    let createdAt;
    let id;
    let loading = true;
    let leagueTeamManagers = {};

    onMount(async() => {
        const [{posts, fresh}, leagueTeamManagersData] = await waitForAll(getBlogPosts(null), getLeagueTeamManagers());
		leagueTeamManagers = leagueTeamManagersData;
        for(const singlePost of posts) {
            if(singlePost.fields.featured) {
                createdAt = singlePost.sys.createdAt;
                post = singlePost.fields;
                id = singlePost.sys.id;
                break;
            }
        }

        if(!fresh) {
		    const {posts} = await getBlogPosts(null, true);
            for(const singlePost of posts) {
                if(singlePost.fields.featured) {
                    createdAt = singlePost.sys.createdAt;
                    post = singlePost.fields;
                    id = singlePost.sys.id;
                    break;
                }
            }
        }
        
        loading = false;
    })
</script>

<style>
    .home-post-wrapper { /* New wrapper class for card styling */
        background-color: var(--background, #f8f9fa); /* Slightly off surface, or use surface */
        border-radius: 8px;
        padding: 1.5em;
        margin: 2em auto; /* Centering the card if it has a max-width */
        box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Softer shadow for background card */
        max-width: 95%; /* Or a fixed max-width like 800px */
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 40px auto; /* Reduced margin for loading indicator */
    }

    h2 { /* "League Blog" title */
        font-size: 1.8em; /* Adjusted size */
        text-align: center;
        margin-bottom: 1em; /* Adjusted margin */
        color: var(--on-background, #212529); /* Text color on background */
    }

    .view-all-container { /* Renamed from .center */
        text-align: center;
        margin-top: 1.5em; /* Margin above the "View More" button */
        margin-bottom: 0.5em; /* Margin below */
    }

    /* Removed .viewAll and .viewAll:hover, will use SMUI Button */
</style>

{#if loading}
    <div class="loading">
        <p>Loading Featured Blog Post...</p> {/* More specific loading message */}
        <LinearProgress indeterminate />
    </div>
{:else if post} {/* Ensure post data exists before trying to render */}
    <div class="home-post-wrapper">
        <h2>League Blog</h2>
        <Post {leagueTeamManagers} {post} {createdAt} {id} />
        <div class="view-all-container">
            <Button variant="outlined" href="/blog">
                <Label>View All Blog Posts</Label>
            </Button>
        </div>
    </div>
{:else}
    {#if !loading}
        <div class="home-post-wrapper" style="text-align: center; padding: 2em;">
             <p>No featured blog post available at the moment.</p>
             <Button variant="text" href="/blog" style="margin-top: 1em;">
                <Label>Go to Blog</Label>
            </Button>
        </div>
    {/if}
{/if}