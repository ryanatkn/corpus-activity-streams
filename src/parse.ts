import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary} from './vocabulary.js';

// TODO haphazardly named
interface WrapperChar {
	char: string;
	preserve?: boolean; // TODO maybe more direct control, via function hooks or sometihng
}
const wrapperChars: WrapperChar[] = [{char: '`'}, {char: '"', preserve: true}];

// why not lex/scan/tokenize? lol what do you think this is, computer rocket science?
export const parse = (content: string, toId?: ToId): Tree[] => {
	const children: Tree[] = [];
	let i = 0;
	let len = content.length;
	let currentString = '';
	let insideWrapperChar: WrapperChar | null = null;
	let insideWrapperCharContents = '';
	let char: string;
	let shouldAppendChar = false;
	while (i < len) {
		char = content[i];
		shouldAppendChar = true;
		for (const wrapperChar of wrapperChars) {
			if (char === wrapperChar.char) {
				const preserve = !!wrapperChar.preserve;
				if (insideWrapperChar) {
					if (insideWrapperChar === wrapperChar) {
						if (insideWrapperCharContents in vocabulary.byName) {
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
					} else {
						// is a different char, so treat as string
						insideWrapperCharContents += char;
					}
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
