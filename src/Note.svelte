<script lang="ts">
	import type {Vocabulary_Item} from 'src/activity_streams.js';
	import Markup from 'src/Markup.svelte';
	import {notes} from 'src/activity_streams_notes.js';
	import {parse} from 'src/parse.js';
	import {parse_examples} from 'src/parse_examples.js';
	import {examples} from 'src/activity_streams_examples.js';

	export let item: Vocabulary_Item;

	$: item_notes = notes[item.name];
	$: notes_tree = parse(item_notes);
	$: examples_tree = parse_examples(examples[item.name]);
</script>

{#each notes_tree as tree (tree.id)}
	<Markup {tree} />
{/each}
{#if examples_tree}
	<Markup tree={examples_tree} />
{/if}
