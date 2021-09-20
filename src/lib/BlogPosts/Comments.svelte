<script>
    import { getAuthor, getAvatar, parseDate } from "$lib/utils/helper";
    import Icon from "@smui/textfield/icon/Icon.svelte";
    import CreateComment from "./CreateComment.svelte";
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, {Label} from "@smui/button";

    const lang = "en-US";

    export let comments, total, rosters, users, postID;

    let open = false;
    let errorMessage = '';


    const addComment = async(e) => {
        const {comment, author} = e.detail;
        if(comment.trim() == "") {
            // handle error
            errorMessage = 'Comment cannot be empty';
            open = true;
            return;
        }
        const validAuthor = validateID(author);
        if(!validAuthor) {
            // handle error
            errorMessage = 'Unauthorized user';
            open = true;
            return;
        }

        const res = await fetch(`/api/addBlogComments/${validAuthor}`, {
            method: 'POST',
            body: JSON.stringify({
                comment: comment.trim(),
                postID
            })
        })

        const newComment = await res.json();

        if(!res.ok) {
            // handle error
            errorMessage = newComment;
            open = true;
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
        padding: 1em 0 0;
        background: var(--eee);
        border: 1px solid var(--ccc);
        border-left: none;
        border-right: none;
    }

    .commentText {
        padding: 0 2em;
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
        padding: 0 2em 1em;
    }

    :global(.commentIcon) {
        font-size: 1em;
        vertical-align: middle;
        padding: 0.3em;
    }
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 30px;
		margin-right: 5px;
		border: 0.25px solid #777;
	}

    .divider {
        border:0;
        margin:0;
        width:100%;
        height:1px;
        background: var(--ddd);
        margin: 1em 0;
    }
</style>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Error</Title>
  <Content id="simple-content">{errorMessage}</Content>
  <Actions>
    <Button>
      <Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>

<div class="comments">
    <div class="commentHeader">
        <Icon class="material-icons commentIcon">comment</Icon> Comments ({total})
    </div>
    {#each comments as comment}
        <div class="comment">
            <div class="commentText">{@html comment.fields.comment[lang]}</div>
            <hr class="divider" />
            <div class="authorAndDate">
                <img alt="author avatar" class="teamAvatar" src="{getAvatar(users, comment.fields.author[lang])}" />
                <span class="author">{@html getAuthor(rosters, users, comment.fields.author[lang])} - </span>
                <span class="date"><i>{parseDate(comment.sys.createdAt)}</i></span>
            </div>
        </div>
    {/each}
    <CreateComment bind:showWrite={showWrite} on:createComment={addComment}/>
</div>
