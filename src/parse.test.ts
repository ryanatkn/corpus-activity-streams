import {suite} from 'uvu';
import * as t from 'uvu/assert';

import {parse} from './parse.js';
import {assignNodeIds, toToDeterministicId} from './tree.js';
import type {Tree} from './tree.js';

const normalizeChildren = (children: Tree[]) => {
	const toId = toToDeterministicId();
	return children.map((c) => assignNodeIds(c, toId));
};

/* test_parse */
const test_parse = suite('parse');

test_parse('parses entity link in backticks', () => {
	t.equal(
		normalizeChildren(parse('The `Entity` is the base of all of types.')),
		normalizeChildren([
			{type: 'Html', content: 'The '},
			{type: 'Component', component: 'EntityLink', props: {name: 'Entity'}},
			{type: 'Html', content: ' is the base of all of types.'},
		]),
	);
});

test_parse('parses entity links in quotes', () => {
	t.equal(
		normalizeChildren(
			parse(
				JSON.stringify(
					{
						'@context': 'https://www.w3.org/ns/activitystreams',
						type: 'Object',
						id: 'http://www.test.example/object/1',
						name: 'A Simple, non-specific object `note`',
					},
					null,
					2,
				),
			)!,
		),
		normalizeChildren([
			{type: 'Html', content: '{\n  "@context": "https://www.w3.org/ns/activitystreams",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'type'}},
			{type: 'Html', content: '": "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'Object'}},
			{type: 'Html', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'id'}},
			{type: 'Html', content: '": "http://www.test.example/object/1",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'name'}},
			{type: 'Html', content: '": "A Simple, non-specific object `note`"\n}'},
		]),
	);
});

test_parse('parses link', () => {
	t.equal(
		normalizeChildren(parse('this https://www.felt.dev is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this '},
			{type: 'Component', component: 'ExternalLink', props: {href: 'https://www.felt.dev'}},
			{type: 'Html', content: ' is an external link'},
		]),
	);
});

test_parse.run();
/* /test_parse */
