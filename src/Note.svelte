<script lang="ts">
	import type {VocabularyItem} from './activity_streams.js';
	import Markup from './Markup.svelte';
	import {vocabularyNotes} from './activity_streams_notes.js';
	import {parse, parseExamples} from './parse.js';
	import {examples} from './activity_streams_examples.js';

	export let item: VocabularyItem;

	$: itemNotes = vocabularyNotes[item.name];
	$: notesTree = parse(itemNotes);
	$: examplesTree = parseExamples(examples[item.name]);
</script>

<Markup tree={notesTree} />

{#if examplesTree}
	<Markup tree={examplesTree} />
{/if}
