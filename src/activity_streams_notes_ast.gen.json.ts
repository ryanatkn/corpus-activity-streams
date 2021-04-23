import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {vocabularyNotes} from './activity_streams_notes.js';
import {parseNotes} from './parse.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	return `{
    ${Object.entries(vocabularyNotes).map(([name, notes]) => {
			return `"${name}": ${JSON.stringify(parseNotes(notes, toId()))}`;
		})}
  }`;
};

let id = 0;
const toId = () => {
	return () => `node${id++}`;
};
