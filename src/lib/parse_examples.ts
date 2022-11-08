import {type Tree, assign_node_ids, type BlockTree} from '$lib/tree';
import type {VocabularyTerm} from '$lib/activity_streams';
import {parse} from '$lib/parse';

// TODO delete this?
export const parse_examples = (examples: VocabularyTerm[]): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		const tree: BlockTree = {type: 'Block', children: []};
		for (const [key, value] of Object.entries(example)) {
			tree.children!.push({
				type: 'Element',
				element: 'div',
				children: [
					...parse('"' + key + '"'),
					{type: 'Text', content: ': '},
					...parse(typeof value === 'object' ? JSON.stringify(value) : '"' + value + '"'),
					{type: 'Text', content: ','},
				],
			});
		}
		assign_node_ids(tree);
		children.push({
			type: 'Component',
			component: 'Example',
			props: {tree},
		});
	}
	return assign_node_ids({type: 'Block', children});
};
