<script>
	import VocabularyTypeTable from './VocabularyTypeTable.svelte';
	import VocabularyPropertyTable from './VocabularyPropertyTable.svelte';
	import VocabularyDetails from './VocabularyDetails.svelte';
	import VocabularyTree from './VocabularyTree.svelte';
	import VocabularyGroups from './VocabularyGroups.svelte';

	window.hack = ('VocabularyTypeTable', VocabularyTypeTable);
	window.hack = ('VocabularyPropertyTable', VocabularyPropertyTable);
	window.hack = ('VocabularyDetails', VocabularyDetails);
	window.hack = ('VocabularyTree', VocabularyTree);
	window.hack = ('VocabularyGroups', VocabularyGroups);

	export let vocabulary;
</script>

<div class="tiled-view">
	<div class="tile">
		<VocabularyTypeTable {vocabulary} />
	</div>
	<div class="tile">
		<VocabularyPropertyTable {vocabulary} />
	</div>
	<div class="tile">
		<VocabularyDetails {vocabulary} />
	</div>
	<div class="tile">
		<VocabularyTree {vocabulary} />
	</div>
	<div class="tile">
		<VocabularyGroups {vocabulary} />
	</div>
</div>

<style>
	.tiled-view {
		display: flex;
		height: 100%;
	}
	.tile {
		flex: 1;
		padding: 0 10px;
		overflow: auto;
	}
</style>
