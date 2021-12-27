<script lang="ts">
	import TreeList from '$lib/TreeList.svelte';
	import {type Vocabulary} from '$lib/vocabulary';
	import {type VocabularyType} from '$lib/activity_streams';

	export let vocabulary: Vocabulary;

	// TODO refactor with cached values
	const get_children = (item: VocabularyType): VocabularyType[] => {
		return item.extended_by?.map((name) => vocabulary.by_name[name]) || [];
	};
</script>

<div class="vocabulary-tree">
	<TreeList tree={vocabulary.types_tree_root} {get_children} />
</div>

<style>
	.vocabulary-tree {
		padding-top: 30px;
	}
</style>
