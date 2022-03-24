import {type Tree, type ToId, assign_node_ids} from '$lib/tree';
import type {VocabularyTerm} from '$lib/activity_streams';
import {parse} from '$lib/parse';

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
