import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {examples} from 'src/activity_streams_examples.js';
import {parse_examples} from 'src/parse_examples.js';
import {to_to_deterministic_id} from 'src/tree.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool,
// and combined with `gro check` acts as a big snapshot test

export const gen: Gen = async () => {
	const to_id = to_to_deterministic_id();
	return `{
    ${Object.entries(examples).map(([name, examples]) => {
			return `"${name}": ${JSON.stringify(parse_examples(examples, to_id))}`;
		})}
  }`;
};
