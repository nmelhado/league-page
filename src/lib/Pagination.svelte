<script>
	import { Icon } from '@smui/tab';
    export let total, perPage, page, target, scroll = true;

    let pageLabels = [];

    $: totPages = Math.ceil(total / perPage);

    const computePages = (curPage, pages, iW) => {
        let tempPageLabels = []
        let before = false;
        let after = false;
        const limit = iW && iW > 380 ? 3 : 2;
        for(let i = 0; i < pages; i++) {
            if(i == 0 || (i == (pages - 1) && (!iW || iW > 300)) || ((curPage - limit) < i && i < (curPage +  limit))) {
                tempPageLabels.push(i + 1);
            } else if(!before && (curPage - limit) < i && (!iW || iW > 300)) {
                before = true;
                tempPageLabels.push("...");
            } else if(!after && i < (curPage +  limit)) {
                after = true;
                tempPageLabels.push("...");
            }
        }
        pageLabels = tempPageLabels;
    }

    const changePage = (dest) => {
        if(scroll) {
            window.scrollTo({left: 0, top: target, behavior: 'smooth'});
        }
        page = dest;
    }

    let innerWidth;
    $: computePages(page, totPages, innerWidth);
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    :global(.button) {
        color: #aaa;
        cursor: pointer;
        vertical-align: sub;
    }

    :global(.button:hover) {
        color: #0082c3;
    }

    .paginationBar {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 550px;
        margin: 10px auto;
        text-align: center;
    }

    .pg {
        font-size: 1.2em;
        padding: .4em;
        color: #aaa;
    }
    
    .spacer {
        padding: .4em 0;
        cursor: default;
        user-select: none;
    }

    .dest {
        cursor: pointer;
    }

    .dest:hover {
        color: #0082c3;
    }

    .selected {
        color: var(--blueOne);
        cursor: default;
        user-select: none;
    }

    .placeholder {
        width: 24px;
    }

    .totals {
        font-style: italic;
        cursor: default;
        user-select: none;
        color: #bbb;
        font-size: 0.8em;
        text-align: center;
    }
</style>
{#if total > 0 && totPages > 1 }
    <div class="paginationBar">
        {#if page > 0}
            <Icon class="material-icons button" on:click={() => changePage(page - 1)}>chevron_left</Icon>
        {:else}
            <span class="placeholder" />
        {/if}
        <div class="numbers">
            {#each pageLabels as pageLabel}
                {#if pageLabel == page + 1}
                    <span class="selected pg">{pageLabel}</span>
                {:else if pageLabel == "..."}
                    <span class="pg spacer">{pageLabel}</span>
                {:else}
                    <span class="dest pg" on:click={() => changePage(pageLabel - 1)}>{pageLabel}</span>
                {/if}
            {/each}
        </div>
        {#if page < totPages - 1}
            <Icon class="material-icons button" on:click={() => changePage(page + 1)}>chevron_right</Icon>
        {:else}
            <span class="placeholder" />
        {/if}
    </div>
    <div class="totals">{page * perPage + 1} - {page + 1 == totPages ? total : (page + 1) * perPage} of {total}</div>
{/if}
