<script>
	import Drawer, {
	  Content,
	  Header,
	  Title,
	} from '@smui/drawer';
	import { Icon } from '@smui/tab';
  	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import { goto, preloadData } from '$app/navigation';
	import { page } from '$app/stores'; // Import page store
	import { leagueName } from '$lib/utils/helper';
	import { enableBlog, managers } from '$lib/utils/leagueInfo';
	
	export let tabs; // 'active' prop is no longer needed, will use $page store

	let open = false;

	const selectTab = (tab) => {
		open = false;
		goto(tab.dest);
	}
</script>

<style>
	:global(.menuIcon) {
		position: absolute;
		top: 15px;
		left: 15px;
		font-size: 2em;
		color: var(--g999); /* Updated to theme variable */
		padding: 6px;
		cursor: pointer;
	}

	:global(.menuIcon:hover) {
		color: var(--blueOne); /* Updated to theme variable */
	}

	:global(.nav-drawer) {
		z-index: 5;
		top: 0;
		left: 0;
	}

	:global(.nav-drawer .mdc-deprecated-list-item) { /* Target SMUI list items */
		min-height: 48px; /* Good base for touch target */
		padding-top: 8px; /* Increased padding */
		padding-bottom: 8px; /* Increased padding */
		box-sizing: border-box;
	}

	:global(.nav-drawer .mdc-deprecated-list-item .mdc-deprecated-list-item__graphic) {
		margin-right: 24px; /* Increased spacing between icon and text */
	}

	:global(.nav-drawer .mdc-deprecated-list-item__text) {
		font-size: 1rem; /* Ensure text is adequately sized */
		line-height: 1.5; /* Improve readability */
	}

	:global(.nav-drawer .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__text) {
		font-weight: bold; /* Make active item text bold */
	}

	:global(.nav-item) { /* For inactive items - Graphic (icon) and Text */
		color: var(--g555) !important; /* Slightly darker gray for better contrast, using g555 */
	}

	/* Ensure activated icon also uses primary color if not by default */
	:global(.nav-drawer .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic) {
		color: var(--mdc-theme-primary, #007bff) !important;
	}

	.nav-back {
		position: fixed;
		z-index: 4;
		width: 100%;
		width: 100vw;
		height: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.32);
		transition: all 0.7s;
	}
</style>

<Icon class="material-icons menuIcon" on:click={() => (open = true)}>menu</Icon>

<div class="nav-back" style="pointer-events: {open ? "visible" : "none"}; opacity: {open ? 1 : 0};" on:click={() => (open = false)}/>

<Drawer variant="modal" class="nav-drawer" fixed={true} bind:open>
	<Header>
		<Title>{leagueName}</Title>
	</Header>
	<Content>
		<List>
			{#each tabs as tab}
				{#if !tab.nest && (tab.label != 'Blog' || (tab.label == 'Blog' && enableBlog))}
					{@const isActive = $page.url.pathname.startsWith(tab.dest)}
					<Item href="javascript:void(0)" on:click={() => selectTab(tab)} on:touchstart={() => preloadData(tab.dest)} on:mouseover={() => preloadData(tab.dest)} activated={isActive} >
						<Graphic class="material-icons{isActive ? '' : ' nav-item'}" aria-hidden="true">{tab.icon}</Graphic>
						<Text class="{isActive ? '' : 'nav-item'}">{tab.label}</Text>
					</Item>
				{/if}
			{/each}
			{#each tabs as tab}
				{#if tab.nest}
					<Separator />
					<Subheader>{tab.label}</Subheader> {#each tab.children as subTab}
						{#if subTab.label == 'Managers'}
							{#if managers.length}
								{@const isActive = $page.url.pathname.startsWith(subTab.dest)}
								<Item href="javascript:void(0)" on:click={() => selectTab(subTab)} activated={isActive}  on:touchstart={() => preloadData(subTab.dest)} on:mouseover={() => preloadData(subTab.dest)}>
									<Graphic class="material-icons{isActive ? '' : ' nav-item'}" aria-hidden="true">{subTab.icon}</Graphic>
									<Text class="{isActive ? '' : 'nav-item'}">{subTab.label}</Text>
								</Item>
							{/if}
						{:else}
							{@const isActive = $page.url.pathname.startsWith(subTab.dest) || (subTab.altDest && $page.url.pathname.startsWith(subTab.altDest))}
							<Item href="javascript:void(0)" on:click={() => selectTab(subTab)} activated={isActive}  on:touchstart={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}} on:mouseover={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}}>
								<Graphic class="material-icons{isActive ? '' : ' nav-item'}" aria-hidden="true">{subTab.icon}</Graphic>
								<Text class="{isActive ? '' : 'nav-item'}">{subTab.label}</Text>
							</Item>
						{/if}
					{/each}
				{/if}
			{/each}
		</List>
	</Content>
  </Drawer>
	
