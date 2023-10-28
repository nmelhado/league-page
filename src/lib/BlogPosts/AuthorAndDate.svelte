<script>
    import { parseDate, getAuthor, getAvatar } from "$lib/utils/helper";

    export let type, leagueTeamManagers, author, createdAt;
</script>

<style>
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 30px;
		width: 30px;
		margin-right: 5px;
		border: 0.25px solid #777;
	}

    .authorAndDate {
        color: var(--g999);
        padding: 0 2em;
    }

    .authorAndDate a {
        background-color: #00316b;
        color: #fff;
        border-radius: 1em;
        text-decoration: none;
        font-size: 0.8em;
        padding: 0.5em 1em;
    }

    .filter {
        margin-top: 1em;
    }

    .authorAndDate a:hover {
        background-color: #0082c3;
    }
</style>

<div class="authorAndDate">
    <img alt="author avatar" class="teamAvatar" src="{getAvatar(leagueTeamManagers, author)}" />
    <span class="author">{@html getAuthor(leagueTeamManagers, author)} - </span>
    <span class="date"><i>{parseDate(createdAt)}</i></span>
    <div class="filter">
        <a href="/blog?filter={type}&page=1">{type}</a>
    </div>
</div>