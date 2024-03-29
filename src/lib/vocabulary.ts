import type {
	VocabularyCategory,
	VocabularyItem,
	VocabularyProperty,
} from '$lib/activity_streams.js';
import activity_streams_vocabulary from '$lib/activity_streams_vocabulary.json';

const vocabulary_items = activity_streams_vocabulary.vocabulary;

const categories: VocabularyCategory[] = [
	'vocab.core',
	'vocab.object',
	'vocab.link',
	'vocab.activity',
	'vocab.actor',
	'vocab.property',
];

export interface Vocabulary {
	items: VocabularyItem[];
	types: VocabularyItem[];
	properties: VocabularyProperty[]; // with `.category === 'vocab.property'`
	by_type_name: {[key: string]: VocabularyItem[]};
	by_name: {[key: string]: VocabularyItem};
	types_tree_root: VocabularyItem;
	categories: VocabularyCategory[];
}

export const vocabulary: Vocabulary = {
	items: vocabulary_items,
	types: vocabulary_items.filter((v) => v.category !== 'vocab.property'),
	properties: vocabulary_items.filter(
		(v) => v.category === 'vocab.property',
	) as VocabularyProperty[], // TODO rework types to avoid this typecast
	by_type_name: categories.reduce(
		(result, t) => {
			result[t] = vocabulary_items.filter((v) => v.category === t);
			if (t === 'vocab.property') {
				result[t].sort((a, b) => (a.name > b.name ? 1 : -1));
			}
			return result;
		},
		{} as Vocabulary['by_type_name'],
	),
	by_name: vocabulary_items.reduce(
		(result, item) => {
			result[item.name] = item;
			return result;
		},
		{} as Vocabulary['by_name'],
	),
	types_tree_root: vocabulary_items.find((v) => v.name === 'Entity')!,
	categories,
};
