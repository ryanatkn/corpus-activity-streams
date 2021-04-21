<script lang="ts">
	import type {VocabularyItem, VocabularyTerm} from './activity_streams.js';
	import Markup from './Markup.svelte';
	import EntityLink from './EntityLink.svelte';
	import JsonView from './JsonView.svelte';
	import {vocabulary} from './vocabulary.js';
	import {vocabularyNotes} from './activity_streams_notes.js';
	import {examples} from './activity_streams_examples.js';
	import type {MarkupNode} from './markup.js';
	import {assignNodeIds} from './markup.js';

	export let item: VocabularyItem;

	// TODO refactor
	const parseMarkup = (content: string): MarkupNode => {
		if (content in vocabulary.byName) {
			return {
				type: 'Component',
				component: EntityLink,
				props: {name: content},
			};
		}
		return {type: 'Html', content};
	};

	export const processNotes = (notes: string): MarkupNode => {
		const node: MarkupNode = assignNodeIds({
			type: 'Block',
			children: notes.split(/`(.+?)`/g).map((str) => parseMarkup(str)),
		});
		return node;
	};

	export const processExamples = (examples: VocabularyTerm[]): MarkupNode | null => {
		if (!examples) return null;
		const children: MarkupNode[] = [];
		for (const example of examples) {
			// TODO can this be flattened?
			const node: MarkupNode = {
				type: 'Block',
				children: JSON.stringify(example, null, 2)
					.split(/  "(.+?)": /g)
					.map((str) => parseMarkup(str)),
			};
			children.push({
				// TODO consider type `Tag` and `pre` w/o the component wrapper
				type: 'Component',
				component: JsonView,
				props: {node: assignNodeIds(node)}, // TODO assigning b/c not real children
				// children: [node] // TODO hmm?
			});
		}
		return assignNodeIds({type: 'Block', children});
	};

	$: itemNotes = vocabularyNotes[item.name];
	$: notesNode = processNotes(itemNotes);
	$: examplesNode = processExamples(examples[item.name]);
</script>

<Markup node={notesNode} />

{#if examplesNode}
	<Markup node={examplesNode} />
{/if}
