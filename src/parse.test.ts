import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {parse} from './parse.js';
import {assignNodeIds, toToDeterministicId} from './tree.js';
import type {Tree} from './tree.js';

const normalizeTree = (tree: Tree) => assignNodeIds(tree, toToDeterministicId());

/* test_parse */
const test_parse = suite('parse');

test_parse('parse', () => {
	t.equal(
		normalizeTree(parse('The `Entity` is the base of all of types.')),
		normalizeTree({
			type: 'Block',
			children: [
				{type: 'Html', content: 'The ', id: 'tree1'},
				{type: 'Component', component: 'EntityLink', props: {name: 'Entity'}, id: 'tree2'},
				{type: 'Html', content: ' is the base of all of types.', id: 'tree3'},
			],
			id: 'tree0',
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
// 					children: [{type: 'Html', content: '{\n', id: 'tree4'}],
// 					id: 'tree3',
// 				},
// 				{
// 					type: 'Block',
// 					children: [{type: 'Html', content: '\t@context: ', id: 'tree6'}],
// 					id: 'tree5',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"https://www.w3.org/ns/activitystreams",\n',
// 							id: 'tree8',
// 						},
// 					],
// 					id: 'tree7',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'tree10'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'type'},
// 							id: 'tree11',
// 						},
// 						{type: 'Text', content: ': ', id: 'tree12'},
// 					],
// 					id: 'tree9',
// 				},
// 				{
// 					type: 'Block',
// 					children: [{type: 'Html', content: '"Object",\n', id: 'tree14'}],
// 					id: 'tree13',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'tree16'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'id'},
// 							id: 'tree17',
// 						},
// 						{type: 'Text', content: ': ', id: 'tree18'},
// 					],
// 					id: 'tree15',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"http://www.test.example/object/1",\n',
// 							id: 'tree20',
// 						},
// 					],
// 					id: 'tree19',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{type: 'Text', content: '\t', id: 'tree22'},
// 						{
// 							type: 'Component',
// 							component: 'EntityLink',
// 							props: {name: 'name'},
// 							id: 'tree23',
// 						},
// 						{type: 'Text', content: ': ', id: 'tree24'},
// 					],
// 					id: 'tree21',
// 				},
// 				{
// 					type: 'Block',
// 					children: [
// 						{
// 							type: 'Html',
// 							content: '"A Simple, non-specific object"\n}',
// 							id: 'tree26',
// 						},
// 					],
// 					id: 'tree25',
// 				},
// 			],
// 			id: 'tree2',
// 		}),
// 	);
// });

test_parse.run();
/* /test_parse */
