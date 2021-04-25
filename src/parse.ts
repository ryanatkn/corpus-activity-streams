import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary} from './vocabulary.js';

// TODO haphazardly named
export interface WrapperChar {
	char: string;
	preserve: boolean; // TODO maybe more direct control, via function hooks or sometihng
	component: string;
	toProps: (...args: any[]) => Record<string, any>; // TODO type ? generic?
}
export const defaultWrapperChars: WrapperChar[] = [
	{char: '`', preserve: false, component: 'EntityLink', toProps: (name: string) => ({name})},
	{char: '"', preserve: true, component: 'EntityLink', toProps: (name: string) => ({name})},
];

// TODO regexp? refactor?
const breaksWord: Set<string> = new Set([' ', '\n']);

// why not lex/scan/tokenize? lol what do you think this is, computer rocket science?
export const parse = (content: string, toId?: ToId, wrapperChars = defaultWrapperChars): Tree[] => {
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
				const {preserve} = wrapperChar;
				if (insideWrapperChar) {
					if (insideWrapperChar === wrapperChar) {
						if (insideWrapperCharContents in vocabularyByName) {
							if (currentString) {
								children.push({type: 'Html', content: currentString});
							}
							currentString = preserve ? char : '';
							children.push({
								type: 'Component',
								component: wrapperChar.component,
								props: wrapperChar.toProps(insideWrapperCharContents),
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
		if (shouldAppendChar) {
			currentString += char;
			shouldAppendChar = false;
		}
		i++;
	}
	if (insideWrapperCharContents) currentString += insideWrapperCharContents;
	if (currentString) {
		children.push({type: 'Html', content: currentString});
	}
	return children.map((c) => assignNodeIds(c, toId));
};
