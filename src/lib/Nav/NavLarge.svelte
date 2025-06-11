<script>
	import Tab, { Icon, Label } from '@smui/tab';
	import List, { Item, Graphic, Text, Separator } from '@smui/list';
	import TabBar from '@smui/tab-bar';
	import { goto, preloadData } from '$app/navigation';
	import { page } from '$app/stores'; // Import page store
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

	let tabChildren = [];
	// Find the tab that nests children to populate tabChildren
	// This assumes only one tab can be a parent of the currently open submenu.
	const nestedParentTab = tabs.find(t => t.nest);
	if (nestedParentTab) {
		tabChildren = nestedParentTab.children;
	}

	// Function to check if a tab is a parent of the active page
	const isParentOfActivePage = (tab) => {
		if (!tab.nest || !tab.children) {
			return false;
		}
		return tab.children.some(child => $page.url.pathname.startsWith(child.dest));
	};
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
		transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
		/* Remove box-shadow and border from here if they are handled by inline styles directly based on 'display' */
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

	/* Style for parent tab when a child is active */
	:global(.navBar .mdc-tab--active.active-parent) {
		/* You might need to adjust these styles to fit your theme */
		/* For example, ensure it gets the same underline or background as a directly active tab */
	}

	:global(.navBar .active-parent .mdc-tab__text-label) {
		color: var(--mdc-theme-primary, #007bff); /* Or your theme's primary color */
	}

	:global(.navBar .active-parent .mdc-tab-indicator__content--underline) {
		border-color: var(--mdc-theme-primary, #007bff); /* Or your theme's primary color */
	}
</style>

<div class="overlay" style="display: {display ? "block" : "none"};" on:click={() => open(true)} />

<div class="parent">
	<TabBar class="navBar" {tabs} let:tab bind:active={activeTab} selected={$page.url.pathname}>
		{#if tab.nest}
			<div bind:this={el} class:active-parent={isParentOfActivePage(tab)}>
				<Tab
					{tab}
					on:click={() => open(display)}
					minWidth
					class="{isParentOfActivePage(tab) ? 'active-parent' : ''} {tab.class || ''}"
					active={isParentOfActivePage(tab) || activeTab === tab.id}"
				>
					<Icon class="material-icons">{tab.icon}</Icon>
					<Label>{tab.label}</Label>
				</Tab>
			</div>
		{:else}
			<Tab
				class="{tab.label == 'Blog' && !enableBlog ? 'dontDisplay' : ''} {tab.class || ''}"
				{tab}
				on:touchstart={() => preloadData(tab.dest)}
				on:mouseover={() => preloadData(tab.dest)}
				on:click={() => { activeTab = tab.id; goto(tab.dest); }}
				minWidth
				active={activeTab === tab.id}
			>
				<Icon class="material-icons">{tab.icon}</Icon>
				<Label>{tab.label}</Label>
			</Tab>
		{/if}
	</TabBar>
	{#if tabChildren.length > 0}
		<div
			class="subMenu"
			style="max-height: {display ? 49 * tabChildren.length - 1 - (managers.length && nestedParentTab && nestedParentTab.children.some(c => c.label === 'Managers') ? 0 : (nestedParentTab && nestedParentTab.children.some(c => c.label === 'Managers') && !managers.length ? 48 : 0)) : 0}px; opacity: {display ? 1 : 0}; pointer-events: {display ? 'auto' : 'none'}; width: {width}px; top: {height}px; left: {left}px; box-shadow: 0 0 {display ? '3px' : '0'} 0 var(--blueOne); border: {display ? '1px' : '0'} solid var(--blueOne); border-top: none;"
		>
			<List>
				{#each tabChildren as subTab, ix}
					{#if subTab.label == 'Managers'}
						{#if managers.length}
							<Item selected={$page.url.pathname.startsWith(subTab.dest)} on:SMUI:action={() => subGoto(subTab.dest)} on:touchstart={() => preloadData(subTab.dest)} on:mouseover={() => preloadData(subTab.dest)}>
								<Graphic class="material-icons">{subTab.icon}</Graphic>
								<Text class="subText">{subTab.label}</Text>
							</Item>
							{#if ix != tabChildren.length - 1} <Separator /> {/if}
						{/if}
					{:else}
						<Item selected={$page.url.pathname.startsWith(subTab.dest)} on:SMUI:action={() => subGoto(subTab.dest)} on:touchstart={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}} on:mouseover={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}}>
							<Graphic class="material-icons">{subTab.icon}</Graphic>
							<Text class="subText">{subTab.label}</Text>
						</Item>
						{#if ix != tabChildren.length - 1} <Separator /> {/if}
					{/if}
				{/each}
			</List>
		</div>
	{/if}
</div>
