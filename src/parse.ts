import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary} from './vocabulary.js';
import type {VocabularyTerm} from './activity_streams.js';

// TODO parameterize or refactor
export const parseVocabulary = (content: string): Tree => {
	if (content in vocabulary.byName) {
		return {
			type: 'Component',
			component: 'EntityLink',
			props: {name: content},
		};
	}
	return {type: 'Html', content};
};

// original version
// TODO delete this?
export const parseExamples = (examples: VocabularyTerm[], toId?: ToId): Tree | null => {
	if (!examples) return null;
	const children: Tree[] = [];
	for (const example of examples) {
		// TODO can this be flattened?
		const tree: Tree = {
			type: 'Block',
			children: parse(JSON.stringify(example, null, 2)),
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
export const parse = (content: string, toId?: ToId): Tree[] => {
	const children: Tree[] = [];
	let i = 0;
	let len = content.length;
	let currentString = '';
	let insideBackticks = false;
	let insideBackticksContents = '';
	let insideQuotes = false;
	let insideQuotesContents = '';
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
		} else if (char === '"') {
			if (insideQuotes) {
				// lookup the identifier
				// TODO normalize?
				if (insideQuotesContents in vocabulary.byName) {
					// this is the item, but we don't need it ?
					// const vocabularyItem = vocabulary.byName[insideQuotesContents];
					if (currentString) {
						children.push({type: 'Html', content: currentString});
						currentString = '';
					}
					children.push({
						type: 'Component',
						component: 'EntityLink',
						props: {name: insideQuotesContents},
					});
					insideQuotesContents = '';
				} else {
					// un-resolved identifier, so treat as plain text
					currentString += `"${insideQuotesContents}"`;
					insideQuotesContents = '';
				}
				insideQuotes = false;
			} else {
				insideQuotes = true;
				// enter backticks
				if (insideQuotesContents !== '') throw Error('TODO ?');
			}
		} else if (insideBackticks) {
			insideBackticksContents += char;
		} else if (insideQuotes) {
			// TODO this is bugged
			insideQuotesContents += char;
		} else {
			currentString += char;
		}
		i++;
	}
	if (currentString) {
		children.push({type: 'Html', content: currentString});
		currentString = '';
	}
	return children.map((c) => assignNodeIds(c, toId));
};
