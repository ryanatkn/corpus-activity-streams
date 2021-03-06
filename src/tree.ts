/*

```ts
const tree: Tree[] = [
	{type: 'Text', content: 'hey~!'},
	{
		type: 'Block',
		children: [
			{type: 'Text', content: 'check it out, a language!'},
			{type: 'Text', content: 'wow'},
		],
	},
];
```

*/

export interface Base_Tree<T_Children extends Base_Tree = Base_Tree<any>> {
	type: string;
	id?: string;
	// optional properties that any tree type can have - trying to stick close to Activity Streams
	children?: T_Children[];
	content?: string;
}

export type Tree = Block_Tree | Text_Tree | Element_Tree | Component_Tree | Frame_Tree;

export interface Block_Tree extends Base_Tree<Tree> {
	type: 'Block';
}

export interface Text_Tree extends Base_Tree<Tree> {
	type: 'Text';
	content: string;
}

export interface Element_Tree extends Base_Tree<Tree> {
	type: 'Element';
	element: 'pre' | 'code';
}

// TODO or `Markup_View_Node` ?
export interface Component_Tree extends Base_Tree<Tree> {
	type: 'Component';
	component: string; // TODO type? `Component_Name` or `Component_Id` ?
	props: {[key: string]: any}; // TODO type
}

export interface Frame_Tree extends Base_Tree<Tree> {
	type: 'Frame';
	model: string; // TODO id type
	view: string; // TODO id type
	// so are `children` mounted inside the view? or does a frame have no children?
	// so wait are the children in the model? yeah im confused
}

// TODO "traverse"?
export const for_each_node = (tree: Tree, cb: (tree: Tree) => void): void => {
	cb(tree);
	if (tree.children) {
		for (const child of tree.children) for_each_node(child, cb);
	}
};

export interface To_Id {
	(): string;
}

export interface To_To_Id {
	(i?: number): To_Id;
}

export const assign_node_ids = <T extends Tree>(tree: T, to_id: To_Id = to_to_id()): T => {
	for_each_node(tree, (tree) => {
		tree.id = to_id(); // TODO ? path? what if we passed in the parent so we could do /1/3/2/2?
	});
	return tree;
};

// TODO import random utils from `felt` using `uid` probably
export const to_to_id: To_To_Id =
	(i = Number(Math.random().toString().substring(7))) =>
	() =>
		`tree${i++}`;
export const to_to_deterministic_id: To_To_Id = () => to_to_id(0);
