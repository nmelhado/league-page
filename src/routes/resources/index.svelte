<script context="module">
	import { getNews } from '$lib/utils/helper';

    export async function load() {
		const articlesData = getNews();
	
		return {
			props: {
				articlesData
			}
		};
	}
</script>


<script>
	import LinearProgress from '@smui/linear-progress';
	import { News, Resources } from '$lib/components';

	export let articlesData;
</script>

<style>
	.loading {
		position: relative;
		z-index: 1;
        width: 85%;
        margin: 0 auto 60px;
        max-width: 800px;
    }
</style>

<Resources />

<hr />

{#await articlesData}
	<div class="loading">
		<p>Retreiving roster data...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then news}
	<!-- promise was fulfilled -->
	<News {news}/>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
