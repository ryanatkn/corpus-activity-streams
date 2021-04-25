// TODO fix this, some error with importing paths
// import {UnreachableError} from '@feltcoop/gro';

import type {Tree, ToId} from './tree.js';
import {assignNodeIds} from './tree.js';
import {vocabulary} from './vocabulary.js';
/*

TODO

- /absolute and ./relative ../links
- emoji

*/

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

const TAG_OPEN_CHAR = '<';
const TAG_CLOSE_CHAR = '>';
const LINK_MATCHER = /^https?:\/\//;

// why not lex/scan/tokenize? lol what do you think this is, computer rocket science?
export const parse = (content: string, toId?: ToId, wrapperChars = defaultWrapperChars): Tree[] => {
	const children: Tree[] = [];
	const vocabularyByName = vocabulary.byName; // TODO make this an arg or smth
	let i = 0;
	let len = content.length;
	let currentString = '';
	let parsingHtml: null | 'open' | 'attributes' | 'children' | 'close' = null;
	let tagName = '';
	let tagAttributes = '';
	let tagContent = ''; // TODO maybe combine with `tagAttributes` into a single kind?
	let insideWrapperChar: WrapperChar | null = null;
	let insideWrapperCharContents = '';
	let word = '';
	let char: string;
	let shouldAppendChar = false;
	while (i < len) {
		char = content[i];
		shouldAppendChar = true;
		// TODO refactor all of this
		const breaks = breaksWord.has(char);
		if (breaks) {
			if (LINK_MATCHER.test(word)) {
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
		if (parsingHtml === null && word === TAG_OPEN_CHAR && !insideWrapperChar) {
			// < ...
			if (currentString) {
				children.push({type: 'Html', content: currentString});
				currentString = '';
			}
			console.log('open');
			parsingHtml = 'open';
			tagName = '';
			// tagAttributes = ''; // TODO ?
		} else if (parsingHtml) {
			if (parsingHtml === 'open') {
				if (breaks) {
					console.log('finalized tag', tagName);
					parsingHtml = 'attributes';
					tagAttributes = ''; // TODO ?
				} else {
					tagName += char;
				}
			} else if (parsingHtml === 'attributes') {
				if (char === TAG_CLOSE_CHAR) {
					console.log('finalized attrs', tagAttributes);
					parsingHtml = 'children';
				} else {
					tagAttributes += char;
				}
			} else if (parsingHtml === 'children') {
				if (char === TAG_OPEN_CHAR) {
					console.log('finalized children', tagContent);
					parsingHtml = 'close';
				} else {
					tagContent += char;
				}
			} else if (parsingHtml === 'close') {
				// ../
				if (char === TAG_CLOSE_CHAR) {
					console.log('finalized close tag', tagName);
					parsingHtml = null;
					if (tagName !== 'a') throw Error('TODO');
					children.push({
						type: 'Component',
						component: 'Link',
						props: {...parseAttributes(tagAttributes), content: tagContent}, // TODO parse actual children
					});
				}
			} else {
				throw Error();
				// TODO fix import problem
				// throw new UnreachableError(parsingHtml);
			}
		} else {
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
								if (LINK_MATCHER.test(insideWrapperCharContents)) {
									if (currentString) {
										children.push({type: 'Html', content: currentString});
									}
									currentString = preserve ? char : '';
									children.push({
										type: 'Component',
										component: 'Link',
										props: {url: insideWrapperCharContents},
									});
								} else {
									// un-resolved identifier, so treat as plain text
									currentString += `${preserve ? '' : char}${insideWrapperCharContents}${char}`;
								}
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
		}
		i++;
	}
	if (insideWrapperCharContents) currentString += insideWrapperCharContents;
	if (currentString) {
		children.push({type: 'Html', content: currentString});
	}
	return children.map((c) => assignNodeIds(c, toId));
};

// TODO test this. also, lol
const parseAttributes = (tagAttributes: string): {[key: string]: any} => {
	let result: {[key: string]: any} = {};
	let key = '';
	let value = '';
	let parsingAttributes: 'key' | 'value' = 'key';
	for (let i = 0; i < tagAttributes.length; i++) {
		const char = tagAttributes[i];
		if (parsingAttributes === 'key') {
			if (char === '=') {
				parsingAttributes = 'value';
			} else {
				key += char;
			}
		} else if (parsingAttributes === 'value') {
			if (char === ' ') {
				parsingAttributes = 'key';
				result[key] = toValue(value);
				key = '';
				value = '';
			} else {
				value += char;
			}
		}
	}
	if (key) result[key] = toValue(value);
	return result;
};

// TODO hacky
const toValue = (value: string): string => {
	if (value[0] === '"' && value[value.length - 1] === '"') {
		value = value.substring(1, value.length - 1);
	}
	return value;
};
