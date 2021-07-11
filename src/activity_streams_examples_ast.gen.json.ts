import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {examples} from 'src/activity_streams_examples.js';
import {parseExamples} from 'src/parseExamples.js';
import {toToDeterministicId} from 'src/tree.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool,
// and combined with `gro check` acts as a big snapshot test

export const gen: Gen = async () => {
	const toId = toToDeterministicId();
	return `{
    ${Object.entries(examples).map(([name, examples]) => {
			return `"${name}": ${JSON.stringify(parseExamples(examples, toId))}`;
		})}
  }`;
};
