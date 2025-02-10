<script>
	import IconButton from '@smui/icon-button';

    export let year, displayWeek, selected, length;

    const nav = (dir) => {
        if(dir === "left") {
            if(selected > 0) {
                selected--;
            } else {
                selected = length - 1;
            }
        } else {
            if(selected < length - 1) {
                selected++;
            } else {
                selected = 0;
            }
        }
    }
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h4 {
        display: inline-block;
        text-align: center;
        font-size: 1.6em;
        margin: 10px 20px;
    }
</style>

<div class="container">
    {#if length > 0}
        <IconButton class="material-icons" on:click={() => nav("left")}>chevron_left</IconButton>
    {/if}
    <h4>{year} Week {displayWeek}</h4>
    {#if length > 0}
        <IconButton class="material-icons" on:click={() => nav("right")}>chevron_right</IconButton>
    {/if}
</div>