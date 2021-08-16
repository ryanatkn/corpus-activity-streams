<script lang="ts">
	import type {VocabularyItem} from 'src/activity_streams.js';
	import Markup from 'src/Markup.svelte';
	import {parse} from 'src/parse.js';
	import {parse_examples} from 'src/parse_examples.js';
	import activity_streams_notes from 'src/activity_streams_notes.json';
	import activity_streams_examples from 'src/activity_streams_examples.json';

	export let item: VocabularyItem;

	$: notes_tree = parse(activity_streams_notes.notes[item.name]);
	$: examples_tree = parse_examples(activity_streams_examples.examples[item.name]);
</script>

{#each notes_tree as tree (tree.id)}
	<Markup {tree} />
{/each}
{#if examples_tree}
	<Markup tree={examples_tree} />
{/if}
