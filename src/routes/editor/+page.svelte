<script>
	import LinearProgress from '@smui/linear-progress';
    import {Manager} from '$lib/components';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	const {managers, manager, managersInfo} = data;

</script>

<style>
	.main {
		position: relative;
		z-index: 1;
	}
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<h1>about</h1>
<p>this is the about page.</p>