import {type Gen} from '@feltcoop/gro';

import {vocabulary} from '$lib/vocabulary';
import notesData from '$lib/activity_streams_notes.json';
import examplesData from '$lib/activity_streams_examples.json';
import {type VocabularyItem} from '$lib/activity_streams';

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

type TODOSchemaType = {[key: string]: any};

const toSchema = (item: VocabularyItem): TODOSchemaType => {
	return {
		title: item.name,
		type: 'object',
		description: notesData.notes[item.name],
		properties: toProperties(item),
		examples: examplesData.examples[item.name],
	};
};

const toProperties = (item: VocabularyItem): TODOSchemaType | undefined => {
	if (!('properties' in item && item.properties)) return;
	const properties: TODOSchemaType = {};
	for (const propertyName of item.properties) {
		properties[propertyName] = {$ref: `#/definitions/${propertyName}`};
	}
	return properties;
};
