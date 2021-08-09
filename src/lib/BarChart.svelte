<script>
    import Button, { Group, Label } from '@smui/button';
    import {xIntervalFont, xIntervalHeight, barLabelFont, labelFont} from './barChartResize'

    export let graphs, curGraph = 0, maxWidth = 1000;

    const colors = [
        "#52DEE5",
        "#B4436C",
        "#4D9078",
        "#1789FC",
        "#0E273C",
        "#F78154",
        "#3777FF",
        "#4A306D",
        "#5FAD56",
        "#A33B20",
        "#F2C14E",
        "#393D3F",
    ];

    $: yMin = graphs[curGraph].secondStats.length > 0 ? graphs[curGraph].yMin/2 : graphs[curGraph].yMin;
    $: yMax = graphs[curGraph].yMax;
    $: stats = graphs[curGraph].stats;
    $: secondStats = graphs[curGraph].secondStats;
    $: managers = graphs[curGraph].managers;
    $: rosterIDs = graphs[curGraph].rosterIDs;
    $: labels = graphs[curGraph].labels;
    $: header = graphs[curGraph].header;

    $: interval = (yMax - yMin) / 4;

    $: yScales = [
        yMin,
        yMin + interval,
        yMin + interval * 2,
        yMin + interval * 3,
        yMin + interval * 4,
    ];

	let el;

    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;

    let chartHeight = 0;
    let chartHeightInterval = 0;
    let chartWidth = 0;
    let chartWidthInterval = 0;

    let width = 0;

    // screen resize dimensions
    let xIFont = 1;
    let xIHeight = 160;
    let barLFont = 0.7;
    let lFont = 1;

    const resize = (w) => {
        width = maxWidth > 1000 ? 1000 : maxWidth;
        resizeInner();
        xIFont = xIntervalFont(maxWidth);
        xIHeight = xIntervalHeight(maxWidth);
        barLFont = barLabelFont(maxWidth);
        lFont = labelFont(maxWidth);
    }

    const resizeInner = () => {
        top = el?.getBoundingClientRect() ? el?.getBoundingClientRect().top  : 0;
        right = el?.getBoundingClientRect() ? el?.getBoundingClientRect().right  : 0;
        bottom = top + (width * 0.7 * 0.66);
        left = right - (width * 0.85);

        chartHeight = bottom - top;
        chartHeightInterval = chartHeight / 4;
        chartWidth = right - left;
        chartWidthInterval = chartWidth / (stats.length + 1);
    }

    $: resize(maxWidth);
    $: resize(innerWidth);
    
    let innerWidth;

