<script>
    import { getAuthor, parseDate } from "$lib/utils/helper";
    import Icon from "@smui/textfield/icon/Icon.svelte";
    import CreateComment from "./CreateComment.svelte";

    const lang = "en-US";

    export let comments, total, rosters, users, postID;

    const addComment = async(e) => {
        const {comment, author} = e.detail;
        if(comment.trim() == "") {
            // handle error
            console.log("comment cannot be empty");
            return;
        }
        const validAuthor = validateID(author);
        if(!validAuthor) {
            // handle error
            console.log("incorrect author");
            return;
        }

        const res = await fetch(`/api/addBlogComments/${validAuthor}`, {
            method: 'POST',
            body: JSON.stringify({
                comment,
                postID
            })
        })

        const newComment = await res.json();

        console.log(newComment)

        if(!res.ok) {
            // handle error
            return;
        }

        // add comment to others
        comments = [...comments, newComment];
        total++;
        showWrite = false;
    }

    const validateID = (author) => {
        let user = null;
        for(const userKey of Object.keys(users)) {
            if(users[userKey].display_name.toLowerCase() == author.toLowerCase()) {
                user = users[userKey];
                break;
            }
        }
        if(!user) {
            return false;
        }
        return user.user_id;
    }

    let showWrite = false;
</script>

<style>
    .comment {
        margin: 0;
        padding: 1em 2em 0;
        background: var(--eee);
        border: 1px solid var(--ccc);
        border-left: none;
        border-right: none;
        margin-bottom: 0em;
    }
    
    .commentHeader {
        margin: 0;
        padding: 1em 2em;
        background: var(--f8f8f8);
        font-size: 1.2em;
        border-bottom: 1px solid var(--ccc);
        border-left: none;
        border-right: none;
    }

    .authorAndDate {
        color: var(--g999);
        padding: 0 2em;
    }

    :global(.commentIcon) {
        font-size: 1em;
        vertical-align: middle;
        padding: 0.3em;
    }
</style>

<div class="comments">
    <div class="commentHeader">
        <Icon class="material-icons commentIcon">comment</Icon> Comments ({total})
    </div>
    {#each comments as comment}
        <div class="comment">
            {@html comment.fields.comment[lang]}
            <div class="authorAndDate">
                <span class="author">{@html getAuthor(rosters, users, comment.fields.author[lang])} - </span>
                <span class="date"><i>{parseDate(comment.sys.createdAt)}</i></span>
            </div>
        </div>
    {/each}
    <CreateComment bind:showWrite={showWrite} on:createComment={addComment}/>
</div>
