<script lang="ts">
	import TreeList from 'src/TreeList.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';
	import type {VocabularyType} from 'src/activity_streams';

	export let vocabulary: Vocabulary;

	// TODO refactor with cached values
	const getChildren = (item: VocabularyType): VocabularyType[] => {
		return item.extendedBy?.map((name) => vocabulary.byName[name]) || [];
	};
</script>

<div class="vocabulary-tree">
	<TreeList tree={vocabulary.typesTreeRoot} {getChildren} />
</div>

<style>
	.vocabulary-tree {
		padding-top: 30px;
	}
</style>
