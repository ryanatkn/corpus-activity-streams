import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {examples} from './activity_streams_examples.js';
import {parseExamples} from './parseExamples.js';
import {toToDeterministicId} from './tree.js';

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
