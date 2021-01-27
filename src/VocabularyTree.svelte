<script>
	import TreeList from './TreeList.svelte';
	window.hack = ('TreeList', TreeList);
	export let vocabulary;
</script>

<div class="vocabulary-tree">
	<TreeList tree={vocabulary.typesTreeRoot} getChildren={(x) => x.extendedBy} />
</div>

<style>
	.vocabulary-tree {
		padding-top: 30px;
	}
</style>
