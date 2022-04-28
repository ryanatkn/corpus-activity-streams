<script lang="ts">
	import type {Tree} from './tree';
	import TreeView from '$lib/TreeView.svelte';

	export let tree: Tree;
</script>

<div class="example">
	<div>{'{'}</div>
	<TreeView {tree} />
	<div>}</div>
</div>

<style>
	.example {
		overflow: auto;
		background-color: var(--color_yellow_bg);
		color: var(--color_yellow_text);
		padding: 4px;
		margin: 10px 0;
		font-family: monospace, monospace; /* funky hack to prevent it from shrinking */
	}
	.example > :global(div:not(:first-child, :last-child)) {
		padding-left: 1em;
	}
</style>
