import {type Gen} from '@feltcoop/gro';

import activity_streams_notes from '$lib/activity_streams_notes.json';
import {parse} from '$lib/parse';
import {to_to_deterministic_id} from '$lib/tree';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	const to_id = to_to_deterministic_id();
	return `{
    ${Object.entries(activity_streams_notes.notes).map(([name, notes]) => {
			return `"${name}": ${JSON.stringify(parse(notes, to_id))}`;
		})}
  }`;
};
