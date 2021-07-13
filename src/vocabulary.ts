import {vocabulary as vocabulary_items, vocabulary_categories} from 'src/activity_streams.js';
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
	items: vocabulary_items,
	types: vocabulary_items.filter((v) => v.category !== 'vocab.property'),
	properties: vocabulary_items.filter(
		(v) => v.category === 'vocab.property',
	) as Vocabulary_Property[], // TODO rework types to avoid this typecast
	by_type_name: vocabulary_categories.reduce((result, t) => {
		result[t] = vocabulary_items.filter((v) => v.category === t);
		if (t === 'vocab.property') {
			result[t].sort((a, b) => (a.name > b.name ? 1 : -1));
		}
		return result;
	}, {} as Vocabulary['by_type_name']),
	by_name: vocabulary_items.reduce((result, item) => {
		result[item.name] = item;
		return result;
	}, {} as Vocabulary['by_name']),
	types_tree_root: vocabulary_items.find((v) => v.name === 'Entity')!,
};
