import {Gen} from '@feltcoop/gro/dist/gen/gen.js';
import {vocabulary} from './activity_streams.js';
import {vocabularyNotes} from './activity_streams_notes.js';

// this renders `vocabulary` to JSON

export const gen: Gen = async () => {
	return `
  {
    "vocabulary": [
      ${vocabulary.map((item) => {
				const json = {
					...item,
					extendedBy:
						'extendedBy' in item && item.extendedBy
							? item.extendedBy.map((i) => i.name)
							: undefined,
					notes: vocabularyNotes[item.name],
				};
				return JSON.stringify(json);
			})}
    ]
  }
  `;
};
