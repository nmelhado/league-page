<script>
	import LinearProgress from '@smui/linear-progress';
    import {AllManagers} from '$lib/components';

	export let data;
	const {managers, managersInfo} = data;
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

<div class="main">
    {#await managersInfo}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving managers...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [rostersData, users,]}
        <AllManagers {managers} rosters={rostersData} {users}/>
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>