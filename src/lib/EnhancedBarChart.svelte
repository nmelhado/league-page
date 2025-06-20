<script>
    import { onMount } from 'svelte';
    import { round } from '$lib/utils/helper';

    export let data = [];
    export let title = '';
    export let height = 300;
    export let showTrend = false;
    export let interactive = true;
    export let color = 'var(--blueOne)';
    export let secondaryColor = 'var(--blueTwo)';

    let chartContainer;
    let hoveredIndex = -1;
    let tooltipData = null;
    let tooltipPosition = { x: 0, y: 0 };

    // Calculate chart dimensions and scales
    $: maxValue = Math.max(...data.map(d => Math.max(d.y, d.secondaryY || 0)));
    $: minValue = Math.min(...data.map(d => Math.min(d.y, d.secondaryY || 0)));
    $: valueRange = maxValue - minValue;
    $: chartWidth = chartContainer?.offsetWidth || 800;
    $: chartHeight = height - 60; // Leave space for labels
    $: barWidth = Math.max(20, (chartWidth - 100) / data.length - 10);

    // Animation and interaction handlers
    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    function handleMouseEnter(event, dataPoint, index) {
        if (!interactive) return;
        
        hoveredIndex = index;
        tooltipData = dataPoint;
        
        const rect = chartContainer.getBoundingClientRect();
        tooltipPosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function handleMouseLeave() {
        hoveredIndex = -1;
        tooltipData = null;
    }

    // Calculate bar height as percentage
    function getBarHeight(value) {
        if (valueRange === 0) return 0;
        return ((value - minValue) / valueRange) * chartHeight;
    }

    // Calculate trend line points for SVG path
    $: trendPoints = showTrend && data.length > 1 ? 
        data.map((d, i) => {
            const x = 50 + (i * (chartWidth - 100) / (data.length - 1));
            const y = chartHeight - getBarHeight(d.y) + 30;
            return `${x},${y}`;
        }).join(' ') : '';
</script>

<style>
    .chart-container {
        position: relative;
        background: var(--fff);
        border-radius: 12px;
        padding: 1.5em;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-left: 4px solid var(--blueOne);
        margin: 1em 0;
    }

    .chart-title {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--blueOne);
        margin-bottom: 1em;
        text-align: center;
    }

    .chart-wrapper {
        position: relative;
        overflow: hidden;
    }

    .chart-svg {
        width: 100%;
        height: 100%;
    }

    .bar {
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .bar:hover {
        filter: brightness(1.1);
        transform: scaleY(1.05);
        transform-origin: bottom;
    }

    .bar.primary {
        fill: var(--blueOne);
    }

    .bar.secondary {
        fill: var(--blueTwo);
        opacity: 0.7;
    }

    .trend-line {
        fill: none;
        stroke: var(--blueTwo);
        stroke-width: 3;
        stroke-dasharray: 5,5;
        opacity: 0.8;
    }

    .axis-labels {
        font-size: 0.8em;
        color: var(--g555);
    }

    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 0.8em;
        border-radius: 6px;
        pointer-events: none;
        z-index: 1000;
        font-size: 0.85em;
        max-width: 200px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .tooltip-value {
        font-weight: 600;
        color: #4CAF50;
    }

    .chart-grid {
        stroke: var(--eee);
        stroke-width: 1;
        opacity: 0.5;
    }

    .zero-line {
        stroke: var(--ccc);
        stroke-width: 2;
        opacity: 0.7;
    }

    .animate-bar {
        animation: growBar 0.8s ease-out;
    }

    @keyframes growBar {
        from {
            transform: scaleY(0);
        }
        to {
            transform: scaleY(1);
        }
    }

    .value-label {
        font-size: 0.75em;
        fill: var(--g555);
        text-anchor: middle;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .chart-container {
            padding: 1em;
        }
        
        .chart-title {
            font-size: 1em;
        }

        .axis-labels {
            font-size: 0.7em;
        }

        .value-label {
            font-size: 0.65em;
        }

        .tooltip {
            font-size: 0.8em;
            padding: 0.6em;
        }
    }

    @media (max-width: 480px) {
        .value-label {
            display: none; /* Hide labels on very small screens */
        }
    }
</style>

<div class="chart-container" bind:this={chartContainer}>
    {#if title}
        <div class="chart-title">{title}</div>
    {/if}
    
    <div class="chart-wrapper">
        <svg class="chart-svg" viewBox="0 0 {chartWidth} {height}">
            <!-- Grid lines -->
            {#each Array(5).fill().map((_, i) => i) as i}
                <line 
                    class="chart-grid"
                    x1="50" 
                    y1={30 + (i * chartHeight / 4)} 
                    x2={chartWidth - 50} 
                    y2={30 + (i * chartHeight / 4)}
                />
            {/each}
            
            <!-- Zero line if we have negative values -->
            {#if minValue < 0}
                <line 
                    class="zero-line"
                    x1="50" 
                    y1={30 + chartHeight - getBarHeight(0)} 
                    x2={chartWidth - 50} 
                    y2={30 + chartHeight - getBarHeight(0)}
                />
            {/if}

            <!-- Data bars -->
            {#each data as dataPoint, i}
                {@const x = 50 + (i * (chartWidth - 100) / Math.max(1, data.length - 1)) - barWidth/2}
                {@const barHeight = getBarHeight(dataPoint.y)}
                {@const secondaryBarHeight = dataPoint.secondaryY ? getBarHeight(dataPoint.secondaryY) : 0}
                
                <!-- Secondary bar (if exists) -->
                {#if dataPoint.secondaryY}
                    <rect
                        class="bar secondary {mounted ? 'animate-bar' : ''}"
                        x={x}
                        y={30 + chartHeight - secondaryBarHeight}
                        width={barWidth}
                        height={secondaryBarHeight}
                        style="animation-delay: {i * 0.1}s"
                    />
                {/if}
                
                <!-- Primary bar -->
                <rect
                    class="bar primary {mounted ? 'animate-bar' : ''}"
                    x={x}
                    y={30 + chartHeight - barHeight}
                    width={barWidth}
                    height={barHeight}
                    style="animation-delay: {i * 0.1}s"
                    on:mouseenter={(e) => handleMouseEnter(e, dataPoint, i)}
                    on:mouseleave={handleMouseLeave}
                />
                
                <!-- Value labels -->
                <text
                    class="value-label"
                    x={x + barWidth/2}
                    y={25 + chartHeight - barHeight}
                >
                    {dataPoint.y}
                </text>
                
                <!-- X-axis labels -->
                <text
                    class="axis-labels"
                    x={x + barWidth/2}
                    y={height - 10}
                    text-anchor="middle"
                >
                    {dataPoint.label || dataPoint.x}
                </text>
            {/each}

            <!-- Trend line -->
            {#if showTrend && trendPoints}
                <polyline
                    class="trend-line"
                    points={trendPoints}
                />
            {/if}

            <!-- Y-axis labels -->
            {#each Array(5).fill().map((_, i) => i) as i}
                {@const value = maxValue - (i * valueRange / 4)}
                <text
                    class="axis-labels"
                    x="40"
                    y={35 + (i * chartHeight / 4)}
                    text-anchor="end"
                >
                    {round(value)}
                </text>
            {/each}
        </svg>
    </div>

    <!-- Tooltip -->
    {#if tooltipData && interactive}
        <div 
            class="tooltip" 
            style="left: {tooltipPosition.x + 10}px; top: {tooltipPosition.y - 10}px"
        >
            <div><strong>{tooltipData.label || tooltipData.x}</strong></div>
            <div>Value: <span class="tooltip-value">{tooltipData.y}</span></div>
            {#if tooltipData.secondaryY}
                <div>Secondary: <span class="tooltip-value">{tooltipData.secondaryY}</span></div>
            {/if}
            {#if tooltipData.description}
                <div style="margin-top: 0.5em; font-size: 0.8em; opacity: 0.9;">
                    {tooltipData.description}
                </div>
            {/if}
        </div>
    {/if}
</div>