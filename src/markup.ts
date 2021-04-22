/*


```ts
const node: MarkupNode = [
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

export interface BaseMarkupNode<TChildren extends BaseMarkupNode = BaseMarkupNode<any>> {
	type: string;
	id?: string;
	// optional properties that any node type can have - trying to stick close to Activity Streams
	children?: TChildren[];
	content?: string;
}

export type MarkupNode =
	| MarkupBlockNode
	| MarkupTextNode
	| MarkupHtmlNode
	| MarkupElementNode
	| MarkupComponentNode
	| MarkupFrameNode;

export interface MarkupBlockNode extends BaseMarkupNode<MarkupNode> {
	type: 'Block';
}

export interface MarkupTextNode extends BaseMarkupNode<MarkupNode> {
	type: 'Text';
	content: string;
}

export interface MarkupHtmlNode extends BaseMarkupNode<MarkupNode> {
	type: 'Html';
	content: string;
}

export interface MarkupElementNode extends BaseMarkupNode<MarkupNode> {
	type: 'Element';
	element: 'pre' | 'code';
}

// TODO or `MarkupViewNode` ?
export interface MarkupComponentNode extends BaseMarkupNode<MarkupNode> {
	type: 'Component';
	component: string; // TODO type? `ComponentName` or `ComponentId` ?
	props: {[key: string]: any}; // TODO type
}

export interface MarkupFrameNode extends BaseMarkupNode<MarkupNode> {
	type: 'Frame';
	model: string; // TODO id type
	view: string; // TODO id type
	// so are `children` mounted inside the view? or does a frame have no children?
	// so wait are the children in the model? yeah im confused
}

// TODO "traverse"?
export const forEachNode = (node: MarkupNode, cb: (node: MarkupNode) => void): void => {
	cb(node);
	if (node.children) {
		for (const child of node.children) forEachNode(child, cb);
	}
};

export interface ToId {
	(): string;
}

export interface ToToId {
	(i?: number): ToId;
}

export const assignNodeIds = <T extends MarkupNode>(node: T, toId: ToId = toToId()): T => {
	forEachNode(node, (node) => {
		node.id = toId(); // TODO ? path? what if we passed in the parent so we could do /1/3/2/2?
	});
	return node;
};

// TODO import random utils from `felt`
// TODO `uid` probably
export const toToId: ToToId = (i = Number(Math.random().toString().substring(7))) => {
	return () => `node${i++}`;
};
// this name lol ask luke
export const toToDeterministicId: ToToId = () => toToId(0);
