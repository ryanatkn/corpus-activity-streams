import type {Tree, ToId} from 'src/tree.js';
import {assign_node_ids} from 'src/tree.js';
import type {VocabularyTerm} from 'src/activity_streams.js';
import {parse} from 'src/parse.js';

// TODO delete this?
export const parse_examples = (examples: VocabularyTerm[], to_id?: ToId): Tree | null => {
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
	return assign_node_ids({type: 'Block', children}, to_id);
};
