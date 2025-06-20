<script>
    import { onMount } from 'svelte';
    import { round } from '$lib/utils/helper';

    export let data = [];
    export let title = '';
    export let size = 300;
    export let interactive = true;
    export let showLabels = true;
    export let maxValue = 100;

    let chartContainer;
    let hoveredSegment = null;
    let tooltipPosition = { x: 0, y: 0 };

    // Chart calculations
    $: radius = (size - 80) / 2;
    $: center = size / 2;
    $: angleStep = (2 * Math.PI) / data.length;

    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    // Calculate polygon points for the data
    $: dataPoints = data.map((item, index) => {
        const angle = (index * angleStep) - (Math.PI / 2); // Start from top
        const value = Math.min(item.value, maxValue);
        const distance = (value / maxValue) * radius;
        return {
            x: center + Math.cos(angle) * distance,
            y: center + Math.sin(angle) * distance,
            ...item
        };
    });

    // Calculate grid circles (concentric circles for scale)
    $: gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

    // Calculate axis lines (spokes from center to edge)
    $: axisLines = data.map((_, index) => {
        const angle = (index * angleStep) - (Math.PI / 2);
        return {
            x1: center,
            y1: center,
            x2: center + Math.cos(angle) * radius,
            y2: center + Math.sin(angle) * radius
        };
    });

    // Calculate label positions
    $: labelPositions = data.map((item, index) => {
        const angle = (index * angleStep) - (Math.PI / 2);
        const labelDistance = radius + 25;
        return {
            x: center + Math.cos(angle) * labelDistance,
            y: center + Math.sin(angle) * labelDistance,
            label: item.label,
            value: item.value
        };
    });

    // Generate path string for the data polygon
    $: dataPolygonPath = dataPoints.length > 0 ? 
        'M ' + dataPoints.map(p => `${p.x},${p.y}`).join(' L ') + ' Z' : '';

    function handleSegmentHover(event, dataPoint, index) {
        if (!interactive) return;
        
        hoveredSegment = { ...dataPoint, index };
        const rect = chartContainer.getBoundingClientRect();
        tooltipPosition = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function handleSegmentLeave() {
        hoveredSegment = null;
    }

    // Get performance color based on value
    function getPerformanceColor(value, maxVal = maxValue) {
        const percentage = (value / maxVal) * 100;
        if (percentage >= 80) return '#4CAF50';  // Green
        if (percentage >= 60) return '#8BC34A';  // Light green
        if (percentage >= 40) return '#FFC107';  // Yellow
        if (percentage >= 20) return '#FF9800';  // Orange
        return '#f44336';  // Red
    }

    // Calculate overall performance score
    $: overallScore = data.length > 0 ? 
        round(data.reduce((sum, item) => sum + item.value, 0) / data.length) : 0;
    
    $: performanceLevel = (() => {
        const percentage = (overallScore / maxValue) * 100;
        if (percentage >= 80) return { level: 'Elite', color: '#4CAF50' };
        if (percentage >= 60) return { level: 'Strong', color: '#8BC34A' };
        if (percentage >= 40) return { level: 'Average', color: '#FFC107' };
        if (percentage >= 20) return { level: 'Below Average', color: '#FF9800' };
        return { level: 'Needs Improvement', color: '#f44336' };
    })();
</script>

<style>
    .radar-chart-container {
        position: relative;
        background: var(--fff);
        border-radius: 12px;
        padding: 1.5em;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-left: 4px solid var(--blueOne);
        margin: 1em 0;
        text-align: center;
    }

    .chart-title {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--blueOne);
        margin-bottom: 1em;
    }

    .radar-svg {
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .grid-circle {
        fill: none;
        stroke: var(--eee);
        stroke-width: 1;
        opacity: 0.6;
    }

    .axis-line {
        stroke: var(--ddd);
        stroke-width: 1;
        opacity: 0.4;
    }

    .data-polygon {
        fill: var(--blueOne);
        fill-opacity: 0.2;
        stroke: var(--blueOne);
        stroke-width: 2;
        transition: all 0.3s ease;
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

    .axis-label {
        font-size: 0.8em;
        fill: var(--g555);
        text-anchor: middle;
        dominant-baseline: middle;
        font-weight: 500;
    }

    .grid-label {
        font-size: 0.7em;
        fill: var(--g999);
        text-anchor: middle;
        dominant-baseline: middle;
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

    .performance-summary {
        margin-top: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        flex-wrap: wrap;
    }

    .overall-score {
        text-align: center;
    }

    .score-value {
        font-size: 2em;
        font-weight: 700;
        color: var(--blueOne);
    }

    .score-label {
        font-size: 0.9em;
        color: var(--g555);
        margin-top: 0.3em;
    }

    .performance-badge {
        padding: 0.5em 1em;
        border-radius: 20px;
        color: white;
        font-weight: 600;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .animate-polygon {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: drawPolygon 1.5s ease-out forwards;
    }

    .animate-point {
        opacity: 0;
        animation: fadeInPoint 0.5s ease-out forwards;
    }

    @keyframes drawPolygon {
        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes fadeInPoint {
        to {
            opacity: 1;
        }
    }

    .strength-indicator {
        display: flex;
        justify-content: space-around;
        margin-top: 1em;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    .strength-item {
        text-align: center;
        padding: 0.5em;
        border-radius: 6px;
        background: var(--f8f9fa);
        border: 1px solid var(--e9ecef);
        min-width: 80px;
    }

    .strength-value {
        font-weight: 600;
        color: var(--blueOne);
    }

    .strength-label {
        font-size: 0.8em;
        color: var(--g555);
        margin-top: 0.2em;
    }

    @media (max-width: 768px) {
        .radar-chart-container {
            padding: 1em;
        }
        
        .chart-title {
            font-size: 1em;
        }

        .axis-label {
            font-size: 0.7em;
        }

        .performance-summary {
            flex-direction: column;
            gap: 0.5em;
        }

        .strength-indicator {
            flex-direction: column;
        }

        .strength-item {
            min-width: auto;
        }
    }
</style>

<div class="radar-chart-container" bind:this={chartContainer}>
    {#if title}
        <div class="chart-title">{title}</div>
    {/if}
    
    <svg class="radar-svg" viewBox="0 0 {size} {size}" width={size} height={size}>
        <!-- Grid circles -->
        {#each gridLevels as level, i}
            <circle
                class="grid-circle"
                cx={center}
                cy={center}
                r={radius * level}
            />
            <!-- Grid value labels -->
            <text
                class="grid-label"
                x={center + 5}
                y={center - (radius * level) + 3}
            >
                {round(maxValue * level)}
            </text>
        {/each}

        <!-- Axis lines -->
        {#each axisLines as line}
            <line
                class="axis-line"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
            />
        {/each}

        <!-- Data polygon -->
        {#if dataPolygonPath && mounted}
            <path
                class="data-polygon {mounted ? 'animate-polygon' : ''}"
                d={dataPolygonPath}
            />
        {/if}

        <!-- Data points -->
        {#each dataPoints as point, i}
            <circle
                class="data-point {mounted ? 'animate-point' : ''}"
                cx={point.x}
                cy={point.y}
                r="4"
                style="animation-delay: {1.5 + i * 0.1}s"
                on:mouseenter={(e) => handleSegmentHover(e, point, i)}
                on:mouseleave={handleSegmentLeave}
            />
        {/each}

        <!-- Labels -->
        {#if showLabels}
            {#each labelPositions as labelPos}
                <text
                    class="axis-label"
                    x={labelPos.x}
                    y={labelPos.y}
                >
                    {labelPos.label}
                </text>
            {/each}
        {/if}
    </svg>

    <!-- Performance Summary -->
    <div class="performance-summary">
        <div class="overall-score">
            <div class="score-value">{overallScore}</div>
            <div class="score-label">Overall Rating</div>
        </div>
        <div 
            class="performance-badge"
            style="background-color: {performanceLevel.color}"
        >
            {performanceLevel.level}
        </div>
    </div>

    <!-- Individual Strengths -->
    {#if data.length > 0}
        <div class="strength-indicator">
            {#each data.slice(0, 4) as item}
                <div class="strength-item">
                    <div class="strength-value" style="color: {getPerformanceColor(item.value)}">
                        {item.value}
                    </div>
                    <div class="strength-label">{item.label}</div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Tooltip -->
    {#if hoveredSegment && interactive}
        <div 
            class="tooltip" 
            style="left: {tooltipPosition.x + 10}px; top: {tooltipPosition.y - 10}px"
        >
            <div><strong>{hoveredSegment.label}</strong></div>
            <div>Score: <span class="tooltip-value">{hoveredSegment.value}</span></div>
            <div>Rating: <span style="color: {getPerformanceColor(hoveredSegment.value)}">
                {round((hoveredSegment.value / maxValue) * 100)}%
            </span></div>
            {#if hoveredSegment.description}
                <div style="margin-top: 0.5em; font-size: 0.8em; opacity: 0.9;">
                    {hoveredSegment.description}
                </div>
            {/if}
        </div>
    {/if}
</div>