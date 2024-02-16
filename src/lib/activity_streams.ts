export interface VocabularyTerm {
	// TODO generate this or otherwise do it correctly
	[key: string]: any;
	'@context': string;
	id?: string;
	type?: string | string[];
}

// TODO probably rename everything from `Item` to `Term`
export type VocabularyItem = VocabularyType | VocabularyProperty;
export interface BaseVocabularyItem {
	name: string;
	category: VocabularyCategory;
}
export interface VocabularyType extends BaseVocabularyItem {
	extends?: string | string[]; // TODO should swap in the actual `VocabularyType` like `extended_by`
	extended_by?: string[];
	properties?: string[];
	disjoint_with?: string;
}
export interface VocabularyProperty extends BaseVocabularyItem {
	category: 'vocab.property';
	domain: string | string[];
	range: string | string[];
	functional: boolean;
	subproperty_of?: string;
}

export type VocabularyCategory =
	| 'vocab.core'
	| 'vocab.object'
	| 'vocab.link'
	| 'vocab.activity'
	| 'vocab.actor'
	| 'vocab.property';
