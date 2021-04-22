<script lang="ts">
	import type {MarkupNode} from './markup.js';
	// import EntityLink from './EntityLink.svelte';
	export let node: MarkupNode;
	// TODO maybe rename `MarkupView`?
	// This currently renders nodes generically based on the available properties,
	// with no regard for the type or if the combination of properties makes sense.
	// We may need to change this strategy in the future to support certain features.
</script>

{#if node.type === 'Text'}{node.content}{:else if node.type === 'Html'}{@html node.content}{:else if node.type === 'Component'}<svelte:component
		this={node.component}
		{...node.props}
	/>{:else if node.type === 'Frame'}<div class="markup-Frame">
		{node.content}
	</div>{/if}{#if node.children}{#each node.children as child (child.id)}<svelte:self
			node={child}
		/>{/each}{/if}

<style>
	.markup-Frame {
		border: 1px solid #ddd;
		padding: 10px;
	}
</style>
