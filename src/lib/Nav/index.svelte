<script>
	import { tabs } from '$lib/utils/tabs';
	import NavSmall from './NavSmall.svelte';
	import NavLarge from './NavLarge.svelte';

	export let activeTab;

	$: active = tabs.find(tab => tab.dest == activeTab || (tab.nest && tab.children.find(subTab => subTab.dest == activeTab)));
</script>

<svelte:head>
	<title>{!activeTab[1] ? 'Home' : activeTab[1].toUpperCase() + activeTab.slice(2)} | League Page</title>
</svelte:head>

<style>
	a {
		display: table;
    	margin: 0 auto;
	}
	nav {
		background-color: #fff;
		position: relative;
		z-index: 2;
		border-bottom: 1px solid #00316b;
		box-shadow: 0 0 8px 0 #00316b;
	}

	#logo {
		width: 80px;
		display: block;
		margin: 0 auto;
		padding: 10px;
	}

    .large {
		display: block;
    }

	.small {
		display: none;
	}

	@media (max-width: 860px) { /* width of the large navBar */
		.large {
			display: none;
		}

		.small {
			display: block;
		}
	}
</style>

<nav>
	<a href="/"><img id="logo" alt="league logo" src="./badge.png" /></a>

	<div class="large">
		<NavLarge {tabs} bind:active={active} />
	</div>

	<div class="small">
		<NavSmall {tabs} bind:active={activeTab} />
	</div>

</nav>
