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
						'@context': 'http://www.w3.org/ns/activitystreams',
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
			{type: 'Html', content: '{\n  "@context": "'},
			{type: 'Component', component: 'Link', props: {url: 'http://www.w3.org/ns/activitystreams'}},
			{type: 'Html', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'type'}},
			{type: 'Html', content: '": "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'Object'}},
			{type: 'Html', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'id'}},
			{type: 'Html', content: '": "'},
			{type: 'Component', component: 'Link', props: {url: 'http://www.test.example/object/1'}},
			{type: 'Html', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'name'}},
			{type: 'Html', content: '": "A Simple, non-specific object `note`"\n}'},
		]),
	);
});

test_parse('parses link', () => {
	t.equal(
		normalizeChildren(parse('this https://felt.social is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this '},
			{type: 'Component', component: 'Link', props: {url: 'https://felt.social'}},
			{type: 'Html', content: ' is an external link'},
		]),
	);
});

test_parse('parses insecure http link', () => {
	t.equal(
		normalizeChildren(parse('this http://felt.social is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this '},
			{type: 'Component', component: 'Link', props: {url: 'http://felt.social'}},
			{type: 'Html', content: ' is an external link'},
		]),
	);
});

test_parse('parses link in backricks', () => {
	t.equal(
		normalizeChildren(parse('this `https://felt.social` is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this '},
			{type: 'Component', component: 'Link', props: {url: 'https://felt.social'}},
			{type: 'Html', content: ' is an external link'},
		]),
	);
});

test_parse('parses link in quotes', () => {
	t.equal(
		normalizeChildren(parse('this "https://felt.social" is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this "'},
			{type: 'Component', component: 'Link', props: {url: 'https://felt.social'}},
			{type: 'Html', content: '" is an external link'},
		]),
	);
});

test_parse('parses custom link in backticks', () => {
	t.equal(
		normalizeChildren(
			parse('The `Entity` is the base of all of types.', undefined, [
				{
					char: '`',
					preserve: false,
					component: 'CustomLink',
					toProps: (name: string) => ({othername: name}),
				},
			]),
		),
		normalizeChildren([
			{type: 'Html', content: 'The '},
			{type: 'Component', component: 'CustomLink', props: {othername: 'Entity'}},
			{type: 'Html', content: ' is the base of all of types.'},
		]),
	);
});

test_parse('parses a simple html anchor link', () => {
	t.equal(
		normalizeChildren(parse('this <a href="https://felt.social">content</a> is an external link')),
		normalizeChildren([
			{type: 'Html', content: 'this '},
			{
				type: 'Component',
				component: 'Link',
				props: {url: 'https://felt.social', content: 'content'},
			},
			{type: 'Html', content: ' is an external link'},
		]),
	);
});

test_parse.run();
/* /test_parse */
