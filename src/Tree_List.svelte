<script lang="ts">
	import Entity_Link from 'src/Entity_Link.svelte';
	import {slide} from 'svelte/transition';
	import type {Vocabulary_Type} from 'src/activity_streams.js';

	export let tree: Vocabulary_Type;
	export let get_children: (item: Vocabulary_Type) => Vocabulary_Type[];
	export let depth = 0;

	let show_children = true;
	const toggle_show_children = (e: MouseEvent) => {
		// If `preventDefault` and `stopPropagation` are put on the event handler as modifiers,
		// it results in undesired UX, because we want to conditionally add the click handler and behavior.
		// We solve this problem with `get_children` above, which also seems like a hack.
		e.preventDefault();
		e.stopPropagation();
		show_children = !show_children;
	};

	$: children = get_children(tree);
	$: clickable = !!children;
</script>

<div class="tree" class:root={depth === 0} class:clickable transition:slide={{duration: 137}}>
	<div class="content">
		{#if clickable}
			<button class="icon" on:click={clickable ? toggle_show_children : undefined}>
				{#if show_children}
					{#if children}–{:else}∙{/if}
				{:else}+{/if}
			</button>
		{:else}<span class="icon">∙</span>{/if}

		<!-- TODO this is a hack, attempts at recursive slots failed	 -->
		<Entity_Link entity={tree} />
		{#if tree.properties}
			{#each tree.properties as property (property)}
				<Entity_Link name={property} />
			{/each}
		{/if}
	</div>
	{#if children && show_children}
		{#each children as child (child)}
			<svelte:self tree={child} depth={depth + 1} {get_children} />
		{/each}
	{/if}
</div>

<style>
	.tree {
		border: 1px solid transparent;
		white-space: nowrap;
		padding-left: 30px;
	}
	.tree.clickable:hover {
		border-color: rgba(10, 3, 4, 0.38);
		border-style: dashed;
	}
	.root {
		padding-left: 0;
	}
	.tree.clickable:active {
		/* sadly I don't know how to make this NOT bubble without resorting to scripts,
		so it oddly affects ancestor branches. */
		border-color: rgba(10, 3, 4, 0.62);
		border-style: dotted;
	}
	.content {
		display: flex;
		align-items: center;
	}
	.icon {
		display: inline-block;
		flex-shrink: 0;
		width: 30px;
		text-align: center;
		font-size: 20px;
		line-height: 22px;
		height: 22px;
		padding: 0;
		margin: 0;
		background: none;
		border: none;
	}
	button:hover {
		background: #f0f0f0;
	}
	button:active {
		background: #d9d9d9;
	}
</style>
