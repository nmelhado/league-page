<script>
    import { gotoManager } from '$lib/utils/helper';
	import { getAvatar, getAuthor, getAllManagerNames } from '$lib/utils/helperFunctions/universalFunctions';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';

	export let teamManagersData;

	$: managerList = getAllManagerNames(teamManagersData);
	$: value = '';
	$: valueHelperText = '';
    $: name = '';

</script>

<style>
	.managerMenu {
		font-size: 2.8em;
		display: flex;
		align-items: center;
	}
	.managerName {
		font-size: 2.8em;
		display: flex;
		align-items: center;
	}

	.managerPhoto {
        display: inline;
        border-radius: 100%;
        max-width: auto;
        height: 55px;
		margin-left: 0.25em;
    }
</style>

<div class="editor" >
	<div class="managerMenu">
		<Select variant="filled" bind:value={valueHelperText} label="Manager " on:change="{() => value = ''}" required>
			<!--<Option value="" />-->
			{#each managerList as manager}
				<Option value={manager}>{manager}</Option>
			{/each}
		</Select>
		{#if valueHelperText}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="{getAvatar(teamManagersData, valueHelperText)}" class="managerPhoto"/>
		{/if}
	</div>
	<div class="managerName">
		<Textfield style="width: 20%;" bind:value={name} label="Manager Name"></Textfield>
  </div>
</div>