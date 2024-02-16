<script lang="ts">
	import type {Tree} from '$lib/tree.js';
	import TreeView from '$lib/TreeView.svelte';

	export let tree: Tree;
</script>

<div class="example">
	<TreeView {tree} />
</div>

<style>
	.example {
		overflow: auto;
		background-color: var(--color_yellow_bg);
		color: var(--color_yellow_text);
		padding: 4px;
		margin: 10px 0;
		font-family: monospace, monospace; /* funky hack to prevent it from shrinking */
		white-space: nowrap;
	}
	.example > :global(div) {
		padding-left: 1em;
	}
	.example > :global(div > div) {
		padding-left: 1em;
	}
	.example > :global(div > div > div) {
		padding-left: 1em;
	}
</style>
