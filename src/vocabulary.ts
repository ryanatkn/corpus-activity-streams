import {vocabulary as activityStreamsVocabulary, vocabularyCategories} from './activity_streams.js';
import type {VocabularyItem, VocabularyProperty} from './activity_streams.js';
import type {Tree} from './tree.js';

export interface Vocabulary {
	items: VocabularyItem[];
	types: VocabularyItem[];
	properties: VocabularyProperty[]; // with `.category === 'vocab.property'`
	byTypeName: {[key: string]: VocabularyItem[]};
	byName: {[key: string]: VocabularyItem};
	typesTreeRoot: VocabularyItem;
}

export const vocabulary: Vocabulary = {
	items: activityStreamsVocabulary,
	types: activityStreamsVocabulary.filter((v) => v.category !== 'vocab.property'),
	byTypeName: vocabularyCategories.reduce((result, t) => {
		result[t] = activityStreamsVocabulary.filter((v) => v.category === t);
		if (t === 'vocab.property') {
			result[t].sort((a, b) => (a.name > b.name ? 1 : -1));
		}
		return result;
	}, {} as Vocabulary['byTypeName']),
	properties: activityStreamsVocabulary.filter((v) => v.category === 'vocab.property'),
	byName: activityStreamsVocabulary.reduce((result, item) => {
		result[item.name] = item;
		return result;
	}, {} as Vocabulary['byName']),
	typesTreeRoot: activityStreamsVocabulary.find((v) => v.name === 'Entity')!,
};

// TODO parameterize or refactor
export const parseVocabulary = (content: string): Tree => {
	if (content in vocabulary.byName) {
		return {
			type: 'Component',
			component: 'EntityLink',
			props: {name: content},
		};
	}
	return {type: 'Html', content};
};
