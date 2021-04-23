import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {parse} from './parse.js';
import {assignNodeIds, toToDeterministicId} from './tree.js';
import type {Tree} from './tree.js';

const normalizeChildren = (children: Tree[]) =>
	children.map((c) => assignNodeIds(c, toToDeterministicId()));

/* test_parse */
const test_parse = suite('parse');

test_parse('parse', () => {
	t.equal(
		normalizeChildren(parse('The `Entity` is the base of all of types.')),
		normalizeChildren([
			{type: 'Html', content: 'The '},
			{type: 'Component', component: 'EntityLink', props: {name: 'Entity'}},
			{type: 'Html', content: ' is the base of all of types.'},
		]),
	);
});

test_parse('parse', () => {
	console.log(
		'hey',
		normalizeChildren(
			parse(
				JSON.stringify(
					{
						'@context': 'https://www.w3.org/ns/activitystreams',
						type: 'Object',
						id: 'http://www.test.example/object/1',
						name: 'A Simple, non-specific object',
					},
					null,
					2,
				),
			)!,
		),
	);
	t.equal(
		normalizeChildren(
			parse(
				JSON.stringify(
					{
						'@context': 'https://www.w3.org/ns/activitystreams',
						type: 'Object',
						id: 'http://www.test.example/object/1',
						name: 'A Simple, non-specific object',
					},
					null,
					2,
				),
			)!,
		),
		normalizeChildren([
			{type: 'Block', children: [{type: 'Html', content: '{\n  '}]},
			{type: 'Block', children: [{type: 'Html', content: '\t@context: '}]},
			{
				type: 'Block',
				children: [{type: 'Html', content: '"https://www.w3.org/ns/activitystreams",\n  '}],
			},
			{
				type: 'Block',
				children: [
					{type: 'Text', content: '\t'},
					{type: 'Component', component: 'EntityLink', props: {name: 'type'}},
					{type: 'Text', content: ': '},
				],
			},
			{type: 'Block', children: [{type: 'Html', content: '"Object",\n  '}]},
			{
				type: 'Block',
				children: [
					{type: 'Text', content: '\t'},
					{type: 'Component', component: 'EntityLink', props: {name: 'id'}},
					{type: 'Text', content: ': '},
				],
			},
			{
				type: 'Block',
				children: [{type: 'Html', content: '"http://www.test.example/object/1",\n  '}],
			},
			{
				type: 'Block',
				children: [
					{type: 'Text', content: '\t'},
					{type: 'Component', component: 'EntityLink', props: {name: 'name'}},
					{type: 'Text', content: ': '},
				],
			},
			{type: 'Block', children: [{type: 'Html', content: '"A Simple, non-specific object"\n}'}]},
		]),
	);
});

test_parse.run();
/* /test_parse */
