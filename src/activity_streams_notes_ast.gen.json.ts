import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import activity_streams_notes from 'src/activity_streams_notes.json';
import {parse} from 'src/parse.js';
import {to_to_deterministic_id} from 'src/tree.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	const to_id = to_to_deterministic_id();
	return `{
    ${Object.entries(activity_streams_notes.notes).map(([name, notes]) => {
			return `"${name}": ${JSON.stringify(parse(notes, to_id))}`;
		})}
  }`;
};
