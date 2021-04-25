import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary} from './vocabulary.js';

// TODO haphazardly named
interface WrapperChar {
	char: string;
	preserve?: boolean; // TODO maybe more direct control, via function hooks or sometihng
}
const wrapperChars: WrapperChar[] = [{char: '`'}, {char: '"', preserve: true}];

// TODO regexp? refactor?
const breaksWord: Set<string> = new Set([' ', '\n']);

// why not lex/scan/tokenize? lol what do you think this is, computer rocket science?
export const parse = (content: string, toId?: ToId): Tree[] => {
	const children: Tree[] = [];
	const vocabularyByName = vocabulary.byName; // TODO make this an arg or smth
	let i = 0;
	let len = content.length;
	let currentString = '';
	let insideWrapperChar: WrapperChar | null = null;
	let insideWrapperCharContents = '';
	let word = '';
	let char: string;
	let shouldAppendChar = false;
	while (i < len) {
		char = content[i];
		shouldAppendChar = true;
		// TODO refactor all of this
		if (breaksWord.has(char)) {
			if (word.startsWith('https://')) {
				currentString = currentString.substring(0, currentString.length - word.length);
				if (currentString) {
					children.push({type: 'Html', content: currentString});
					currentString = '';
				}
				children.push({type: 'Component', component: 'Link', props: {url: word}});
			}
			word = '';
		} else {
			word += char;
		}
		for (const wrapperChar of wrapperChars) {
			if (char === wrapperChar.char) {
				const preserve = !!wrapperChar.preserve;
				if (insideWrapperChar) {
					if (insideWrapperChar === wrapperChar) {
						if (insideWrapperCharContents in vocabularyByName) {
							if (currentString) {
								children.push({type: 'Html', content: currentString});
							}
							currentString = preserve ? char : '';
							children.push({
								type: 'Component',
								component: 'EntityLink',
								props: {name: insideWrapperCharContents},
							});
						} else {
							// un-resolved identifier, so treat as plain text
							currentString += `${preserve ? '' : char}${insideWrapperCharContents}${char}`;
						}
						insideWrapperCharContents = '';
						insideWrapperChar = null;
					}
					// else is a different char, so treat as string
					shouldAppendChar = false;
				} else {
					insideWrapperChar = wrapperChar;
					shouldAppendChar = preserve;
				}
			} else if (wrapperChar === insideWrapperChar) {
				insideWrapperCharContents += char;
				shouldAppendChar = false;
			}
		}
		// TODO refactor this, messy/confusing from old code
		if (shouldAppendChar) {
			currentString += char;
			shouldAppendChar = false;
		}
		i++;
	}
	// TODO hmm
	currentString += insideWrapperCharContents;
	if (currentString) {
		children.push({type: 'Html', content: currentString});
		currentString = '';
	}
	return children.map((c) => assignNodeIds(c, toId));
};
