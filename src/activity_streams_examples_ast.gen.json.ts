import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {examples} from './activity_streams_examples.js';
import {parseExamples} from './parseExamples.js';

// parses markup and outputs its AST - we're not using it yet, but it's cool

export const gen: Gen = async () => {
	return `{
    ${Object.entries(examples).map(([name, examples]) => {
			return `"${name}": ${JSON.stringify(parseExamples(examples, toId()))}`;
		})}
  }`;
};

let id = 0;
const toId = () => {
	return () => `tree${id++}`;
};
