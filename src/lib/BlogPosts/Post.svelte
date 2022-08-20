<script>
    import { parseDate, getAuthor, getAvatar, generateParagraph } from "$lib/utils/helper";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Comments from "./Comments.svelte";

    export let rosters, users, post, createdAt, id = null, direction = 1, home = false;

    const lang = "en-US";

    let loadingComments = true;
    let total, comments;

    onMount(async()=> {
        const res = await fetch(`/api/getBlogComments/${id}`, {compress: true})
        const commentsData = await res.json();

        total = commentsData.total;
        comments = [...commentsData.items].sort((a, b) => Date.parse(a.sys.createdAt) - Date.parse(b.sys.createdAt));
        loadingComments = false;
    });

    console.log(post);

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

    .authorAndDate a {
        background-color: #00316b;
        color: #fff;
        border-radius: 1em;
        text-decoration: none;
        font-size: 0.8em;
        padding: 0.5em 1em;
        margin-right: 1em;
    }

    .authorAndDate a:hover {
        background-color: #0082c3;
    }

    :global(.body blockquote) {
        margin: 0.1em 0;
        border-left: 3px solid rgb(231, 235, 238);
        margin: 1em 2em;
        padding-left: 0.875em;
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

    .divider {
        border:0;
        margin:0;
        width:100%;
        height:1px;
        background: var(--ddd);
        margin-bottom: 1em;
    }
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 30px;
		margin-right: 5px;
		border: 0.25px solid #777;
	}

    .commentDivider {
        margin: 1em 0 0;

    }

    .authorAndDate {
        color: var(--g999);
        padding: 0 2em;
    }

    :global(.authorAndDate a) {
        color: var(--g999);
    }
</style>

<!--
    Some users if they've misconfigured their blog can crash their page
    (bug https://github.com/nmelhado/league-page/issues/141)
    This if check makes blog enablement more flexible
-->
{#if post != null}
    {#key id}
        <div in:fly={{delay: duration, duration: duration, x: 150 * direction}} out:fly={{delay: 0, duration: duration, x: -150 * direction}} class="post">
            <h3>{post.title}</h3>
            
            <div class="body">
                {#each post.body.content as paragraph}
                    {@html generateParagraph(paragraph)}
                {/each}
            </div>

            <hr class="divider" />

            <div class="authorAndDate">
                <a href="/blog?filter={post.type}&page=1">{post.type}</a>
                <img alt="author avatar" class="teamAvatar" src="{getAvatar(users, post.author)}" />
                <span class="author">{@html getAuthor(rosters, users, post.author)} - </span>
                <span class="date"><i>{parseDate(createdAt)}</i></span>
            </div>

            <!-- display comments -->
            {#if !loadingComments && !home}
                <hr class="divider commentDivider" />
                <Comments {rosters} {users} {comments} {total} postID={id} />
            {/if}

        </div>
    {/key}
{/if}