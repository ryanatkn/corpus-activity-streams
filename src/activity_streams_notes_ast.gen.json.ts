import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {notes} from './activity_streams_notes.js';
import {parse} from './parse.js';
import {toToDeterministicId} from './tree.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	const toId = toToDeterministicId();
	return `{
    ${Object.entries(notes).map(([name, notes]) => {
			return `"${name}": ${JSON.stringify(parse(notes, toId))}`;
		})}
  }`;
};
