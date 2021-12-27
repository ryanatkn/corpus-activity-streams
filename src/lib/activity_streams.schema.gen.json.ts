import {Gen} from '@feltcoop/gro/dist/gen/gen.js';

import {vocabulary} from './vocabulary.js';
import {vocabularyNotes} from './activity_streams_notes.js';
import {examples} from './activity_streams_examples.js';
import {VocabularyItem} from './activity_streams.js';

// this renders the vocabulary examples to JSON

export const gen: Gen = async () => {
	return `
  {
    "definitions": { ${renderDefinitions()} }
  }
  `;
};

const renderDefinitions = (): string => {
	let str = '';

	for (const item of vocabulary.items) {
		if (str !== '') str += ',';
		str += `"${item.name}": `;
		switch (item.category) {
			case 'vocab.activity':
			case 'vocab.actor':
			case 'vocab.core':
			case 'vocab.link':
			case 'vocab.object':
			case 'vocab.property': {
				str += JSON.stringify(toSchema(item));
			}
		}
	}

	return str;
};

const toSchema = (item: VocabularyItem): Obj => {
	return {
		title: item.name,
		type: 'object',
		description: vocabularyNotes[item.name],
		properties: toProperties(item),
		examples: examples[item.name],
	};
};

const toProperties = (item: VocabularyItem): Obj | undefined => {
	if (!('properties' in item && item.properties)) return;
	const properties: Obj = {};
	for (const propertyName of item.properties) {
		properties[propertyName] = {$ref: `#/definitions/${propertyName}`};
	}
	return properties;
};
