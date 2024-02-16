import {Unreachable_Error} from '@ryanatkn/belt/error.js';

import {type Tree, assign_node_ids} from '$lib/tree.js';
import {vocabulary} from '$lib/vocabulary.js';

// this is all very hacky but serviceable for the needs of this app

// TODO haphazardly named
export interface WrapperChar {
	char: string;
	preserve: boolean; // TODO maybe more direct control, via function hooks or sometihng
	component: string;
	toProps: (...args: any[]) => Record<string, any>; // TODO type ? generic?
}
const toItemLinkProps = (name: string): {name: string} => ({name}); // TODO refactor, where and how?
export const defaultWrapperChars: WrapperChar[] = [
	{char: '`', preserve: false, component: 'ItemLink', toProps: toItemLinkProps},
	{char: '"', preserve: true, component: 'ItemLink', toProps: toItemLinkProps},
];

// TODO regexp? refactor?
const breaksWord: Set<string> = new Set([' ', '\n']);

const TAG_OPEN_CHAR = '<';
const TAG_CLOSE_CHAR = '>';
const LINK_MATCHER = /^https?:\/\//u;

export const parse = (content: string, wrapperChars = defaultWrapperChars): Tree[] => {
	const children: Tree[] = [];
	const vocabularyByName = vocabulary.by_name; // TODO make this an arg or smth
	let i = 0;
	const len = content.length;
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
					children.push({type: 'Text', content: currentString});
					currentString = '';
				}
				children.push({type: 'Component', component: 'Link', props: {href: word}});
			}
			word = '';
		} else {
			word += char;
		}
		if (parsingHtml === null && char === TAG_OPEN_CHAR && !insideWrapperChar) {
			// < ...
			if (currentString) {
				children.push({type: 'Text', content: currentString});
				currentString = '';
			}
			// console.log('open');
			parsingHtml = 'open';
			tagName = '';
			// tagAttributes = ''; // TODO ?
		} else if (parsingHtml) {
			if (parsingHtml === 'open') {
				if (breaks) {
					// console.log('finalized tag', tagName);
					parsingHtml = 'attributes';
					tagAttributes = ''; // TODO ?
				} else {
					tagName += char;
				}
			} else if (parsingHtml === 'attributes') {
				if (char === TAG_CLOSE_CHAR) {
					// console.log('finalized attrs', tagAttributes);
					parsingHtml = 'children';
				} else {
					tagAttributes += char;
				}
			} else if (parsingHtml === 'children') {
				if (char === TAG_OPEN_CHAR) {
					// console.log('finalized children', tagContent);
					parsingHtml = 'close';
				} else {
					tagContent += char;
				}
			} else if (parsingHtml === 'close') {
				// ../
				if (char === TAG_CLOSE_CHAR) {
					// console.log('finalized close tag', tagName);
					parsingHtml = null;
					if (tagName !== 'a') throw Error('TODO');
					children.push({
						type: 'Component',
						component: 'Link',
						props: {...parseAttributes(tagAttributes), content: tagContent}, // TODO parse actual children
					});
					tagContent = '';
				}
			} else {
				throw new Unreachable_Error(parsingHtml);
			}
		} else {
			for (const wrapperChar of wrapperChars) {
				if (char === wrapperChar.char) {
					const {preserve} = wrapperChar;
					if (insideWrapperChar) {
						if (insideWrapperChar === wrapperChar) {
							if (insideWrapperCharContents in vocabularyByName) {
								if (currentString) {
									children.push({type: 'Text', content: currentString});
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
										children.push({type: 'Text', content: currentString});
									}
									currentString = preserve ? char : '';
									children.push({
										type: 'Component',
										component: 'Link',
										props: {href: insideWrapperCharContents},
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
		children.push({type: 'Text', content: currentString});
	}
	return children.map((c) => assign_node_ids(c));
};

// TODO tests
const parseAttributes = (tagAttributes: string): {[key: string]: any} => {
	const result: {[key: string]: any} = {};
	let key = '';
	let value = '';
	let parsingAttributes: 'key' | 'value' = 'key'; // TODO const enum?
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
	if (value.startsWith('"') && value.endsWith('"')) {
		return value.substring(1, value.length - 1);
	}
	return value;
};
