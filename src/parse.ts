import type {MarkupNode, ToId} from './markup.js';
import {assignNodeIds} from './markup.js';
import {vocabulary, parseVocabulary} from './vocabulary.js';
import JsonView from './JsonView.svelte';
import type {VocabularyTerm} from './activity_streams.js';

// TODO this should only be one function, `parse`

export const parseExamples = (examples: VocabularyTerm[], toId?: ToId): MarkupNode | null => {
	if (!examples) return null;
	const children: MarkupNode[] = [];
	for (const example of examples) {
		// TODO can this be flattened?
		const node: MarkupNode = {
			type: 'Block',
			children: JSON.stringify(example, null, 2)
				.split(/  "(.+?)": /g)
				.map((str) => ({
					type: 'Block',
					children:
						str in vocabulary.byName
							? [{type: 'Text', content: '\t'}, parseVocabulary(str), {type: 'Text', content: ': '}]
							: [{type: 'Html', content: str}],
				})),
		};
		children.push({
			// TODO consider type \`Tag\` and \`pre\` w/o the component wrapper
			type: 'Component',
			component: JsonView,
			props: {node: assignNodeIds(node, toId)}, // TODO assigning b/c not real children
			// children: [node] // TODO hmm?
		});
	}
	return assignNodeIds({type: 'Block', children}, toId);
};
// TODO unify with above
export const parseNotes = (notes: string, toId?: ToId): MarkupNode => {
	const node: MarkupNode = assignNodeIds(
		{
			type: 'Block',
			children: notes.split(/`(.+?)`/g).map((str) => parseVocabulary(str)),
		},
		toId,
	);
	return node;
};
