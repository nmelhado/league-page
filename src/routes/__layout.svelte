<!-- __layout.svelte -->
<script>
	import { Nav, Footer } from "$lib/components"
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

    <Footer /> <!-- adds the footer -->

</div>