import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary, parseVocabulary} from './vocabulary.js';
import type {VocabularyTerm} from './activity_streams.js';

// original version
// TODO delete this?
export const parseExamples = (examples: VocabularyTerm[], toId?: ToId): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		// TODO can this be flattened?
		const tree: Tree = {
			type: 'Block',
			children: JSON.stringify(example, null, 2)
				.split(/"(.+?)": /g)
				.map((str) => ({
					type: 'Block',
					children:
						str in vocabulary.byName
							? [{type: 'Text', content: '\t'}, parseVocabulary(str), {type: 'Text', content: ': '}]
							: [{type: 'Html', content: str === '@context' ? `\t${str}: ` : str}], // TODO hacky
				})),
		};
		children.push({
			type: 'Element',
			element: 'pre',
			children: [tree],
		});
	}
	return assignNodeIds({type: 'Block', children}, toId);
};

// why not lex/scan/tokenize? lol what do you think this is, computer rocket science?
export const parse = (content: string, toId?: ToId): Tree => {
	const children: Tree[] = [];
	let i = 0;
	let len = content.length;
	let currentString = '';
	let insideBackticks = false;
	let insideBackticksContents = '';
	while (i < len) {
		const char = content[i];
		if (char === '`') {
			if (insideBackticks) {
				// lookup the identifier
				// TODO normalize?
				if (insideBackticksContents in vocabulary.byName) {
					// this is the item, but we don't need it ?
					// const vocabularyItem = vocabulary.byName[insideBackticksContents];
					if (currentString) {
						children.push({type: 'Html', content: currentString});
						currentString = '';
					}
					children.push({
						type: 'Component',
						component: 'EntityLink',
						props: {name: insideBackticksContents},
					});
					insideBackticksContents = '';
				} else {
					// un-resolved identifier, so treat as plain text
					currentString += `\`${insideBackticksContents}\``;
					insideBackticksContents = '';
				}
				insideBackticks = false;
			} else {
				insideBackticks = true;
				// enter backticks
				if (insideBackticksContents !== '') throw Error('TODO ?');
			}
		} else if (insideBackticks) {
			insideBackticksContents += char;
		} else {
			currentString += char;
		}
		i++;
	}
	if (currentString) {
		children.push({type: 'Html', content: currentString});
		currentString = '';
	}
	// TODO remove the wrapper?
	const tree = assignNodeIds({type: 'Block', children}, toId);
	return tree;
};
