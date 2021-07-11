export {vocabulary} from 'src/activity_streams_vocabulary.js';

export interface VocabularyTerm {
	// TODO generate this or otherwise do it correctly
	[key: string]: any;
	'@context': string;
	id?: string;
	type?: string | string[];
}

export type VocabularyItem = VocabularyType | VocabularyProperty;
export interface BaseVocabularyItem {
	name: string;
	category: VocabularyCategory;
}
export interface VocabularyType extends BaseVocabularyItem {
	extends?: string | string[]; // TODO should swap in the actual `VocabularyType` like `extendedBy`
	extendedBy?: string[];
	properties?: string[];
	disjointWith?: string;
}
export interface VocabularyProperty extends BaseVocabularyItem {
	domain: string | string[];
	range: string | string[];
	functional: boolean;
	subpropertyOf?: string;
}

export type VocabularyCategory =
	| 'vocab.core'
	| 'vocab.object'
	| 'vocab.link'
	| 'vocab.activity'
	| 'vocab.actor'
	| 'vocab.property';
export const vocabularyCategories: VocabularyCategory[] = [
	'vocab.core',
	'vocab.object',
	'vocab.link',
	'vocab.activity',
	'vocab.actor',
	'vocab.property',
];
