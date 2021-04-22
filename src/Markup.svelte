<script lang="ts">
	import {useComponents} from './components.js';
	import type {MarkupNode} from './markup.js';

	// import EntityLink from './EntityLink.svelte';
	export let node: MarkupNode;
	// TODO maybe rename `MarkupView`?
	// This currently renders nodes generically based on the available properties,
	// with no regard for the type or if the combination of properties makes sense.
	// We may need to change this strategy in the future to support certain features.

	const components = useComponents();
</script>

<!-- this code is horrific because 1) whitespace behavior and 2) intentional lack of abstraction -->

{#if node.type === 'Text'}{node.content}{:else if node.type === 'Html'}{@html node.content}{:else if node.type === 'Component'}<svelte:component
		this={components[node.component]}
		{...node.props}
	/>{:else if node.type === 'Frame'}<div class="markup-Frame">
		{node.content}
	</div>{/if}{#if node.children}{#if node.type === 'Element'}{#if node.element === 'pre'}<pre>{#each node.children as child (child.id)}<svelte:self
			node={child}
		/>{/each}</pre>{:else if node.element === 'code'}<code
				>{#each node.children as child (child.id)}<svelte:self node={child} />{/each}</code
			>{:else}<div>
				<!-- TODO warn that it's unknown? -->{#each node.children as child (child.id)}<svelte:self
						node={child}
					/>{/each}
			</div>{/if}{:else}{#each node.children as child (child.id)}<svelte:self
				node={child}
			/>{/each}{/if}{/if}

<style>
	.markup-Frame {
		border: 1px solid #ddd;
		padding: 10px;
	}
</style>
