import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary, parseVocabulary} from './vocabulary.js';
import type {VocabularyTerm} from './activity_streams.js';

// TODO this should only be one function, `parse`

export const parseExamples = (examples: VocabularyTerm[], toId?: ToId): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		// TODO can this be flattened?
		const node: Tree = {
			type: 'Block',
			children: JSON.stringify(example, null, 2)
				.split(/  "(.+?)": /g)
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
			children: [node],
		});
	}
	return assignNodeIds({type: 'Block', children}, toId);
};
// TODO unify with above
export const parseNotes = (notes: string, toId?: ToId): Tree => {
	const node: Tree = assignNodeIds(
		{
			type: 'Block',
			children: notes.split(/`(.+?)`/g).map((str) => parseVocabulary(str)),
		},
		toId,
	);
	return node;
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
					children.push({
						type: 'Component',
						component: 'EntityLink',
						props: {name: insideBackticksContents},
					});
					if (currentString) {
						currentString = '';
					}
				} else {
					// un-resolved text, so not treated as a linked identifier
					currentString += insideBackticksContents;
				}
				insideBackticks = false;
			} else {
				insideBackticks = true;
				// enter backticks
				if (currentString) {
					currentString = '';
					children.push({type: 'Html', content: currentString});
				}
				insideBackticksContents = '';
			}
		} else if (insideBackticks) {
			insideBackticksContents += char;
		} else {
			currentString += char;
		}
		i++;
	}
	// TODO remove the wrapper?
	const node = assignNodeIds({type: 'Block', children}, toId);
	return node;
};
