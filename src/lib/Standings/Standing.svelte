<script>
    import { gotoManager } from '$lib/utils/helper';
  	import { Row, Cell } from '@smui/data-table';

    export let columnOrder, roster, user, standing;
</script>

<style>
    .clickable {
        cursor: pointer;
    }
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 40px;
		margin-right: 15px;
		border: 0.25px solid #777;
	}

    :global(.contrastRow) {
        background-color: var(--f8f8f8);
    }

    .team {
        text-align: center;
    }
</style>

<Row class="contrastRow">
    <Cell class="">
        <div class="clickable team" on:click={() => gotoManager(roster.roster_id)}>
            <img alt="team avatar" class="teamAvatar clickable" src="https://sleepercdn.com/avatars/thumbs/{user.avatar}" />
            <div>
                {user.metadata.team_name ? user.metadata.team_name : user.display_name}
            </div>
        </div>
    </Cell>
    {#each columnOrder as column}
        <Cell class="center">{standing[column.field]}</Cell>
    {/each}
</Row>