<script>
    export let sideOne, sideTwo;
</script>

<style>
    .enclosure {
        padding: 4px 8px;
    }
    .gray_bar {
        position: relative;
        height: 8px;
        border-radius: 4px;
        width: 100%;
        background-color: #e5e5e5;
        border: 1px solid #bbb;
    }
    .side {
        position: absolute;
        height: 8px;
        top: 0;
    }
    .side_one {
        background-color: var(--barChartOne);
        right: 50%;
        border-radius: 4px 0 0 4px;
    }
    .side_two {
        background-color: var(--barChartSix);
        left: 50%;
        border-radius: 0 4px 4px 0;
    }
</style>

<div class="enclosure">
    <div class="gray_bar">
        <div class="side side_one" style="width: {sideOne / (sideOne + sideTwo) * 50}%"/>
        <div class="side side_two" style="width: {sideTwo / (sideOne + sideTwo) * 50}%"/>
    </div>
</div>