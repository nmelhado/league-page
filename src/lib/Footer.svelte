<script>
	import { goto } from '$app/navigation';
	import { tabs } from '$lib/utils/tabs';

	const year = new Date().getFullYear();

	let el, footerHeight, innerWidth;

	const resize = (w) => {
		const top = el?.getBoundingClientRect() ? el?.getBoundingClientRect().top  : 0;
		const bottom = el?.getBoundingClientRect() ? el?.getBoundingClientRect().bottom  : 0;

		footerHeight = bottom - top;
	}


    $: resize(innerWidth);
    

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
	footer {
		background-color: #f8f8f8;
		width: 100%;
        display: block;
        position: absolute;
        bottom: 0;
		z-index: 1;
		border-top: 1px solid #920505;
		padding: 30px 0 60px;
		text-align: center;
		color: #777;
	}

	#navigation {
		margin: 0 0 2em;
	}

	#navigation ul {
		margin: 0;
		padding: 0;
	}

	#navigation ul li {
		list-style-type: none;
		display: inline;
	}

	#navigation li:not(:first-child):before {
		content: " | ";
	}

	.navLink {
		display: inline-block;
		cursor: pointer;
		padding: 6px 10px;
	}

	.navLink:hover {
		color: #920505;
	}
</style>

<div class="footerSpacer" style="height: {footerHeight}px;" />

<footer bind:this={el}>
	<div id="navigation">
		<ul>
			{#each tabs as tab}
				{#if !tab.nest}
					<li><div class="navLink" on:click={() => goto(tab.dest)}>{tab.label}</div></li>
				{:else}
					{#each tab.children as child}
						<li><div class="navLink" on:click={() => goto(child.dest)}>{child.label}</div></li>
					{/each}
				{/if}
			{/each}
		</ul>
	</div>
	<span class="copyright">&copy; 2021 - {year} League Page</span>
	<br />
	<span class="creator">Built by <a href="http://www.nmelhado.com/">Nicholas Melhado</a><br /><a href="https://www.buymeacoffee.com/nmelhado" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a></span>
</footer>
