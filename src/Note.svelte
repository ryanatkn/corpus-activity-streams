<script lang="ts">
	import type {VocabularyItem} from './activity_streams.js';
	import Markup from './Markup.svelte';
	import {vocabularyNotes} from './activity_streams_notes.js';
	import {parseNotes, parseExamples} from './parse.js';
	import {examples} from './activity_streams_examples.js';

	export let item: VocabularyItem;

	$: itemNotes = vocabularyNotes[item.name];
	$: notesNode = parseNotes(itemNotes);
	$: examplesNode = parseExamples(examples[item.name]);
</script>

<Markup node={notesNode} />

{#if examplesNode}
	<Markup node={examplesNode} />
{/if}
