import type {VocabularyItem, VocabularyTerm} from './activity_streams.js';
import {vocabulary} from './vocabulary.js';
import {vocabularyNotes} from './activity_streams_notes.js';
import {examples} from './activity_streams_examples.js';

const toContents = (item: VocabularyItem): string => {
	const rendered = {
		notes: processNotes(vocabularyNotes[item.name]),
		examples: processExamples(examples[item.name]),
	};
	return `
${rendered.notes}
${rendered.examples}
`;
};

const processNotes = (notes: string): string => {
	return notes.replace(/`(.+?)`/g, (text, $1) => {
		if ($1 in vocabularyNotes) {
			return `<EntityLink name="${$1}" />`;
		}
		return text;
	});
};

const processExamples = (examples: VocabularyTerm[]): string => {
	if (!examples) return '';
	let str = '';
	for (const example of examples) {
		str += `
			<pre>
				${JSON.stringify(example, null, 2)
					.replace(/([\{\}])/g, `{'$1'}`)
					.replace(
						/  "(.+?)": /g,
						(_, key) => `  "${key in vocabulary.byName ? `<EntityLink name="${key}" />` : key}": `,
					)}
			</pre>
		`;
	}
	return str;
};
