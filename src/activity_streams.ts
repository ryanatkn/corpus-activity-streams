import activity_streams_vocabulary from 'src/activity_streams_vocabulary.json';

export const vocabulary = activity_streams_vocabulary.vocabulary;

export interface Vocabulary_Term {
	// TODO generate this or otherwise do it correctly
	[key: string]: any;
	'@context': string;
	id?: string;
	type?: string | string[];
}

export type Vocabulary_Item = Vocabulary_Type | Vocabulary_Property;
export interface Base_Vocabulary_Item {
	name: string;
	category: Vocabulary_Category;
}
export interface Vocabulary_Type extends Base_Vocabulary_Item {
	extends?: string | string[]; // TODO should swap in the actual `Vocabulary_Type` like `extended_by`
	extended_by?: string[];
	properties?: string[];
	disjoint_with?: string;
}
export interface Vocabulary_Property extends Base_Vocabulary_Item {
	category: 'vocab.property';
	domain: string | string[];
	range: string | string[];
	functional: boolean;
	subproperty_of?: string;
}

export type Vocabulary_Category =
	| 'vocab.core'
	| 'vocab.object'
	| 'vocab.link'
	| 'vocab.activity'
	| 'vocab.actor'
	| 'vocab.property';
export const vocabulary_categories: Vocabulary_Category[] = [
	'vocab.core',
	'vocab.object',
	'vocab.link',
	'vocab.activity',
	'vocab.actor',
	'vocab.property',
];
