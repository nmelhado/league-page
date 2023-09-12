<script>
	import LinearProgress from '@smui/linear-progress';
    import { generateParagraph } from "$lib/utils/helper";
    import { onMount } from "svelte";
    import Comments from "./Comments.svelte";
	import AuthorAndDate from './AuthorAndDate.svelte';

    export let leagueTeamManagersData, postsData, postID;

    let createdAt, id;

    let safePost = false;
    let loading = true;
    let title, body, type, author;

    let loadingComments = true;
    let total, comments;

    onMount(async()=> {
        const post = postsData.posts.filter(p => p.sys.id === postID)[0];
        id = post.sys.id;

        if(post != null) {
            createdAt = post.sys.createdAt;
            ({title, body, type, author} = post.fields);
            if(!title) {
                console.error('Invalid post: No title provided');
            } else if(!body) {
                console.error(`Invalid post (${title}): No body provided`)
            } else if(!type) {
                console.error(`Invalid post (${title}): No type provided`)
            } else if(!author) {
                console.error(`Invalid post (${title}): No author provided`)
            } else {
                safePost = true;
            }
        }
        loading = false;

        const res = await fetch(`/api/getBlogComments/${id}`, {compress: true});
        const commentsData = await res.json();

        total = commentsData.total;
        comments = [...commentsData.items].sort((a, b) => Date.parse(a.sys.createdAt) - Date.parse(b.sys.createdAt));
        loadingComments = false;
    });

    const duration = 300;
</script>

<style>
    .post {
        background-color: var(--fff);
        border: 1px solid var(--bbb);
        border-radius: 1.5em;
        color: var(--g333);
        padding: 1.5em 0 1em;
        margin: 2em 0;
    }

    h3 {
        font-size: 2em;
        text-align: center;
        margin: 0;
    }

    :global(.body blockquote) {
        margin: 0.1em 0;
        border-left: 3px solid rgb(231, 235, 238);
        margin: 1em 2em;
        padding-left: 0.875em;
    }

    :global(.body .heading-1) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.9em;
        text-align: center;
    }

    :global(.body .heading-2) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.8em;
        text-align: center;
    }

    :global(.body .heading-3) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.7em;
        text-align: center;
    }

    :global(.body .heading-4) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.6em;
        text-align: center;
    }

    :global(.body .heading-5) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.5em;
        text-align: center;
    }

    :global(.body .heading-6) {
        margin: 0.4em 0;
        padding: 0 2em;
        font-size: 1.4em;
        text-align: center;
    }

    :global(.body .bodyParagraph) {
        margin: 1em 0;
        padding: 0 2em;
    }

    :global(.body ul) {
        margin: 1em 0;
        padding: 0 2em 0 4em;
    }

    :global(.body ol) {
        margin: 1em 0;
        padding: 0 2em 0 4em;
    }

    :global(.body .bodyParagraph a) {
        color: var(--g111);
    }

    :global(.body .blogImg) {
        margin: 1em 0;
        padding: 0 2em;
        display: flex;
        justify-content: center;
    }

    :global(.body table) {
        margin: 1em 2em;
        min-width: 80%;
	    border: 1px solid var(--ddd);
        border-collapse: collapse;
    }

    :global(.body tr:nth-child(odd)) {
        background-color: var(--ddd);
    }

    :global(.body td) {
        padding: 0.5em 0;
	    text-align:center;
    }

    :global(.body th) {
        padding: 0.8em 0;
        background-color: var(--blueOne);
        color: #fff;
    }

    .divider {
        border:0;
        margin:0;
        width:100%;
        height:1px;
        background: var(--ddd);
        margin-bottom: 1em;
    }

    .commentDivider {
        margin: 1em 0 0;

    }

    :global(.authorAndDate a) {
        color: var(--g999);
    }

    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<!--
    Some users if they've misconfigured their blog can crash their page
    (bug https://github.com/nmelhado/league-page/issues/141)
    This if check makes blog enablement more flexible
-->

{#if loading}
    <!-- promise is pending -->
    <div class="loading">
        <p>Loading Blog Post...</p>
        <LinearProgress indeterminate />
    </div>
{:else if safePost}
    <div class="post">
        <h3>{title}</h3>

        <div class="body">
            {#each body.content as paragraph}
                {@html generateParagraph(paragraph)}
            {/each}
        </div>

        <hr class="divider" />

        <AuthorAndDate {type} leagueTeamManagers={leagueTeamManagersData} {author} {createdAt} />

        <!-- display comments -->
        {#if !loadingComments}
            <hr class="divider commentDivider" />
            <Comments leagueTeamManagers={leagueTeamManagersData} {comments} {total} postID={id} />
        {/if}

    </div>
{/if}