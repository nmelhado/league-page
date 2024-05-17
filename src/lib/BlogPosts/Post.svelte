<script>
    import { generateParagraph } from "$lib/utils/helper";
    import { fly } from "svelte/transition";
	import AuthorAndDate from "./AuthorAndDate.svelte";

    export let leagueTeamManagers, post, createdAt, id = null, direction = 1;

    let safePost = false;
    let title, body, type, author;

    if(post != null) {
        ({title, body, type, author} = post);
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

    const duration = 300;

    let e;

    $: isOverflown = e ? e.scrollHeight > e.clientHeight : false;
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

    .button {
        background-color: #0082c3;
        font-size: 1em;
        border-radius: 1em;
        text-decoration: none;
        padding: 0.5em 1em;
        margin-right: 1em;
        color: white;
    }

    .button:hover {
        background-color: #00316b;
    }

    :global(.body blockquote) {
        border-left: 3px solid rgb(231, 235, 238);
        margin: 1em 2em;
        padding-left: 0.875em;
    }

    :global(.body .heading-1) {
        padding: 0.4em 2em;
        font-size: 1.9em;
        text-align: center;
    }

    :global(.body .heading-2) {
        padding: 0.4em 2em;
        font-size: 1.8em;
        text-align: center;
    }

    :global(.body .heading-3) {
        padding: 0.4em 2em;
        font-size: 1.7em;
        text-align: center;
    }

    :global(.body .heading-4) {
        padding: 0.4em 2em;
        font-size: 1.6em;
        text-align: center;
    }

    :global(.body .heading-5) {
        padding: 0.4em 2em;
        font-size: 1.5em;
        text-align: center;
    }

    :global(.body .heading-6) {
        padding: 0.4em 2em;
        font-size: 1.4em;
        text-align: center;
    }

    :global(.body .bodyParagraph) {
        padding: 1em 2em;
        margin: 0;
    }

    :global(.body ul) {
        padding: 1em 2em 1em 4em;
    }

    :global(.body ol) {
        padding: 1em 2em 1em 4em;
    }

    :global(.body .bodyParagraph a) {
        color: var(--g111);
    }

    :global(.body .blogImg) {
        padding: 1em 2em;
        display: flex;
        justify-content: center;
        max-width: 90%;
    }

    :global(.body .innerImg) {
        max-width: 100%;
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

    .body {
        position: relative;
        max-height: 9em;
        overflow: hidden;
    }

    .fade {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .fadeTop {
        height: 2em;
        width: 100%;
        background-image: linear-gradient(to bottom, var(--fffTransparent), var(--fff));
    }

    .fadeBottom {
        height: 1em;
        width: 100%;
        background-color: var(--fff);
    }

    .viewFull {
        padding: 0.2em 2em 1em;
    }
</style>

<!--
    Some users if they've misconfigured their blog can crash their page
    (bug https://github.com/nmelhado/league-page/issues/141)
    This if check makes blog enablement more flexible
-->
{#if safePost}
    {#key id}
        <div in:fly={{delay: duration, duration: duration, x: 150 * direction}} out:fly={{delay: 0, duration: duration, x: -150 * direction}} class="post">
            <h3>{title}</h3>

            <div class="body" bind:this={e} style="padding-bottom: {isOverflown ? '3em' : '0'}">
                {#each body.content as paragraph}
                    {@html generateParagraph(paragraph)}
                {/each}
                {#if isOverflown}
                    <div class="fade">
                        <div class="fadeTop" />
                        <div class="fadeBottom" />
                    </div>
                {/if}
            </div>
            
            <div class="viewFull">
                <a class="button" href="/blog/{id}">View Full Post</a>
            </div>

            <hr class="divider" />

            <AuthorAndDate {type} {leagueTeamManagers} {author} {createdAt} />
        </div>
    {/key}
{/if}