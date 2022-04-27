<script lang="ts">
	import type {VocabularyItem} from '$lib/activity_streams';
	import Markup from '$lib/Markup.svelte';
	import {parse} from '$lib/parse';
	import {parse_examples} from '$lib/parse_examples';
	import activity_streams_notes from '$lib/activity_streams_notes.json';
	import activity_streams_examples from '$lib/activity_streams_examples.json';

	export let item: VocabularyItem;

	$: notes_tree = parse(activity_streams_notes.notes[item.name]);
	$: examples_tree = parse_examples(activity_streams_examples.examples[item.name]);
</script>

{#each notes_tree as tree (tree.id)}<Markup {tree} />{/each}{#if examples_tree}<Markup
		tree={examples_tree}
	/>{/if}
