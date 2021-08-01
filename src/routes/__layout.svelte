<!-- __layout.svelte -->
<script>
	import { Nav, Bg, Footer } from "$lib/components"
    export let activeTab;
</script>

<!-- 1. Assign current route's path to `key` prop -->
<script context="module">
    export const load = async ({ page }) => ({
        props: {
            activeTab: page.path,
        },
    })
</script>

<div>
    <Nav bind:activeTab={activeTab} /> <!-- adds the nav (small and large) -->
  
    <slot activeTab={activeTab} />

    <Bg /> <!-- adds the default background -->
    
    <Footer /> <!-- adds the footer -->

</div>