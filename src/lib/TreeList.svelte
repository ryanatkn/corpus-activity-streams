<script lang="ts">
	import ItemLink from '$lib/ItemLink.svelte';
	import {slide} from 'svelte/transition';
	import {swallow} from '@feltjs/util/dom.js';
	import type {VocabularyType} from '$lib/activity_streams';

	export let tree: VocabularyType;
	export let get_children: (item: VocabularyType) => VocabularyType[];
	export let depth = 0;

	let show_children = true;
	const toggle_show_children = (e: MouseEvent) => {
		swallow(e);
		show_children = !show_children;
	};

	$: children = get_children(tree);
	$: clickable = !!children.length;
</script>

<div class="tree" class:root={depth === 0} class:clickable>
	<div class="content">
		{#if clickable}
			<button class="icon" on:click={clickable ? toggle_show_children : undefined}>
				{#if show_children}
					–
				{:else}
					+
				{/if}
			</button>
		{:else}
			<span class="icon"> ∙ </span>
		{/if}
		<ItemLink item={tree} />
		{#if tree.properties}
			{#each tree.properties as property (property)}
				<ItemLink name={property} />
			{/each}
		{/if}
	</div>
	{#if children && show_children}
		<div class="children" transition:slide={{duration: 137}}>
			{#each children as child (child)}
				<svelte:self tree={child} depth={depth + 1} {get_children} />
			{/each}
		</div>
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
		flex-wrap: wrap;
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
