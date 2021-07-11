import type {Gen} from '@feltcoop/gro/dist/gen/gen.js';
import {to_root_path} from '@feltcoop/gro/dist/paths.js';
import {toEmbeddedJson} from './render.js';

// Renders the vocabulary data as a TypeScript file with type annotated JSON.

// TODO parse from raw JSON instead of inserting as JS
export const gen: Gen = async ({fs, origin_id}) => {
	const notesData = JSON.parse(await fs.read_file('src/activity_streams_notes.json', 'utf8'));
	return `
// generated by ${to_root_path(origin_id)}
export const notes: {[key: string]: string} = ${toEmbeddedJson(notesData.notes)};
  `;
};
