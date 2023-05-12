<script>
    import { gotoManager } from '$lib/utils/helper';
	import { getAvatar, getAllManagerNames } from '$lib/utils/helperFunctions/universalFunctions';
	import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Slider from '@smui/slider';
    import AllManagers from '$lib/Managers/AllManagers.svelte';


	export let teamManagersData;

	$: managerList = getAllManagerNames(teamManagersData);
	$: managerDropdown = '';
	$: managerDropdownValue = '';
    $: managerNameValue = '';
	$: locationValue = '';
	$: bioValue = '';
	$: favoriteTeamValue = '';
	$: modeList = ['Win Now', 'Dynasty', 'Rebuild'];
	$: modeDropdown = '';
	$: modeDropdownValue = '';
	$: rivalList = getAllManagerNames(teamManagersData);
	$: rivalDropdown = '';
	$: rivalDropdownValue = '';
	$: favoritePlayerValue = '';
	$: valuePositionValue = '';
	$: rookieOrVetsList = ['Rookie', 'Vets'];
	$: rookieOrVetsDropdown = '';
	$: rookieOrVetsDropdownValue = '';
	$: philosophyValue = '';
	$: tradingScaleValue = 1;
	$: preferredContactList = ['Text', 'WhatsApp', 'Sleeper', 'Email', 'Discord', 'Carrier Pigeon'];
	$: preferredContactDropdown = '';
	$: preferredContactDropdownValue = '';

	const tradeScale = () => {
		tradingScaleValue = 8
	}
</script>

<style>
	.editor {
		display: box;
		margin-right: auto;
		margin-left: auto;
		width: 600px;
		height: auto;
	}
	.managerMenu {
		font-size: 2.8em;
		align-items: center;
	}

	.managerInfo {
		font-size: 2.8em;
		align-items: left;
		display: inline-block;
		margin-right: 0.5em;
		justify-content: left;
	}

	.location {
		font-size: 2.8em;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(5%);
		align-items: right;
		justify-content: right;
	}

	.managerPhoto {
        display: inline-block;
        border-radius: 100%;
		position: absolute;
        max-width: auto;
        height: 55px;
		margin-left: 0.25em;
    }

	.bio {
		margin-top: 0.5em;
		margin-bottom: 0.5em;
	}

	.favoriteTeam {
		font-size: 2.8em;
		align-items: left;
		display: inline-block;
		margin-right: 0.5em;
		justify-content: left;
	}

	.favoritePlayer {
		font-size: 2.8em;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(5%);
		align-items: right;
		justify-content: right;
	}

	.favoriteTeam {
		font-size: 2.8em;
		align-items: left;
		display: inline-block;
		margin-right: 0.5em;
		justify-content: left;
	}

	.favoritePlayer {
		font-size: 2.8em;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(5%);
		align-items: right;
		justify-content: right;
	}

	.modeRival {
		display: box;
		margin-right: auto;
		margin-left: auto;
		width: 600px;
	}

	.mode {
		font-size: 2.8em;
		align-items: left;
		display: inline-block;
		margin-right: 0.5em;
		justify-content: left;
	}

	.rival {
		font-size: 2.8em;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(5%);
		align-items: right;
		justify-content: right;
	}

	.rookieContact {
		display: box;
		margin-right: auto;
		margin-left: auto;
		width: 600px;
	}

	.rookieOrVets {
		font-size: 2.8em;
		align-items: left;
		display: inline-block;
		margin-right: 0.5em;
		justify-content: left;
	}

	.preferredContact {
		font-size: 2.8em;
		display: inline-block;
		position: absolute;
		left: 50%;
		transform: translateX(5%);
		align-items: right;
		justify-content: right;
	}
</style>

<div class="editor" >
	<div class="managerMenu">
		<Select style="width: 89%;" bind:value={managerDropdownValue} label="Manager " on:change="{() => managerDropdown = ''}" size="10" required>
			<!--<Option value="" />-->
			{#each managerList as manager}
				<Option value={manager}>{manager}</Option>
			{/each}
		</Select>
		{#if managerDropdownValue}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="{getAvatar(teamManagersData, managerDropdownValue)}" class="managerPhoto"/>
		{/if}
	</div>
	<div class="managerInfo">
		<Textfield style="width: 160%;" bind:value={managerNameValue} label="Manager Name"></Textfield>
	</div>
	<div class="location">
		<Textfield style="width: 160%;" bind:value={locationValue} label="Location"></Textfield>
	</div>
	<div class="bio">
		<Textfield style="width: 100%;" textarea input$maxlength={100} bind:value={bioValue} label="Biography">
			<CharacterCounter slot="internalCounter">0 / 100</CharacterCounter>
		</Textfield>
	</div>
	<div class="philosophy">
		<Textfield style="width: 100%;" textarea input$maxlength={100} bind:value={philosophyValue} label="Philosophy">
			<CharacterCounter slot="internalCounter">0 / 100</CharacterCounter>
		</Textfield>
	</div>
	<div class="favoriteTeam">
		<Textfield style="width: 160%;" bind:value={favoriteTeamValue} label="Favorite Team"></Textfield>
	</div>
	<div class="favoritePlayer">
		<Textfield style="width: 160%;" bind:value={favoritePlayerValue} label="Favorite Player"></Textfield>
	</div>
	<div class="modeRival">
		<div class="mode">
			<Select style="width: 145%;" bind:value={modeDropdownValue} label="Mode " on:change="{() => modeDropdown = ''}">
				<!--<Option value="" />-->
				{#each modeList as mode}
					<Option value={mode}>{mode}</Option>
				{/each}
			</Select>
		</div>
		<div class="rival">
			<Select style="width: 145%;" bind:value={rivalDropdownValue} label="Rival " on:change="{() => rivalDropdown = ''}" >
				<!--<Option value="" />-->
				{#each rivalList as rival}
					<Option value={rival}>{rival}</Option>
				{/each}
			</Select>
		</div>
	</div>
	<div class="valuePosition">
		<Textfield style="width: 100%;" bind:value={valuePositionValue} label="Value Position"></Textfield>
	</div>
	<div class="rookieContact">
		<div class="rookieOrVets">
			<Select style="width: 145%;" bind:value={rookieOrVetsDropdownValue} label="Rookie or Vets " on:change="{() => rookieOrVetsDropdown = ''}">
				<!--<Option value="" />-->
				{#each rookieOrVetsList as rookieOrVets}
					<Option value={rookieOrVets}>{rookieOrVets}</Option>
				{/each}
			</Select>
		</div>
			<div class="preferredContact">
			<Select  style="width: 145%;" bind:value={preferredContactDropdownValue} label="Preferred Contact " on:change="{() => preferredContactDropdown = ''}">
				<!--<Option value="" />-->
				{#each preferredContactList as preferredContact}
					<Option value={preferredContact}>{preferredContact}</Option>
				{/each}
			</Select>
		</div>
	</div>
	<div class="tradingScale">
		<Textfield style="width: 100%;" bind:value={tradingScaleValue} label="Trading Scale" disabled=true ></Textfield>
		<Slider style="width: 96%;"
		  bind:value={tradingScaleValue}
		  min={1}
		  max={10}
		  step={1}
		  discrete
		  input$aria-label="Discrete slider"
		/>
	</div>
	<div class="submitBtn">
		<Button variant="unelevated">
			<Label>Submit</Label>
		</Button>
	</div>
</div>