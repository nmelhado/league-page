<script>
    import Button, {Label} from "@smui/button";
    import Textfield from "@smui/textfield";
	import { createEventDispatcher } from 'svelte';

    export let showWrite;

	const dispatch = createEventDispatcher();

    const submit = () => {
        dispatch('createComment', {comment, author});
    }

    let comment = '';
    let author = '';

    const toggleShow = () => {
        showWrite = !showWrite;
    }
</script>

<style>
    .commentTextBox {
        background-color: var(--fff);
        color: var(--g333);
        width: 99%;
        height: 7em;
        font-family: var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
        font-size: var(--mdc-typography-body1-font-size, 1rem);
    }

    .commentTextBox:focus {
        outline: none;
        border: 1px solid var(--blueOne);
    }

    .submitArea {
        margin: 0;
        padding: 1em 2em 0;
    }

    .textBoxHolder {
        text-align: center;
    }
</style>

{#if showWrite}
    <div class="textBoxHolder">
        <textarea autofocus bind:value={comment} label="Leave a comment..." class="commentTextBox"/>
    </div>

    <div class="submitArea">
        <Textfield class="shaped-outlined" variant="outlined"bind:value={author} label="Your Sleeper Username" />
        <Button on:click={() => submit()} variant="unelevated">
            <Label>Submit Comment</Label>
        </Button>
        <Button on:click={() => toggleShow()} color="secondary" variant="unelevated">
            <Label>Cancel</Label>
        </Button>
    </div>
{:else}
    <div class="submitArea">
        <Button on:click={() => toggleShow()} variant="unelevated">
            <Label>Leave a Comment</Label>
        </Button>
    </div>
{/if}