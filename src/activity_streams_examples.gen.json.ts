import {Gen} from '@feltcoop/gro/dist/gen/gen.js';
import {examples} from './activity_streams_examples.js';

// this renders the vocabulary examples to JSON

export const gen: Gen = async () => {
	return `
  {
    "examples":${JSON.stringify(examples)}
  }
  `;
};
