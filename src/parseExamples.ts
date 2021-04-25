import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import type {VocabularyTerm} from './activity_streams.js';
import {parse} from './parse.js';

// TODO delete this?
export const parseExamples = (examples: VocabularyTerm[], toId?: ToId): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		const tree: Tree = {
			type: 'Block',
			children: parse(JSON.stringify(example, null, '\t')),
		};
		children.push({
			type: 'Element',
			element: 'pre',
			children: [tree],
		});
	}
	return assignNodeIds({type: 'Block', children}, toId);
};