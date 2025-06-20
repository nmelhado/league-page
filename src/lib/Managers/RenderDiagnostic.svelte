
<script>
    import { onMount, afterUpdate } from 'svelte';
    
    export let componentName = 'Unknown Component';
    export let dataProps = {};
    
    let renderCount = 0;
    let mountTime = null;
    let lastUpdateTime = null;
    
    onMount(() => {
        mountTime = new Date().toISOString();
        console.log(`🔧 [${componentName}] Component mounted at ${mountTime}`);
        console.log(`🔧 [${componentName}] Data props:`, dataProps);
        
        // Check if the component is actually visible
        setTimeout(() => {
            const elements = document.querySelectorAll(`[data-component="${componentName}"]`);
            console.log(`🔧 [${componentName}] Found ${elements.length} DOM elements`);
            
            elements.forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0;
                const computedStyle = window.getComputedStyle(el);
                
                console.log(`🔧 [${componentName}] Element ${index}:`, {
                    visible: isVisible,
                    dimensions: { width: rect.width, height: rect.height },
                    position: { x: rect.x, y: rect.y },
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    opacity: computedStyle.opacity
                });
            });
        }, 100);
    });
    
    afterUpdate(() => {
        renderCount++;
        lastUpdateTime = new Date().toISOString();
        console.log(`🔧 [${componentName}] Update #${renderCount} at ${lastUpdateTime}`);
    });
</script>

<style>
    .diagnostic-wrapper {
        border: 2px dashed #ff6b35;
        background: rgba(255, 107, 53, 0.1);
        padding: 0.5em;
        margin: 0.5em 0;
        border-radius: 4px;
        font-size: 0.8em;
        color: #333;
    }
    
    .diagnostic-info {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
        align-items: center;
    }
    
    .status-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4CAF50;
        margin-right: 0.3em;
    }
</style>

<div class="diagnostic-wrapper" data-component={componentName}>
    <div class="diagnostic-info">
        <span><span class="status-indicator"></span><strong>{componentName}</strong></span>
        <span>Renders: {renderCount}</span>
        {#if mountTime}
            <span>Mounted: {mountTime.split('T')[1].split('.')[0]}</span>
        {/if}
        <span>Props: {Object.keys(dataProps).length}</span>
    </div>
</div>
