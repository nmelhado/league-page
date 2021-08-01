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
		<p>Retreiving upcoming draft...</p>
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

<hr />

<h4>Previous Drafts</h4>
{#await previousDraftsData }
	<div class="loading">
		<p>Retreiving previous drafts...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then previousDrafts }
    {#each previousDrafts as previousDraft}
        <h6>{previousDraft.year} Draft</h6>
        <Draft draftData={previousDraft} previous={true} />
    {/each}
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}