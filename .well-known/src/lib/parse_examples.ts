import {type Tree, assign_node_ids, type BlockTree} from '$lib/tree.js';
import type {VocabularyTerm} from '$lib/activity_streams.js';
import {parse} from '$lib/parse.js';

// TODO delete this?
export const parse_examples = (examples: VocabularyTerm[]): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		const tree: BlockTree = {type: 'Block', children: []};
		parse_example(tree, example);
		assign_node_ids(tree);
		children.push({
			type: 'Component',
			component: 'Example',
			props: {tree},
		});
	}
	return assign_node_ids({type: 'Block', children});
};

const parse_example = (tree: Tree, value: any): void => {
	const type = typeof value;
	if (value === null) {
		tree.children!.push({type: 'Text', content: 'null'});
	} else if (Array.isArray(value)) {
		tree.children!.push({type: 'Text', content: '['});
		for (const item of value) {
			const t: Tree = {
				type: 'Element',
				element: 'div',
				children: [],
			};
			parse_example(t, item);
			t.children!.push({type: 'Text', content: ','});
			tree.children!.push(t);
		}
		tree.children!.push({type: 'Text', content: ']'});
	} else if (type === 'object') {
		tree.children!.push({type: 'Text', content: '{'});
		for (const [k, v] of Object.entries(value)) {
			const t: Tree = {
				type: 'Element',
				element: 'div',
				children: [...parse('"' + k + '"'), {type: 'Text', content: ': '}],
			};
			parse_example(t, v);
			t.children!.push({type: 'Text', content: ','});
			tree.children!.push(t);
		}
		tree.children!.push({type: 'Text', content: '}'});
	} else if (type === 'string') {
		tree.children!.push(...parse('"' + value + '"'));
	} else if (type === 'boolean' || type === 'number') {
		tree.children!.push(...parse(value + ''));
	}
};
