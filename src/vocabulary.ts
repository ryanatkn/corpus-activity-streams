import {
	vocabulary as activity_streams_vocabulary,
	vocabulary_categories,
} from 'src/activity_streams.js';
import type {Vocabulary_Item, Vocabulary_Property} from 'src/activity_streams.js';

export interface Vocabulary {
	items: Vocabulary_Item[];
	types: Vocabulary_Item[];
	properties: Vocabulary_Property[]; // with `.category === 'vocab.property'`
	by_type_name: {[key: string]: Vocabulary_Item[]};
	by_name: {[key: string]: Vocabulary_Item};
	types_tree_root: Vocabulary_Item;
}

export const vocabulary: Vocabulary = {
	items: activity_streams_vocabulary,
	types: activity_streams_vocabulary.filter((v) => v.category !== 'vocab.property'),
	properties: activity_streams_vocabulary.filter((v) => v.category === 'vocab.property'),
	by_type_name: vocabulary_categories.reduce((result, t) => {
		result[t] = activity_streams_vocabulary.filter((v) => v.category === t);
		if (t === 'vocab.property') {
			result[t].sort((a, b) => (a.name > b.name ? 1 : -1));
		}
		return result;
	}, {} as Vocabulary['by_type_name']),
	by_name: activity_streams_vocabulary.reduce((result, item) => {
		result[item.name] = item;
		return result;
	}, {} as Vocabulary['by_name']),
	types_tree_root: activity_streams_vocabulary.find((v) => v.name === 'Entity')!,
};
