<script>
	import { Editor } from '$lib/components';
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';

    export let data;
    const {teamManagersData} = data;
</script>

<style>
    #main {
        display: block;
        margin: 30px auto;
		width: 95%;
		max-width: 1000px;
		position: relative;
		z-index: 1;
		overflow-y: hidden;
    }
</style>

<div id="main">
    <Editor {teamManagersData} />
</div>