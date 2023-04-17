<script>
    export let sideOne, sideTwo, label, unit;
</script>

<style>
    .enclosure {
        padding: 4px 8px;
        text-align: center;
    }
    .gray_bar {
        position: relative;
        height: 8px;
        border-radius: 4px;
        width: 75%;
        margin: 0 auto;
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
    h4 {
        text-align: center;
        font-size: 1.4em;
        margin: 10px;
    }
    .stats {
        display: flex;
        width: 75%;
        margin: 0 auto;
        justify-content: space-between;
    }
    @media (max-width: 650px) {
        h4 {
            font-size: 1.2em;
        }
    }
    @media (max-width: 400px) {
        h4 {
            font-size: 1.1em;
        }
    }
</style>

<h4>{label}</h4>

<div class="enclosure">
    <div class="gray_bar">
        <div class="side side_one" style="width: {sideOne / (sideOne + sideTwo) * 50}%"/>
        <div class="side side_two" style="width: {sideTwo / (sideOne + sideTwo) * 50}%"/>
    </div>
    <div class="stats">
        <span class="stat">{sideOne} {unit}</span>
        <span class="stat">{sideTwo} {unit}</span>
    </div>
</div>