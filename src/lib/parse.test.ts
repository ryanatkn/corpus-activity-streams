import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {parse} from '$lib/parse';
import {type Tree, assign_node_ids} from '$lib/tree';

const normalizeChildren = (children: Tree[]) => {
	let i = 0;
	return children.map((c) => assign_node_ids(c, () => `tree_${i++}`));
};

/* test_parse */
const test_parse = suite('parse');

test_parse('parses entity link in backticks', () => {
	assert.equal(
		normalizeChildren(parse('The `Entity` is the base of all non-primitive types.')),
		normalizeChildren([
			{type: 'Text', content: 'The '},
			{type: 'Component', component: 'EntityLink', props: {name: 'Entity'}},
			{type: 'Text', content: ' is the base of all non-primitive types.'},
		]),
	);
});

test_parse('parses entity links in quotes', () => {
	assert.equal(
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
			{type: 'Text', content: '{\n  "@context": "'},
			{type: 'Component', component: 'Link', props: {href: 'http://www.w3.org/ns/activitystreams'}},
			{type: 'Text', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'type'}},
			{type: 'Text', content: '": "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'Object'}},
			{type: 'Text', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'id'}},
			{type: 'Text', content: '": "'},
			{type: 'Component', component: 'Link', props: {href: 'http://www.test.example/object/1'}},
			{type: 'Text', content: '",\n  "'},
			{type: 'Component', component: 'EntityLink', props: {name: 'name'}},
			{type: 'Text', content: '": "A Simple, non-specific object `note`"\n}'},
		]),
	);
});

test_parse('parses link', () => {
	assert.equal(
		normalizeChildren(parse('this https://felt.social is an external link')),
		normalizeChildren([
			{type: 'Text', content: 'this '},
			{type: 'Component', component: 'Link', props: {href: 'https://felt.social'}},
			{type: 'Text', content: ' is an external link'},
		]),
	);
});

test_parse('parses insecure http link', () => {
	assert.equal(
		normalizeChildren(parse('this http://felt.social is an external insecure link')),
		normalizeChildren([
			{type: 'Text', content: 'this '},
			{type: 'Component', component: 'Link', props: {href: 'http://felt.social'}},
			{type: 'Text', content: ' is an external insecure link'},
		]),
	);
});

test_parse('parses link in backticks', () => {
	assert.equal(
		normalizeChildren(parse('this `https://felt.social` is an external link in backticks')),
		normalizeChildren([
			{type: 'Text', content: 'this '},
			{type: 'Component', component: 'Link', props: {href: 'https://felt.social'}},
			{type: 'Text', content: ' is an external link in backticks'},
		]),
	);
});

test_parse('parses link in quotes', () => {
	assert.equal(
		normalizeChildren(parse('this "https://felt.social" is an external link in quotes')),
		normalizeChildren([
			{type: 'Text', content: 'this "'},
			{type: 'Component', component: 'Link', props: {href: 'https://felt.social'}},
			{type: 'Text', content: '" is an external link in quotes'},
		]),
	);
});

test_parse('parses custom link in backticks', () => {
	assert.equal(
		normalizeChildren(
			parse('The `Entity` is the base of all non-primitive types.', [
				{
					char: '`',
					preserve: false,
					component: 'CustomLink',
					toProps: (name: string) => ({othername: name}),
				},
			]),
		),
		normalizeChildren([
			{type: 'Text', content: 'The '},
			{type: 'Component', component: 'CustomLink', props: {othername: 'Entity'}},
			{type: 'Text', content: ' is the base of all non-primitive types.'},
		]),
	);
});

test_parse('parses a simple html anchor link', () => {
	assert.equal(
		normalizeChildren(
			parse('this <a href="https://felt.social" name="felt">content</a> is an external link'),
		),
		normalizeChildren([
			{type: 'Text', content: 'this '},
			{
				type: 'Component',
				component: 'Link',
				props: {href: 'https://felt.social', name: 'felt', content: 'content'},
			},
			{type: 'Text', content: ' is an external link'},
		]),
	);
});

test_parse('parses a more complex html anchor link', () => {
	assert.equal(
		normalizeChildren(parse('the [<a href="https://felt.social" a="1" b=2 c="3">1 2 3</a>] and')),
		normalizeChildren([
			{type: 'Text', content: 'the ['},
			{
				type: 'Component',
				component: 'Link',
				props: {
					href: 'https://felt.social',
					a: '1',
					b: '2',
					c: '3',
					content: '1 2 3',
				},
			},
			{type: 'Text', content: '] and'},
		]),
	);
});

// TODO nested html

test_parse.run();
/* /test_parse */
