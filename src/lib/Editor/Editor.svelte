<script>
	import { goto } from "$app/navigation";
	import { getTeamData, getAvatar, getAllManagerNames } from "$lib/utils/helperFunctions/universalFunctions";
    import Button, { Label } from '@smui/button';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Slider from '@smui/slider';

    export let leagueTeamManagers;

    const users = Object.keys(leagueTeamManagers.users);

    $: managerList = users.filter(u => u !== rivalDropdownValue);
	$: managerDropdown = '';
	$: managerDropdownValue = '';
    $: managerNameValue = '';
	$: locationValue = '';
	$: bioValue = '';
	$: favoriteTeamValue = '';
	$: modeList = ['Win Now', 'Dynasty', 'Rebuild'];
	$: modeDropdown = '';
	$: modeDropdownValue = '';
	$: rivalList = users.filter(u => u !== managerDropdownValue);
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

	const removeRival = ()  => {
		rivalList = rivalList.splice(managerDropdownValue);
	}
</script>

<style>
	.editor {
        align-items: left;
        max-width: 900px;
        margin: 3em auto 2em;
	}

	.managerMenu {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.managerPhoto {
		/*display: inline-block;*/
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid;
        transform: translate(0%, 25%);
        top: 50%;
        background-color: var(--fff);
    }

	.managerInfo {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.location {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.bio {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-repeat: no-repeat;
        text-align: center;
        color: var(--g000);
	}

	.philosophy {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-repeat: no-repeat;
        text-align: center;
        color: var(--g000);
	}

	.favoriteTeam {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-repeat: no-repeat;
        text-align: center;
        color: var(--g000);
	}

	.favoritePlayer {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.mode {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.rival {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}
	
	.valuePosition {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.rookieOrVets {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.preferredContact {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.tradingScale {
		padding: 0.5em 2em;
        font-size: 1.2em;
        border-radius: 6px;
        background-color: var(--fff);
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        text-align: center;
        color: var(--g000);
	}

	.submitBtn {
        align-items: left;
        max-width: 900px;
        margin: 3em auto 2em;
		padding-bottom: 5em;
	}
</style>

<div class="editor" >
	<div class="managerMenu">
		<Select style="width: 92%;" class="selectManager" label="Manager" id="managerOne" name="managerOne" bind:value={managerDropdownValue}>
			<!--<Option value="" />-->
			{#each managerList as manager}
				<Option value={manager}>{leagueTeamManagers.users[manager].display_name}</Option>
			{/each}
		</Select>
		{#if managerDropdownValue}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src="{getTeamData(leagueTeamManagers.users, managerDropdownValue).avatar}" class="managerPhoto"/>
		{/if}
	</div>
	<div class="managerInfo">
		<Textfield style="width: 100%;" bind:value={managerNameValue} label="Manager Name"></Textfield>
	</div>
	<div class="location">
		<Textfield style="width: 100%;" bind:value={locationValue} label="Location"></Textfield>
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
		<Textfield style="width: 100%;" bind:value={favoriteTeamValue} label="Favorite Team"></Textfield>
	</div>
	<div class="favoritePlayer">
		<Textfield style="width: 100%;" bind:value={favoritePlayerValue} label="Favorite Player"></Textfield>
	</div>
	<div class="mode">
		<Select style="width: 100%;" bind:value={modeDropdownValue} label="Mode " on:change="{() => modeDropdown = ''}">
			<!--<Option value="" />-->
			{#each modeList as mode}
				<Option value={mode}>{mode}</Option>
			{/each}
		</Select>
	</div>
	<div class="rival">
		<Select style="width: 100%;" bind:value={rivalDropdownValue} label="Rival " on:change="{() => rivalDropdown = ''}" >
			<!--<Option value="" />-->
			{#each rivalList as rival}
				<Option value={rival}>{leagueTeamManagers.users[rival].display_name}</Option>
			{/each}
		</Select>
	</div>
	<div class="valuePosition">
		<Textfield style="width: 100%;" bind:value={valuePositionValue} label="Value Position"></Textfield>
	</div>
	<div class="rookieOrVets">
		<Select style="width: 100%;" bind:value={rookieOrVetsDropdownValue} label="Rookie or Vets " on:change="{() => rookieOrVetsDropdown = ''}">
			<!--<Option value="" />-->
			{#each rookieOrVetsList as rookieOrVets}
				<Option value={rookieOrVets}>{rookieOrVets}</Option>
			{/each}
		</Select>
	</div>
		<div class="preferredContact">
		<Select style="width: 100%;" bind:value={preferredContactDropdownValue} label="Preferred Contact " on:change="{() => preferredContactDropdown = ''}">
			<!--<Option value="" />-->
			{#each preferredContactList as preferredContact}
				<Option value={preferredContact}>{preferredContact}</Option>
			{/each}
		</Select>
	</div>
	<div class="tradingScale">
		<Textfield style="width: 100%;" bind:value={tradingScaleValue} label="Trading Scale" disabled=true ></Textfield>
		<Slider
		  bind:value={tradingScaleValue}
		  min={1}
		  max={10}
		  step={1}
		  discrete
		  input$aria-label="Discrete slider"
		/>
	</div>
</div>
<div class="submitBtn">
	<Button variant="unelevated">
		<Label>Submit</Label>
	</Button>
</div>