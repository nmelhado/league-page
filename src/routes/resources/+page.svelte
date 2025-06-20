<script>
	import LinearProgress from '@smui/linear-progress';
	import { News, Resources } from '$lib/components';
	import CacheManager from '$lib/CacheManager.svelte';
	import CacheStatusIndicator from '$lib/CacheStatusIndicator.svelte';
	import { dev } from '$app/environment';

	export let data;
	const articlesData = data.articlesData;

	let showCacheManager = false;
</script>

<style>
	.loading {
		position: relative;
		z-index: 1;
        width: 85%;
        margin: 0 auto 60px;
        max-width: 800px;
    }

    .cache-section {
        margin: 2rem 0;
        padding: 1rem;
        background: var(--background-color, #f8f9fa);
        border-radius: 8px;
        border: 1px solid var(--border-color, #dee2e6);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    .cache-toggle-btn {
        background: var(--primary-color, #007bff);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        font-size: 1rem;
        margin-bottom: 1rem;
        transition: background-color 0.2s;
    }

    .cache-toggle-btn:hover {
        background: var(--primary-hover-color, #0056b3);
    }

    .cache-info {
        font-size: 0.9rem;
        color: var(--text-muted, #6c757d);
        margin-bottom: 1rem;
    }
</style>

<Resources />

<!-- Cache Management Section (only show in development or when explicitly enabled) -->
{#if dev || showCacheManager}
    <div class="cache-section">
        <h3>🚀 Performance & Cache Management</h3>
        <div class="cache-info">
            Monitor and manage API response caching to improve app performance and reduce network requests.
        </div>
        
        <button 
            class="cache-toggle-btn" 
            on:click={() => showCacheManager = !showCacheManager}
        >
            {showCacheManager ? '📋 Hide Cache Manager' : '📋 Show Cache Manager'}
        </button>
        
        {#if showCacheManager}
            <CacheManager />
        {/if}
    </div>
{:else}
    <!-- Simple cache toggle for production -->
    <div class="cache-section">
        <button 
            class="cache-toggle-btn" 
            on:click={() => showCacheManager = !showCacheManager}
        >
            ⚙️ Developer Tools
        </button>
        
        {#if showCacheManager}
            <CacheManager />
        {/if}
    </div>
{/if}

<!-- Cache Status Indicator (always available in development) -->
<CacheStatusIndicator showDetails={dev || showCacheManager} />

<hr />

{#await articlesData}
	<div class="loading">
		<p>Retrieving fantasy news...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then news}
	<!-- promise was fulfilled -->
	<News {news}/>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
