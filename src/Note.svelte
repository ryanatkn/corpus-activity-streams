<script lang="ts">
	import type {VocabularyItem} from 'src/activity_streams.js';
	import Markup from 'src/Markup.svelte';
	import {notes} from 'src/activity_streams_notes.js';
	import {parse} from 'src/parse.js';
	import {parseExamples} from 'src/parseExamples.js';
	import {examples} from 'src/activity_streams_examples.js';

	export let item: VocabularyItem;

	$: itemNotes = notes[item.name];
	$: notesTree = parse(itemNotes);
	$: examplesTree = parseExamples(examples[item.name]);
</script>

{#each notesTree as tree (tree.id)}
	<Markup {tree} />
{/each}
{#if examplesTree}
	<Markup tree={examplesTree} />
{/if}
