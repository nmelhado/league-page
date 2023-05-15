<script>
    import Editor from "./Editor.svelte";

    export let leagueTeamManagers, playerOne, playerTwo;
</script>

<style>
    h2 {
        text-align: center;
        font-size: 2.4em;
        margin: 1.3em 0 0;
    }
</style>

<h2>Manager Editor</h2>

<div class="rivalrySelection">
    <Editor bind:playerOne={playerOne} bind:playerTwo={playerTwo} {leagueTeamManagers} />
</div>