<script>
	import Drawer, {
	  Content,
	  Header,
	  Title,
	} from '@smui/drawer';
	import { Icon } from '@smui/tab';
  	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
	import { goto, preloadData } from '$app/navigation';
	import { leagueName } from '$lib/utils/helper';
	import { enableBlog, managers } from '$lib/utils/leagueInfo';
	
	export let active, tabs;

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
		color: #888;
		padding: 6px;
		cursor: pointer;
	}

	:global(.menuIcon:hover) {
		color: #00316b;
	}

	:global(.nav-drawer) {
		z-index: 5;
		top: 0;
		left: 0;
	}

	:global(.nav-item) {
		color: #858585 !important;
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
					<Item href="javascript:void(0)" on:click={() => selectTab(tab)} on:touchstart={() => preloadData(tab.dest)} on:mouseover={() => preloadData(tab.dest)} activated={active == tab.dest} >
						<Graphic class="material-icons{active == tab.dest ? "" : " nav-item"}" aria-hidden="true">{tab.icon}</Graphic>
						<Text class="{active == tab.dest ? "" : "nav-item"}">{tab.label}</Text>
					</Item>
				{/if}
			{/each}
			{#each tabs as tab}
				{#if tab.nest}
					<Separator />
					<Subheader>{tab.label}</Subheader>
					{#each tab.children as subTab}
						{#if subTab.label == 'Managers'}
							{#if managers.length}
								<Item href="javascript:void(0)" on:click={() => selectTab(subTab)} activated={active == subTab.dest}  on:touchstart={() => preloadData(subTab.dest)} on:mouseover={() => preloadData(subTab.dest)}>
									<Graphic class="material-icons{active == subTab.dest ? "" : " nav-item"}" aria-hidden="true">{subTab.icon}</Graphic>
									<Text class="{active == subTab.dest ? "" : "nav-item"}">{subTab.label}</Text>
								</Item>
							{/if}
						{:else}
							<Item href="javascript:void(0)" on:click={() => selectTab(subTab)} activated={active == subTab.dest}  on:touchstart={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}} on:mouseover={() => {if(subTab.label != 'Go to Sleeper') preloadData(subTab.dest)}}>
								<Graphic class="material-icons{active == subTab.dest ? "" : " nav-item"}" aria-hidden="true">{subTab.icon}</Graphic>
								<Text class="{active == subTab.dest ? "" : "nav-item"}">{subTab.label}</Text>
							</Item>
						{/if}
					{/each}
				{/if}
			{/each}
		</List>
	</Content>
  </Drawer>
	
