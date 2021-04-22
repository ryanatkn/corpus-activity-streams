import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {parseNotes} from './parse.js';
import {assignNodeIds, toDeterministicToId} from './markup.js';
import type {MarkupNode} from './markup.js';

const normalize = (node: MarkupNode) => assignNodeIds(node, toDeterministicToId());

/* test_parse */
const test_parse = suite('parse');

// test_parse('parseExamples', () => {
// 	t.is(parseExamples('foo.task.ts'), 'foo');
// });

test_parse('parseNotes', () => {
	t.equal(
		normalize(parseNotes('The `Entity` is the base of all of types.')),
		normalize({
			type: 'Block',
			children: [
				{type: 'Html', content: 'The ', id: 'node1'},
				{type: 'Component', component: 'EntityLink', props: {name: 'Entity'}, id: 'node2'},
				{type: 'Html', content: ' is the base of all of types.', id: 'node3'},
			],
			id: 'node0',
		}),
	);
});

test_parse.run();
/* /test_parse */
