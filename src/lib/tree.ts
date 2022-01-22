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

export interface BaseTree<TChildren extends BaseTree = BaseTree<any>> {
	type: string;
	id?: string;
	// optional properties that any tree type can have - trying to stick close to ActivityStreams
	children?: TChildren[];
	content?: string;
}

export type Tree = BlockTree | TextTree | ElementTree | ComponentTree | FrameTree;

export interface BlockTree extends BaseTree<Tree> {
	type: 'Block';
}

export interface TextTree extends BaseTree<Tree> {
	type: 'Text';
	content: string;
}

export interface ElementTree extends BaseTree<Tree> {
	type: 'Element';
	element: 'pre' | 'code';
}

// TODO or `MarkupViewNode` ?
export interface ComponentTree extends BaseTree<Tree> {
	type: 'Component';
	component: string; // TODO type? `ComponentName` or `ComponentId` ?
	props: {[key: string]: any}; // TODO type
}

export interface FrameTree extends BaseTree<Tree> {
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

export interface ToId {
	(): string;
}

export interface ToToId {
	(i?: number): ToId;
}

export const assign_node_ids = <T extends Tree>(tree: T, to_id: ToId = to_to_id()): T => {
	for_each_node(tree, (tree) => {
		tree.id = to_id(); // TODO ? path? what if we passed in the parent so we could do /1/3/2/2?
	});
	return tree;
};

// TODO import random utils from `felt` using `uid` probably
export const to_to_id: ToToId =
	(i = Number(Math.random().toString().substring(7))) =>
	() =>
		`tree${i++}`;
export const to_to_deterministic_id: ToToId = () => to_to_id(0);
