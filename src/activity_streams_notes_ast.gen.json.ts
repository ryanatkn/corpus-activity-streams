import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {vocabularyNotes} from './activity_streams_notes.js';
import {parse} from './parse.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	return `{
    ${Object.entries(vocabularyNotes).map(([name, notes]) => {
			return `"${name}": ${JSON.stringify(parse(notes, toId()))}`;
		})}
  }`;
};

let id = 0;
const toId = () => {
	return () => `tree${id++}`;
};
