<script>
	import LinearProgress from '@smui/linear-progress';
    import Draft from './Draft.svelte'; 

    export let upcomingDraftData, previousDraftsData;
</script>

<style>
	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}

    h4 {
        text-align: center;
    }

    h6 {
        text-align: center;
    }
</style>


{#await upcomingDraftData }
	<div class="loading">
		<p>Retrieving upcoming draft...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then upcomingDraft }
    <h4>Upcoming {upcomingDraft.year} Draft</h4>
    <Draft draftData={upcomingDraft} />
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}


{#await previousDraftsData }
	<hr />
	<h4>Previous Drafts</h4>
	<div class="loading">
		<p>Retrieving previous drafts...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then previousDrafts }
	<!-- Don't display anything unless there are previous drafts -->
	{#if previousDrafts.length}
		<hr />
		<h4>Previous Drafts</h4>
		{#each previousDrafts as previousDraft}
			<h6>{previousDraft.year} Draft</h6>
			<Draft draftData={previousDraft} previous={true} />
		{/each}
	{/if}
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}