</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    :global(.opacity) {
        opacity: 0.3;
    }

    .chartWrapper {
		background-color: var(--primaryBack);
        padding: 1em 0 0.5em;
        margin: 0 auto;
        box-shadow: 0px 3px 3px -2px var(--boxShadowOne), 0px 3px 4px 0px var(--boxShadowTwo), 0px 1px 8px 0px var(--boxShadowThree);
    }
    .barChart {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .barChartInner {
        display: block;
        position: absolute;
        top: 0.1em;
        right: 0;
        border-bottom: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }

    .barLabel {
        position: absolute;
        transform: translate(-50%, 0);
        line-height: 1.1em;
        left: 50%;
        color: #666;
        bottom: 103%;
        text-align: center;
    }

    .yLabel {
        writing-mode: tb-rl;
        transform: rotate(-180deg);
        text-align: center;
    }

    .yIntervals {
        position: absolute;
        display: inline-block;
        top: 1em;
    }

    .yInterval {
        display: inline-block;
        position: absolute;
        width: 62px;
        text-align: right;
    }

    .xLabel {
        display: inline-block;
        right: 0;
        position: absolute;
        text-align: center;
        bottom: 1%;
    }

    .xIntervals {
        position: absolute;
        display: inline-block;
        right: 0;
    }

    .xInterval {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        writing-mode: tb-rl;
        transform: translate(-50%, 0) rotate(-160deg);
        word-break: break-word;
        text-align: right;
        line-height: 1em;
    }

    .bar {
        position: absolute;
        bottom: 0;
		transition: height 0.6s;
    }

    h6 {
        font-weight: 400;
        width: 100%;
        text-align: center;
        margin: 0 0 1em;
    }

    .buttonHolderG {
        text-align: center;
        margin: 1em 0 2em;
    }

    /* Start button resizing */

    @media (max-width: 525px) {
        :global(.buttonHolderG .selectionButtons) {
            font-size: 0.6em;
        }
    }

    @media (max-width: 405px) {
        :global(.buttonHolderG .selectionButtons) {
            font-size: 0.5em;
            padding: 0 6px;
        }
    }

    /* End button resizing */
</style>

<h6>{header}</h6>
<div class="chartWrapper" style="width: {width}px; height: {width * .7}px">
    <div class="barChart" >
        <div class="barChartInner" style="width: {width * .85}px; height: {width * .7 * .66}px" bind:this={el}>
            <!-- x Axis label and intervals -->
            {#each stats as stat, ix}
                <div class="bar{secondStats.length == 0  ? '' : ' opacity'}" style="background-color: {colors[(rosterIDs[ix]-1) % 12]}; width: {chartWidthInterval * 0.8}px; left: {chartWidthInterval * ix + (chartWidthInterval / 2)}px; height: {(stat - yMin) / (yMax - yMin == 0 ? 1 : (yMax - yMin)) * 100}%;">
                    <span class="barLabel" style="font-size: {barLFont}em;">{stat}{labels.stat}</span>
                </div>
            {/each}
            {#each secondStats as stat, ix}
                <div class="bar" style="background-color: {colors[(rosterIDs[ix]-1) % 12]}; width: {chartWidthInterval * 0.8}px; left: {chartWidthInterval * ix + (chartWidthInterval / 2)}px; height: {(stat - yMin) / (yMax - yMin == 0 ? 1 : (yMax - yMin)) * 100}%;" />
            {/each}
        </div>

        <!-- y Axis label and intervals -->
        <div class="yAxis">
            <div class="label yLabel" style="height: {chartHeight}px; font-size: {lFont}em;">{labels.y}</div>
            <div class="yIntervals" style="right: {chartWidth + 65}px; height: {chartHeight}px;">
                {#each yScales as yScale, ix}
                    <div class="label yInterval" style="bottom: {chartHeightInterval * ix}px; font-size: {lFont}em;">{yScale}</div>
                {/each}
            </div>
        </div>

        <!-- x Axis label and intervals -->
        <div class="xAxis">
            <div class="label xLabel" style="width: {chartWidth}px; font-size: {lFont}em;">{labels.x}</div>
            <div class="xIntervals" style="width: {chartWidth}px; top: {chartHeight + 6}px;">
                {#each managers as manager, ix}
                    <div class="xInterval" style="left: {chartWidthInterval * (ix + 0.5)}px; font-size: {xIFont}em; height: {xIHeight}px;">{manager.name}</div>
                {/each}
            </div>
        </div>
    </div>
</div>

{#if graphs.length > 1}
    <div class="buttonHolderG">
        <Group variant="outlined">
            {#each graphs as graph, ix}
                {#if ix < 4}
                    <Button class="selectionButtons" on:click={() => curGraph = ix} variant="{curGraph == ix ? "raised" : "outlined"}">
                        <Label>{graph.short}</Label>
                    </Button>
                {/if}
            {/each}
        </Group>
        <br />
        <Group variant="outlined">
            {#each graphs as graph, ix}
                {#if ix > 3}
                    <Button class="selectionButtons" on:click={() => curGraph = ix} variant="{curGraph == ix ? "raised" : "outlined"}">
                        <Label>{graph.short}</Label>
                    </Button>
                {/if}
            {/each}
        </Group>
    </div>
{/if}