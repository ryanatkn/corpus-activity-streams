<script lang="ts">
	import {get_components} from '$lib/components';
	import type {Tree} from '$lib/tree';

	// `<Markup />` renders a `Tree` AST

	// TODO maybe rename `MarkupView`?

	export let tree: Tree;

	const components = get_components(); // TODO is this the pattern we want?
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
	/>{:else if tree.type === 'Frame'}<div class="frame">
		{tree.content}
	</div>{/if}{#if tree.children}{#if tree.type === 'Element'}{#if tree.element === 'pre'}<div
				class="pre-wrapper"
			>
				<pre>{#each tree.children as child (child.id)}<svelte:self tree={child} />{/each}</pre>
			</div>{:else if tree.element === 'code'}<code
				>{#each tree.children as child (child.id)}<svelte:self tree={child} />{/each}</code
			>{:else}<div>
				{#each tree.children as child (child.id)}<svelte:self tree={child} />{/each}
			</div>{/if}{:else}{#each tree.children as child (child.id)}<svelte:self
				tree={child}
			/>{/each}{/if}{/if}

<style>
	.frame {
		border: 1px solid #ddd;
		padding: 10px;
	}
	.pre-wrapper {
		display: flex;
	}
</style>
