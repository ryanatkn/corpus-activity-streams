/*

```ts
const tree: Tree = [
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
	// optional properties that any tree type can have - trying to stick close to Activity Streams
	children?: TChildren[];
	content?: string;
}

export type Tree = BlockTree | TextTree | HtmlTree | ElementTree | ComponentTree | FrameTree;

export interface BlockTree extends BaseTree<Tree> {
	type: 'Block';
}

export interface TextTree extends BaseTree<Tree> {
	type: 'Text';
	content: string;
}

export interface HtmlTree extends BaseTree<Tree> {
	type: 'Html';
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
export const forEachNode = (tree: Tree, cb: (tree: Tree) => void): void => {
	cb(tree);
	if (tree.children) {
		for (const child of tree.children) forEachNode(child, cb);
	}
};

export interface ToId {
	(): string;
}

export interface ToToId {
	(i?: number): ToId;
}

export const assignNodeIds = <T extends Tree>(tree: T, toId: ToId = toToId()): T => {
	forEachNode(tree, (tree) => {
		tree.id = toId(); // TODO ? path? what if we passed in the parent so we could do /1/3/2/2?
	});
	return tree;
};

// TODO import random utils from `felt` using `uid` probably
export const toToId: ToToId = (i = Number(Math.random().toString().substring(7))) => () =>
	`tree${i++}`;
// this name lol ask luke
export const toToDeterministicId: ToToId = () => toToId(0);
