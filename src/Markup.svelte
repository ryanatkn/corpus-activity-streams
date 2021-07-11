<script lang="ts">
	import {useComponents} from 'src/components.js';
	import type {Tree} from 'src/tree.js';

	// `<Markup />` renders a `Tree` AST

	// TODO maybe rename `MarkupView`?

	export let tree: Tree;

	const components = useComponents(); // TODO is this the pattern we want?
</script>

<!--
	this code is horrific because
	1) whitespace behavior and
	2) intentional lack of abstraction.
	also, surely it can be improved in various ways
-->

{#if tree.type === 'Text'}{tree.content}{:else if tree.type === 'Component'}<svelte:component
		this={components[tree.component]}
		{...tree.props}
	/>{:else if tree.type === 'Frame'}<div class="markup-Frame">
		{tree.content}
	</div>{/if}{#if tree.children}{#if tree.type === 'Element'}{#if tree.element === 'pre'}<pre>{#each tree.children as child (child.id)}<svelte:self
			tree={child}
		/>{/each}</pre>{:else if tree.element === 'code'}<code
				>{#each tree.children as child (child.id)}<svelte:self tree={child} />{/each}</code
			>{:else}<div>
				<!-- TODO warn that it's unknown? -->{#each tree.children as child (child.id)}<svelte:self
						tree={child}
					/>{/each}
			</div>{/if}{:else}{#each tree.children as child (child.id)}<svelte:self
				tree={child}
			/>{/each}{/if}{/if}

<style>
	.markup-Frame {
		border: 1px solid #ddd;
		padding: 10px;
	}
</style>
