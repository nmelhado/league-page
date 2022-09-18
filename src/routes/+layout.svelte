<!-- __layout.svelte -->
<script>
	import { Nav, Footer } from "$lib/components"
</script>

<main>
    <Nav /> <!-- adds the nav (small and large) -->
  
    <slot />

    <Footer /> <!-- adds the footer -->
</main>