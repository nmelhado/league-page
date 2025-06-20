<script>
    import { onMount } from 'svelte';
    import { round } from '$lib/utils/helper';

    export let data = [];
    export let title = '';
    export let height = 300;
    export let showPoints = true;
    export let showArea = false;
    export let interactive = true;
    export let color = 'var(--blueOne)';
    export let gradientId = 'lineGradient';

    let chartContainer;
    let hoveredPoint = null;
    let tooltipPosition = { x: 0, y: 0 };

    // Calculate chart dimensions and scales
    $: maxValue = Math.max(...data.map(d => d.y));
    $: minValue = Math.min(...data.map(d => d.y));
    $: valueRange = maxValue - minValue || 1;
    $: chartWidth = chartContainer?.offsetWidth || 800;
    $: chartHeight = height - 80; // Leave space for labels

    // Generate SVG path for line
    $: linePath = data.length > 1 ? data.map((d, i) => {
        const x = 60 + (i * (chartWidth - 120) / (data.length - 1));
        const y = 40 + (chartHeight - ((d.y - minValue) / valueRange) * chartHeight);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ') : '';

    // Generate area path (for filled area under line)
    $: areaPath = showArea && data.length > 1 ? 
        linePath + ` L ${60 + ((data.length - 1) * (chartWidth - 120) / (data.length - 1))} ${40 + chartHeight} L 60 ${40 + chartHeight} Z` : '';

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    function handlePointHover(event, dataPoint, index) {
        if (!interactive) return;
        
        hoveredPoint = { ...dataPoint, index };
        const rect = chartContainer.getBoundingClientRect();
        tooltipPosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function handlePointLeave() {
        hoveredPoint = null;
    }

    // Calculate point positions
    function getPointPosition(index) {
        return {
            x: 60 + (index * (chartWidth - 120) / Math.max(1, data.length - 1)),
            y: 40 + (chartHeight - ((data[index].y - minValue) / valueRange) * chartHeight)
        };
    }
</script>

<style>
    .line-chart-container {
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

    .chart-svg {
        width: 100%;
        height: 100%;
    }

    .line-path {
        fill: none;
        stroke: var(--blueOne);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: all 0.3s ease;
    }

    .area-path {
        fill: url(#areaGradient);
        opacity: 0.3;
    }

    .data-point {
        fill: var(--blueOne);
        stroke: var(--fff);
        stroke-width: 2;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .data-point:hover {
        r: 6;
        fill: var(--blueTwo);
        stroke-width: 3;
    }

    .grid-line {
        stroke: var(--eee);
        stroke-width: 1;
        opacity: 0.5;
    }

    .axis-label {
        font-size: 0.8em;
        fill: var(--g555);
        text-anchor: middle;
    }

    .y-axis-label {
        text-anchor: end;
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

    .trend-indicator {
        font-size: 0.9em;
        margin-top: 1em;
        text-align: center;
        padding: 0.5em;
        border-radius: 6px;
    }

    .trend-up {
        background: rgba(76, 175, 80, 0.1);
        color: #4CAF50;
    }

    .trend-down {
        background: rgba(244, 67, 54, 0.1);
        color: #f44336;
    }

    .trend-stable {
        background: rgba(255, 193, 7, 0.1);
        color: #FFC107;
    }

    .animate-line {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawLine 1.5s ease-out forwards;
    }

    .animate-point {
        opacity: 0;
        animation: fadeInPoint 0.5s ease-out forwards;
    }

    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes fadeInPoint {
        to {
            opacity: 1;
        }
    }

    .performance-badge {
        display: inline-block;
        padding: 0.3em 0.8em;
        border-radius: 15px;
        font-size: 0.8em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        .line-chart-container {
            padding: 1em;
        }
        
        .chart-title {
            font-size: 1em;
        }

        .axis-label {
            font-size: 0.7em;
        }

        .tooltip {
            font-size: 0.8em;
            padding: 0.6em;
        }

        .trend-indicator {
            font-size: 0.8em;
        }
    }
</style>

<div class="line-chart-container" bind:this={chartContainer}>
    {#if title}
        <div class="chart-title">{title}</div>
    {/if}
    
    <svg class="chart-svg" viewBox="0 0 {chartWidth} {height}">
        <!-- Gradient definitions -->
        <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color: var(--blueOne); stop-opacity: 0.6"/>
                <stop offset="100%" style="stop-color: var(--blueOne); stop-opacity: 0"/>
            </linearGradient>
        </defs>

        <!-- Grid lines -->
        {#each Array(5).fill().map((_, i) => i) as i}
            <line 
                class="grid-line"
                x1="60" 
                y1={40 + (i * chartHeight / 4)} 
                x2={chartWidth - 60} 
                y2={40 + (i * chartHeight / 4)}
            />
        {/each}

        <!-- Area under line -->
        {#if showArea && areaPath && mounted}
            <path
                class="area-path"
                d={areaPath}
            />
        {/if}

        <!-- Line path -->
        {#if linePath && mounted}
            <path
                class="line-path {mounted ? 'animate-line' : ''}"
                d={linePath}
            />
        {/if}

        <!-- Data points -->
        {#if showPoints}
            {#each data as dataPoint, i}
                {@const position = getPointPosition(i)}
                <circle
                    class="data-point {mounted ? 'animate-point' : ''}"
                    cx={position.x}
                    cy={position.y}
                    r="4"
                    style="animation-delay: {1.5 + i * 0.1}s"
                    on:mouseenter={(e) => handlePointHover(e, dataPoint, i)}
                    on:mouseleave={handlePointLeave}
                />
            {/each}
        {/if}

        <!-- X-axis labels -->
        {#each data as dataPoint, i}
            {@const position = getPointPosition(i)}
            <text
                class="axis-label"
                x={position.x}
                y={height - 15}
            >
                {dataPoint.label || dataPoint.x}
            </text>
        {/each}

        <!-- Y-axis labels -->
        {#each Array(5).fill().map((_, i) => i) as i}
            {@const value = maxValue - (i * valueRange / 4)}
            <text
                class="axis-label y-axis-label"
                x="50"
                y={45 + (i * chartHeight / 4)}
            >
                {round(value)}
            </text>
        {/each}
    </svg>

    <!-- Tooltip -->
    {#if hoveredPoint && interactive}
        <div 
            class="tooltip" 
            style="left: {tooltipPosition.x + 10}px; top: {tooltipPosition.y - 10}px"
        >
            <div><strong>{hoveredPoint.label || hoveredPoint.x}</strong></div>
            <div>Value: <span class="tooltip-value">{hoveredPoint.y}</span></div>
            {#if hoveredPoint.description}
                <div style="margin-top: 0.5em; font-size: 0.8em; opacity: 0.9;">
                    {hoveredPoint.description}
                </div>
            {/if}
            {#if hoveredPoint.change}
                <div style="margin-top: 0.3em;">
                    Change: <span style="color: {hoveredPoint.change > 0 ? '#4CAF50' : '#f44336'}">
                        {hoveredPoint.change > 0 ? '+' : ''}{hoveredPoint.change}
                    </span>
                </div>
            {/if}
        </div>
    {/if}

    <!-- Trend analysis -->
    {#if data.length > 2}
        {@const firstValue = data[0].y}
        {@const lastValue = data[data.length - 1].y}
        {@const trend = lastValue - firstValue}
        {@const trendPercentage = firstValue !== 0 ? round((trend / firstValue) * 100) : 0}
        
        <div class="trend-indicator trend-{trend > 0 ? 'up' : trend < 0 ? 'down' : 'stable'}">
            <strong>Trend Analysis:</strong>
            {#if trend > 0}
                📈 Improving by {trendPercentage}%
            {:else if trend < 0}
                📉 Declining by {Math.abs(trendPercentage)}%
            {:else}
                📊 Stable performance
            {/if}
        </div>
    {/if}
</div>