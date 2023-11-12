<script lang="ts">
	import type {VocabularyItem} from '$lib/activity_streams';
	import TreeView from '$lib/TreeView.svelte';
	import {parse} from '$lib/parse';
	import {parse_examples} from '$lib/parse_examples';
	import activity_streams_summaries from '$lib/activity_streams_summaries.json';
	import activity_streams_examples from '$lib/activity_streams_examples.json';

	export let item: VocabularyItem;

	$: summaries_tree = parse(activity_streams_summaries.summaries[item.name]);
	$: examples_tree = parse_examples(activity_streams_examples.examples[item.name]);
</script>

{#each summaries_tree as tree (tree.id)}<TreeView {tree} />{/each}{#if examples_tree}<TreeView
		tree={examples_tree}
	/>{/if}
