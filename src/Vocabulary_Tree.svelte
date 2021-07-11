<script lang="ts">
	import Tree_List from 'src/Tree_List.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';
	import type {Vocabulary_Type} from 'src/activity_streams';

	export let vocabulary: Vocabulary;

	// TODO refactor with cached values
	const get_children = (item: Vocabulary_Type): Vocabulary_Type[] => {
		return item.extended_by?.map((name) => vocabulary.by_name[name]) || [];
	};
</script>

<div class="vocabulary-tree">
	<Tree_List tree={vocabulary.types_tree_root} {get_children} />
</div>

<style>
	.vocabulary-tree {
		padding-top: 30px;
	}
</style>
