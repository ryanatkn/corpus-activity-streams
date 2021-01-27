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
	extendedBy?: VocabularyType[];
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

// TODO derive
// - all properties (and where they're derived from)
// - all subclasses of each type (so `Entity` has a list of literally everything)
// - all types that can have a property (so it's a big repeating list for all of the activities - do we really need this?)

export const vocabulary: VocabularyItem[] = [
	// TODO this is our extension - should it have a separate category?
	{
		name: 'Entity',
		category: 'vocab.core',
		properties: ['id', 'type', 'name', 'mediaType', 'preview', 'attributedTo'],
		// subclasses: ['Object', 'Link'], // TODO this is a possible extension - is it useful? rename? 'extendedBy'? but what about the tree? do we need a hierarchical data structure here?
	},
	{
		name: 'Object',
		category: 'vocab.core',
		extends: 'Entity',
		disjointWith: 'Link',
		properties: [
			'attachment',
			'audience',
			'content',
			'context',
			'endTime',
			'generator',
			'icon',
			'image',
			'inReplyTo',
			'location',
			'published',
			'replies',
			'startTime',
			'summary',
			'tag',
			'updated',
			'url',
			'to',
			'bto',
			'cc',
			'bcc',
			'duration',
		],
	},
	{
		name: 'Link',
		category: 'vocab.core',
		extends: 'Entity',
		disjointWith: 'Object',
		properties: ['href', 'rel', 'hreflang', 'height', 'width'],
	},
	{
		name: 'Activity',
		category: 'vocab.core',
		extends: 'Object',
		properties: ['actor', 'object', 'target', 'origin', 'result', 'instrument'],
	},
	{
		name: 'IntransitiveActivity',
		category: 'vocab.core',
		extends: 'Activity',
	},
	{
		name: 'Collection',
		category: 'vocab.core',
		extends: 'Object',
		properties: ['totalItems', 'current', 'first', 'last', 'items'],
	},
	{
		name: 'OrderedCollection',
		category: 'vocab.core',
		extends: 'Collection',
		properties: ['orderedItems'],
	},
	{
		name: 'CollectionPage',
		category: 'vocab.core',
		extends: 'Collection',
		properties: ['partOf', 'next', 'prev'],
	},
	{
		name: 'OrderedCollectionPage',
		category: 'vocab.core',
		extends: ['OrderedCollection', 'CollectionPage'],
		properties: ['startIndex'],
	},
	{
		name: 'Accept',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Add',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Announce',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Arrive',
		category: 'vocab.activity',
		extends: 'IntransitiveActivity',
	},
	{
		name: 'Block',
		category: 'vocab.activity',
		extends: 'Ignore',
	},
	{
		name: 'Create',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Delete',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Dislike',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Flag',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Follow',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Ignore',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Invite',
		category: 'vocab.activity',
		extends: 'Offer',
	},
	{
		name: 'Join',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Leave',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Like',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Listen',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Move',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Offer',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Question',
		category: 'vocab.activity',
		extends: 'IntransitiveActivity',
		properties: ['oneOf', 'anyOf', 'closed'],
	},
	{
		name: 'Reject',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Read',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Remove',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'TentativeReject',
		category: 'vocab.activity',
		extends: 'Reject',
	},
	{
		name: 'TentativeAccept',
		category: 'vocab.activity',
		extends: 'Accept',
	},
	{
		name: 'Travel',
		category: 'vocab.activity',
		extends: 'IntransitiveActivity',
	},
	{
		name: 'Undo',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Update',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'View',
		category: 'vocab.activity',
		extends: 'Activity',
	},
	{
		name: 'Application',
		category: 'vocab.actor',
		extends: 'Object',
	},
	{
		name: 'Group',
		category: 'vocab.actor',
		extends: 'Object',
	},
	{
		name: 'Organization',
		category: 'vocab.actor',
		extends: 'Object',
	},
	{
		name: 'Person',
		category: 'vocab.actor',
		extends: 'Object',
	},
	{
		name: 'Service',
		category: 'vocab.actor',
		extends: 'Object',
	},
	{
		name: 'Article',
		category: 'vocab.object',
		extends: 'Object',
	},
	{
		name: 'Audio',
		category: 'vocab.object',
		extends: 'Document',
	},
	{
		name: 'Document',
		category: 'vocab.object',
		extends: 'Object',
	},
	{
		name: 'Event',
		category: 'vocab.object',
		extends: 'Object',
	},
	{
		name: 'Image',
		category: 'vocab.object',
		extends: 'Document',
	},
	{
		name: 'Note',
		category: 'vocab.object',
		extends: 'Object',
	},
	{
		name: 'Page',
		category: 'vocab.object',
		extends: 'Document',
	},
	{
		name: 'Place',
		category: 'vocab.object',
		extends: 'Object',
		properties: ['accuracy', 'altitude', 'latitude', 'longitude', 'radius', 'units'],
	},
	{
		name: 'Profile',
		category: 'vocab.object',
		extends: 'Object',
		properties: ['describes'],
	},
	{
		name: 'Relationship',
		category: 'vocab.object',
		extends: 'Object',
		properties: ['subject', 'object', 'relationship'],
	},
	{
		name: 'Tombstone',
		category: 'vocab.object',
		extends: 'Object',
		properties: ['formerType', 'deleted'],
	},
	{
		name: 'Video',
		category: 'vocab.object',
		extends: 'Document',
	},
	{
		name: 'Mention',
		category: 'vocab.link',
		extends: 'Link',
	},
	{
		name: 'id',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: 'xsd:anyURI',
		functional: true,
	},
	{
		name: 'type',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: 'xsd:anyURI',
		functional: false,
	},
	{
		name: 'actor',
		category: 'vocab.property',
		domain: 'Activity',
		range: ['Object', 'Link'],
		subpropertyOf: 'attributedTo',
		functional: false,
	},
	{
		name: 'attachment',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'attributedTo',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'audience',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'bcc',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'bto',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'cc',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'context',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'current',
		category: 'vocab.property',
		domain: 'Collection',
		range: ['CollectionPage', 'Link'],
		functional: true,
	},
	{
		name: 'first',
		category: 'vocab.property',
		domain: 'Collection',
		range: ['CollectionPage', 'Link'],
		functional: true,
	},
	{
		name: 'generator',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'icon',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Image', 'Link'],
		functional: false,
	},
	{
		name: 'image',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Image', 'Link'],
		functional: false,
	},
	{
		name: 'inReplyTo',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'instrument',
		category: 'vocab.property',
		domain: 'Activity',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'last',
		category: 'vocab.property',
		domain: 'Collection',
		range: ['CollectionPage', 'Link'],
		functional: true,
	},
	{
		name: 'location',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'items',
		category: 'vocab.property',
		domain: 'Collection',
		range: ['Object', 'Link', 'OrderedCollection<Object|Link>'],
		functional: false,
	},
	{
		name: 'orderedItems',
		category: 'vocab.property',
		domain: 'Collection',
		range: ['Object', 'Link', 'OrderedCollection<Object|Link>'],
		functional: false,
	},
	{
		name: 'oneOf',
		category: 'vocab.property',
		domain: 'Question',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'anyOf',
		category: 'vocab.property',
		domain: 'Question',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'closed',
		category: 'vocab.property',
		domain: 'Question',
		range: ['Object', 'Link', 'xsd:dateTime', 'xsd:boolean'],
		functional: false,
	},
	{
		name: 'origin',
		category: 'vocab.property',
		domain: 'Activity',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'next',
		category: 'vocab.property',
		domain: 'CollectionPage',
		range: ['CollectionPage', 'Link'],
		functional: true,
	},
	{
		name: 'object',
		category: 'vocab.property',
		domain: ['Activity', 'Relationship'],
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'prev',
		category: 'vocab.property',
		domain: 'CollectionPage',
		range: ['CollectionPage', 'Link'],
		functional: true,
	},
	{
		name: 'preview',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'result',
		category: 'vocab.property',
		domain: 'Activity',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'replies',
		category: 'vocab.property',
		domain: 'Object',
		range: 'Collection',
		functional: true, // TODO the owl code says this is NOT functional
	},
	{
		name: 'tag',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'target',
		category: 'vocab.property',
		domain: 'Activity',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'to',
		category: 'vocab.property',
		domain: 'Object',
		range: ['Object', 'Link'],
		functional: false,
	},
	{
		name: 'url',
		category: 'vocab.property',
		domain: 'Object',
		range: ['xsd:anyURI', 'Link'],
		functional: false,
	},
	{
		name: 'accuracy',
		category: 'vocab.property',
		domain: 'Place',
		range: 'xsd:float [>= 0.0f, <= 100.0f]',
		functional: true,
	},
	{
		name: 'altitude',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:float',
		functional: true,
	},
	{
		name: 'content',
		category: 'vocab.property',
		domain: 'Object',
		range: ['xsd:string', 'rdf:langString'],
		functional: false,
	},
	{
		name: 'name',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: ['xsd:string', 'rdf:langString'],
		functional: false,
	},
	{
		name: 'duration',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:duration',
		functional: true,
	},
	{
		name: 'height',
		category: 'vocab.property',
		domain: 'Link',
		range: 'xsd:nonNegativeInteger',
		functional: true,
	},
	{
		name: 'href',
		category: 'vocab.property',
		domain: 'Link',
		range: 'xsd:anyURI',
		functional: true,
	},
	{
		name: 'hreflang',
		category: 'vocab.property',
		domain: 'Link',
		range: '[BCP47] Language Tag',
		functional: true,
	},
	{
		name: 'partOf',
		category: 'vocab.property',
		domain: 'CollectionPage',
		range: ['Collection', 'Link'],
		functional: true,
	},
	{
		name: 'latitude',
		category: 'vocab.property',
		domain: 'Place',
		range: 'xsd:float',
		functional: true,
	},
	{
		name: 'longitude',
		category: 'vocab.property',
		domain: 'Place',
		range: 'xsd:float',
		functional: true,
	},
	{
		name: 'mediaType',
		category: 'vocab.property',
		domain: ['Object', 'Link'],
		range: 'MIME Media Type',
		functional: true,
	},
	{
		name: 'endTime',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:dateTime',
		functional: true,
	},
	{
		name: 'published',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:dateTime',
		functional: true,
	},
	{
		name: 'startTime',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:dateTime',
		functional: true,
	},
	{
		name: 'radius',
		category: 'vocab.property',
		domain: 'Place',
		range: 'xsd:float [>= 0.0f]',
		functional: true,
	},
	{
		name: 'rel',
		category: 'vocab.property',
		domain: 'Link',
		range: '[RFC5988] or [HTML5] Link Relation',
		functional: false,
	},
	{
		name: 'startIndex',
		category: 'vocab.property',
		domain: 'OrderedCollectionPage',
		range: 'xsd:nonNegativeInteger',
		functional: true,
	},
	{
		name: 'summary',
		category: 'vocab.property',
		domain: 'Object',
		range: ['xsd:string', 'rdf:langString'],
		functional: false,
	},
	{
		name: 'totalItems',
		category: 'vocab.property',
		domain: 'Collection',
		range: 'xsd:nonNegativeInteger',
		functional: true,
	},
	{
		name: 'units',
		category: 'vocab.property',
		domain: 'Place',
		range: ['cm', 'feet', 'inches', 'km', 'm', 'miles', 'xsd:anyURI'],
		functional: true,
	},
	{
		name: 'updated',
		category: 'vocab.property',
		domain: 'Object',
		range: 'xsd:dateTime',
		functional: true,
	},
	{
		name: 'width',
		category: 'vocab.property',
		domain: 'Link',
		range: 'xsd:nonNegativeInteger',
		functional: true,
	},
	{
		name: 'subject',
		category: 'vocab.property',
		domain: 'Relationship',
		range: ['Object', 'Link'],
		functional: true,
	},
	{
		name: 'relationship',
		category: 'vocab.property',
		domain: 'Relationship',
		range: 'Object',
		functional: false,
	},
	{
		name: 'describes',
		category: 'vocab.property',
		domain: 'Profile',
		range: 'Object',
		functional: true,
	},
	{
		name: 'formerType',
		category: 'vocab.property',
		domain: 'Tombstone',
		range: 'Object',
		functional: true, // this is an error in the docs I think - the owl code says it's functional, and it seems it should be
	},
	{
		name: 'deleted',
		category: 'vocab.property',
		domain: 'Tombstone',
		range: 'xsd:dateTime',
		functional: true,
	},
];

export const lookupVocabularyItem = (
	names: string | string[],
	items: VocabularyItem[],
): VocabularyItem =>
	(typeof names === 'string'
		? items.find((i) => i.name === names)
		: items.find((i) => names.includes(i.name)))!;

// Mutates `items` to derive and populate `extendedBy`.
const addExtendedBy = (items: VocabularyItem[]) => {
	for (const item of items) {
		if ('extends' in item && item.extends) {
			const extended = lookupVocabularyItem(item.extends, items) as VocabularyType;
			if (!extended.extendedBy) {
				extended.extendedBy = [item];
			} else if (!extended.extendedBy.includes(item)) {
				extended.extendedBy.push(item);
			}
		}
	}
};
addExtendedBy(vocabulary);
