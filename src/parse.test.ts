import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {parse} from './parse.js';
import {assignNodeIds, toToDeterministicId} from './tree.js';
import type {Tree} from './tree.js';

const normalizeTree = (node: Tree) => assignNodeIds(node, toToDeterministicId());

/* test_parse */
const test_parse = suite('parse');

test_parse('parse', () => {
	t.equal(
		normalizeTree(parse('The `Entity` is the base of all of types.')),
		normalizeTree({
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

// test_parse('parse', () => {
// 	console.log(
// 		'hey',
// 		normalizeTree(
// 			parse(
// 				JSON.stringify(
// 					{
// 						'@context': 'https://www.w3.org/ns/activitystreams',
// 						type: 'Object',
// 						id: 'http://www.test.example/object/1',
// 						name: 'A Simple, non-specific object',
// 					},
// 					null,
// 					2,
// 				),
// 			)!,
// 		),
// 	);
// 	t.equal(
// 		normalizeTree(
// 			parse(
// 				JSON.stringify(
// 					{
// 						'@context': 'https://www.w3.org/ns/activitystreams',
// 						type: 'Object',
// 						id: 'http://www.test.example/object/1',
// 						name: 'A Simple, non-specific object',
// 					},
// 					null,
// 					2,
// 				),
// 			)!,
// 		),
// 		normalizeTree({
// 			type: 'Block',
// 			children: [
// 				{
// 					type: 'Block',
// 					children: [{type: 'Html', content: '{\n', id: 'node4'}],
// 					id: 'node3',
// 				},
// 				{
// 					type: 'Block',
// 					children: [{type: 'Html', content: '\t@context: ', id: 'node6'}],
// 					id: 'node5',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"https://www.w3.org/ns/activitystreams",\n',
// 							id: 'node8',
// 						},
// 					],
// 					id: 'node7',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'node10'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'type'},
// 							id: 'node11',
// 						},
// 						{type: 'Text', content: ': ', id: 'node12'},
// 					],
// 					id: 'node9',
// 				},
// 				{
// 					type: 'Block',
// 					children: [{type: 'Html', content: '"Object",\n', id: 'node14'}],
// 					id: 'node13',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'node16'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'id'},
// 							id: 'node17',
// 						},
// 						{type: 'Text', content: ': ', id: 'node18'},
// 					],
// 					id: 'node15',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"http://www.test.example/object/1",\n',
// 							id: 'node20',
// 						},
// 					],
// 					id: 'node19',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'node22'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'name'},
// 							id: 'node23',
// 						},
// 						{type: 'Text', content: ': ', id: 'node24'},
// 					],
// 					id: 'node21',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"A Simple, non-specific object"\n}',
// 							id: 'node26',
// 						},
// 					],
// 					id: 'node25',
// 				},
// 			],
// 			id: 'node2',
// 		}),
// 	);
// });

test_parse.run();
/* /test_parse */
