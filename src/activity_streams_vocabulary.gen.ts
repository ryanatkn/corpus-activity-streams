import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';
import {to_root_path} from '@feltcoop/gro/dist/paths.js';

// Renders the vocabulary data as a TypeScript file with type annotated JSON.

// TODO type is busted because of postprocessing, need to do that ahead of time
// to replace `addextended_by`

// TODO parse from raw JSON instead of inserting as JS

export const gen: Gen = async ({fs, origin_id}) => {
	const examples_data = JSON.parse(await fs.read_file('src/activity_streams.json', 'utf8'));
	const vocabulary = examples_data.vocabulary.map((v: any) => ({...v, notes: undefined}));
	return `
// generated by ${to_root_path(origin_id)}
export const vocabulary: any[] = ${JSON.stringify(vocabulary)};
  `;
};
