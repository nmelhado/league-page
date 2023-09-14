<script>
    import { getAuthor, getAvatar, parseDate } from "$lib/utils/helper";
    import Icon from "@smui/textfield/icon";
    import CreateComment from "./CreateComment.svelte";
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, {Label} from "@smui/button";

    const lang = "en-US";

    export let comments, total, leagueTeamManagers, postID;

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
        for(const uID in leagueTeamManagers.users) {
            if(leagueTeamManagers.users[uID].user_name.toLowerCase() == author.toLowerCase()) {
                return uID;
            }
        }
        return false;
    }

    let showWrite = false;
</script>

<style>
    .comment {
        margin: 0;
        padding: 1em 2em 0.5em;
        background: var(--eee);
        border: 1px solid var(--ccc);
        border-left: none;
        border-right: none;
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

    .date {
        color: var(--g999);
        padding: 0.5em 0 0;
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

    .author {
        font-weight: 700;
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
            <img alt="author avatar" class="teamAvatar" src="{getAvatar(leagueTeamManagers, comment.fields.author)}" />
            <span class="author">{@html getAuthor(leagueTeamManagers, comment.fields.author)} - </span>
            <span class="commentText">{@html comment.fields.comment}</span>
            <div class="date"><i>{parseDate(comment.sys.createdAt)}</i></div>
        </div>
    {/each}
    <CreateComment bind:showWrite={showWrite} on:createComment={addComment}/>
</div>
