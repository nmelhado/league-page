<script>
	import Tab, { Icon, Label } from '@smui/tab';
	import List, { Item, Graphic, Text, Separator } from '@smui/list';
	import TabBar from '@smui/tab-bar';
	import { goto, preloadData } from '$app/navigation';
	import { enableBlog, managers } from '$lib/utils/leagueInfo';

	export let active, tabs;

	let activeTab = active;

	let display;
	let el, width, height, left, top;

	const sizeSubMenu = (w) => {
		top = el?.getBoundingClientRect() ? el?.getBoundingClientRect().top  : 0;
		const bottom = el?.getBoundingClientRect() ? el?.getBoundingClientRect().bottom  : 0;

		height = bottom - top + 1;

		left = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left  : 0;
		const right = el?.getBoundingClientRect() ? el?.getBoundingClientRect().right  : 0;

		width = right - left;
	}

	let innerWidth;

	$: sizeSubMenu(innerWidth);

	const open = (close = false) => {
		if(close) {
			setTimeout(() => {
				active = activeTab;
			}, 500)
		} else {
			activeTab = active;
		}
		display = !display;
	}

	const subGoto = (dest) => {
		open(false);
		goto(dest);
	}

	let tabChildren = []

	for(const tab of tabs) {
		if(tab.nest) {
			tabChildren = tab.children;
		}
	}

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    :global(.navBar) {
		display: inline-flex;
		position: relative;
    	justify-content: center;
    }

	:global(.navBar .material-icons) {
		font-size: 1.8em;
		height: 25px;
		width: 22px;
	}

	.parent {
		position: relative;
	}

	.subMenu {
		overflow-y: hidden;
		display: block;
		position: absolute;
		z-index: 5;
		background-color: var(--fff);
		transition: all 0.4s;
	}

	.overlay {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		height: 100vh;
		z-index: 4;
	}

	:global(.mdc-deprecated-list) {
		padding: 0;
	}

	:global(.subText) {
		font-size: 0.8em;
	}

	:global(.dontDisplay) {
		display: none;
	}
</style>

<div class="overlay" style="display: {display ? "block" : "none"};" on:click={() => open(true)} />

<div class="parent">
	<TabBar class="navBar" {tabs} let:tab bind:active>
		{#if tab.nest}
			<div bind:this={el}>
				<Tab
					{tab}
					on:click={() => open(display)}
					minWidth
				>
					<Icon class="material-icons">{tab.icon}</Icon>
					<Label>{tab.label}</Label>
				</Tab>
			</div>
		{:else}
			<Tab
				class="{tab.label == 'Blog' && !enableBlog ? 'dontDisplay' : ''}"
				{tab}
				on:touchstart={() => preloadData(tab.dest)}
				on:mouseover={() => preloadData(tab.dest)}
				on:click={() => goto(tab.dest)}
				minWidth
			>
				<Icon class="material-icons">{tab.icon}</Icon>
				<Label>{tab.label}</Label>
			</Tab>
		{/if}
	</TabBar>
	<div class="subMenu" style="max-height: {display ? 49 * tabChildren.length - 1 - (managers.length ? 0 : 48) : 0}px; width: {width}px; top: {height}px; left: {left}px; box-shadow: 0 0 {display ? "3px" : "0"} 0 #00316b; border: {display ? "1px" : "0"} solid #00316b; border-top: none;">
		<List>
			{#each tabChildren as subTab, ix}
				{#if subTab.label == 'Managers'}
					<Item class="{managers.length ? '' : 'dontDisplay'}" on:SMUI:action={() => subGoto(subTab.dest)} on:touchstart={() => preloadData(subTab.dest)} on:mouseover={() => preloadData(subTab.dest)}>
						<Graphic class="material-icons">{subTab.icon}</Graphic>
						<Text class="subText">{subTab.label}</Text>
					</Item>
					{#if ix != tabChildren.length - 1}
						<Separator />
					{/if}
				{:else}
					<Item on:SMUI:action={() => subGoto(subTab.dest)} on:touchstart={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}} on:mouseover={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}}>
						<Graphic class="material-icons">{subTab.icon}</Graphic>
						<Text class="subText">{subTab.label}</Text>
					</Item>
					{#if ix != tabChildren.length - 1}
						<Separator />
					{/if}
				{/if}
			{/each}
		</List>
	</div>
</div>
