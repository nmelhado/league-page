<script>
	import LinearProgress from '@smui/linear-progress';
	import { News/*, Resources */} from '$lib/components';
	import { onMount } from 'svelte';
    import { checkAuthentication } from '$lib/utils/helperFunctions/universalFunctions';
    import { goto } from '$app/navigation';

	let isAuthenticated = false;
    onMount(async () => {
        isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
            goto('/login');
        }
    });

	export let data;
	const articlesData = data.articlesData;
</script>

{#if isAuthenticated}
	<style>
		.loading {
			position: relative;
			z-index: 1;
			width: 85%;
			margin: 0 auto 60px;
			max-width: 800px;
		}
	</style>

	<!-- <Resources /> -->

	<hr />

	{#await articlesData}
		<div class="loading">
			<p>Retrieving fantasy news...</p>
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
{/if}