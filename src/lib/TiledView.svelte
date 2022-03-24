<script lang="ts">
	import VocabularyDetails from '$lib/VocabularyDetails.svelte';
	import VocabularyTree from '$lib/VocabularyTree.svelte';
	import VocabularyGroups from '$lib/VocabularyGroups.svelte';
	import type {Vocabulary} from '$lib/vocabulary';

	export let vocabulary: Vocabulary;
</script>

<div class="tiled-view">
	<div class="tile">
		<VocabularyTree {vocabulary} />
	</div>
	<div class="tile">
		<VocabularyDetails {vocabulary} />
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
