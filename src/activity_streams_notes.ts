// TODO should this go in "./fixtures/*" or something?

// https://www.w3.org/TR/activitystreams-core/
// https://www.w3.org/TR/activitystreams-vocabulary/
// https://www.w3.org/TR/activitypub/

// TODO this improve this, should be a record - only added annotation b/c Svelte template gave error
type VocabularyNotes = {[key: string]: string};

export const vocabularyNotes: VocabularyNotes = {
	Entity: 'The `Entity` is the base of all of types.',
	Object:
		'Describes an object of any kind. The `Object` type serves as the base type for most of the other kinds of objects defined in the Activity Vocabulary, including other Core types such as `Activity`, `IntransitiveActivity`, `Collection` and `OrderedCollection`.',
	Link:
		'A `Link` is an indirect, qualified reference to a resource identified by a URL. The fundamental model for links is established by [ <a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-RFC5988">RFC5988</a>]. Many of the properties defined by the Activity Vocabulary allow values that are either instances of `Object` or `Link`. When a `Link` is used, it establishes a <a href="http://patterns.dataincubator.org/book/qualified-relation.html">qualified relation</a> connecting the subject (the containing object) to the resource identified by the `href`. Properties of the `Link` are properties of the reference as opposed to properties of the resource.',
	Activity:
		'An `Activity` is a subtype of `Object` that describes some form of action that may happen, is currently happening, or has already happened. The `Activity` type itself serves as an abstract base type for all types of activities. It is important to note that the `Activity` type itself does not carry any specific semantics about the kind of action being taken.',
	IntransitiveActivity:
		'Instances of `IntransitiveActivity` are a subtype of `Activity` representing intransitive actions. The `object` property is therefore inappropriate for these activities.',
	Collection:
		'A `Collection` is a subtype of `Object` that represents ordered or unordered sets of `Object` or `Link` instances. Refer to the <a href="https://www.w3.org/TR/activitystreams-core/#collection">Activity Streams 2.0 Core</a> specification for a complete description of the `Collection` type.',
	OrderedCollection:
		'A subtype of `Collection` in which members of the logical collection are assumed to always be strictly ordered.',
	CollectionPage:
		'Used to represent distinct subsets of items from a `Collection`. Refer to the <a href="https://www.w3.org/TR/activitystreams-core/#dfn-collectionpage">Activity Streams 2.0 Core</a> for a complete description of the `CollectionPage` object.',
	OrderedCollectionPage:
		'Used to represent ordered subsets of items from an `OrderedCollection`. Refer to the <a href="https://www.w3.org/TR/activitystreams-core/#dfn-orderedcollectionpage">Activity Streams 2.0 Core</a> for a complete description of the `OrderedCollectionPage` object.',
	Accept:
		'Indicates that the `actor` accepts the `object`. The `target` property can be used in certain circumstances to indicate the context into which the `object` has been accepted.',
	Add:
		'Indicates that the `actor` has added the `object` to the `target`. If the `target` property is not explicitly specified, the target would need to be determined implicitly by context. The `origin` can be used to identify the context from which the `object` originated.',
	Announce:
		"Indicates that the `actor` is calling the `target`'s attention the `object`. The `origin` typically has no defined meaning.",
	Arrive:
		'An `IntransitiveActivity` that indicates that the `actor` has arrived at the `location`. The `origin` can be used to identify the context from which the `actor` originated. The `target` typically has no defined meaning.',
	Block:
		'Indicates that the `actor` is blocking the `object`. Blocking is a stronger form of `Ignore`. The typical use is to support social systems that allow one user to block activities or content of other users. The `target` and `origin` typically have no defined meaning.',
	Create: 'Indicates that the `actor` has created the `object`.',
	Delete:
		'Indicates that the `actor` has deleted the `object`. If specified, the `origin` indicates the context from which the `object` was deleted.',
	Dislike: 'Indicates that the `actor` dislikes the `object`.',
	Flag:
		'Indicates that the `actor` is "flagging" the `object`. Flagging is defined in the sense common to many social platforms as reporting content as being inappropriate for any number of reasons.',
	Follow:
		'Indicates that the `actor` is "following" the `object`. Following is defined in the sense typically used within Social systems in which the actor is interested in any activity performed by or on the object. The `target` and `origin` typically have no defined meaning.',
	Ignore:
		'Indicates that the `actor` is ignoring the `object`. The `target` and `origin` typically have no defined meaning.',
	Invite:
		'A specialization of `Offer` in which the `actor` is extending an invitation for the `object` to the `target`.',
	Join:
		'Indicates that the `actor` has joined the `object`. The `target` and `origin` typically have no defined meaning.',
	Leave:
		'Indicates that the `actor` has left the `object`. The `target` and `origin` typically have no meaning.',
	Like:
		'Indicates that the `actor` likes, recommends or endorses the `object`. The `target` and `origin` typically have no defined meaning.',
	Listen: 'Indicates that the `actor` has listened to the `object`.',
	Move:
		'Indicates that the `actor` has moved `object` from `origin` to `target`. If the `origin` or `target` are not specified, either can be determined by context.',
	Offer:
		'Indicates that the `actor` is offering the `object`. If specified, the `target` indicates the entity to which the `object` is being offered.',
	Question:
		'Represents a question being asked. Question objects are an extension of `IntransitiveActivity`. That is, the `Question` object is an `Activity`, but the direct object is the question itself and therefore it would not contain an `object` property. Either of the `anyOf` and `oneOf` properties MAY be used to express possible answers, but a Question object MUST NOT have both properties.',
	Reject:
		'Indicates that the `actor` is rejecting the `object`. The `target` and `origin` typically have no defined meaning.',
	Read: 'Indicates that the `actor` has read the `object`.',
	Remove:
		'Indicates that the `actor` is removing the `object`. If specified, the `origin` indicates the context from which the `object` is being removed.',
	TentativeReject: 'A specialization of `Reject` in which the rejection is considered tentative.',
	TentativeAccept: 'A specialization of `Accept` indicating that the acceptance is tentative.',
	Travel:
		'Indicates that the `actor` is traveling to `target` from `origin`. `Travel` is an `IntransitiveObject` whose `actor` specifies the direct object. If the `target` or `origin` are not specified, either can be determined by context.',
	Undo:
		'Indicates that the `actor` is undoing the `object`. In most cases, the `object` will be an `Activity` describing some previously performed action (for instance, a person may have previously "liked" an article but, for whatever reason, might choose to undo that like at some later point in time). The `target` and `origin` typically have no defined meaning.',
	Update:
		'Indicates that the `actor` has updated the `object`. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to `object`. The `target` and `origin` typically have no defined meaning.',
	View: 'Indicates that the `actor` has viewed the `object`.',
	Application: 'Describes a software application.',
	Group: 'Represents a formal or informal collective of Actors.',
	Organization: 'Represents an organization.',
	Person: 'Represents an individual person.',
	Service: 'Represents a service of any kind.',
	Article: 'Represents any kind of multi-paragraph written work.',
	Audio: 'Represents an audio document of any kind.',
	Document: 'Represents a document of any kind.',
	Event: 'Represents any kind of event.',
	Image: 'Represents an image document of any kind.',
	Note: 'Represents a short written work typically less than a single paragraph in length.',
	Page: 'Represents a Web Page.',
	Place:
		'Represents a logical or physical location. See <a href="https://www.w3.org/TR/activitystreams-vocabulary/#places">5.3 Representing Places</a> for additional information.',
	Profile:
		'A `Profile` is a content object that describes another `Object`, typically used to describe `Actor Type` objects. The `describes` property is used to reference the object being described by the profile.',
	Relationship:
		'Describes a relationship between two individuals. The `subject` and `object` properties are used to identify the connected individuals. <a href="https://www.w3.org/TR/activitystreams-vocabulary/#connections">See 5.2 Representing Relationships Between Entities</a> for additional information.',
	Tombstone:
		'A `Tombstone` represents a content object that has been deleted. It can be used in `Collection`s to signify that there used to be an object at this position, but it has been deleted.',
	Video: 'Represents a video document of any kind.',
	Mention: 'A specialized `Link` that represents an @mention.',
	id: 'Provides the globally unique identifier for an `Object` or `Link`.',
	type: 'Identifies the `Object` or `Link` type. Multiple values may be specified.',
	actor:
		'Describes one or more entities that either performed or are expected to perform the activity. Any single activity can have multiple `actor`s. The `actor` MAY be specified using an indirect `Link`.',
	attachment:
		'Identifies a resource attached or related to an object that potentially requires special handling. The intent is to provide a model that is at least semantically similar to attachments in email.',
	attributedTo:
		'Identifies one or more entities to which this object is attributed. The attributed entities might not be Actors. For instance, an object might be attributed to the completion of another activity. ',
	audience:
		'Identifies one or more entities that represent the total population of entities for which the object can considered to be relevant.',
	bcc:
		'Identifies one or more Objects that are part of the private secondary audience of this Object.',
	bto: 'Identifies an Object that is part of the private primary audience of this Object.',
	cc: 'Identifies an Object that is part of the public secondary audience of this Object.',
	context:
		'Identifies the context within which the object exists or an activity was performed. The notion of "context" used is intentionally vague. The intended function is to serve as a means of grouping objects and activities that share a common originating context or purpose. An example could be all activities relating to a common project or event.',
	current:
		'In a paged `Collection`, indicates the page that contains the most recently updated member items.',
	first:
		'In a paged `Collection`, indicates the furthest preceeding page of items in the collection.',
	generator: 'Identifies the entity (e.g. an application) that generated the object.',
	icon:
		'Indicates an entity that describes an icon for this object. The image should have an aspect ratio of one (horizontal) to one (vertical) and should be suitable for presentation at a small size.',
	image:
		'Indicates an entity that describes an image for this object. Unlike the icon property, there are no aspect ratio or display size limitations assumed.',
	inReplyTo: 'Indicates one or more entities for which this object is considered a response.',
	instrument:
		'Identifies one or more objects used (or to be used) in the completion of an `Activity`.',
	last: 'In a paged `Collection`, indicates the furthest proceeding page of the collection.',
	location: 'Indicates one or more physical or logical locations associated with the object.',
	items: 'Identifies the items contained in a collection. The items might be ordered or unordered.',
	orderedItems: 'Identifies the items contained in a collection. The items are unordered.',
	oneOf:
		'Identifies an exclusive option for a `Question`. Use of `oneOf` implies that the `Question` can have only a single answer. To indicate that a `Question` can have multiple answers, use `anyOf`.',
	anyOf:
		'Identifies an inclusive option for a `Question`. Use of `anyOf` implies that the `Question` can have multiple answers. To indicate that a `Question` can have only one answer, use `oneOf`.',
	closed: 'Indicates that a question has been closed, and answers are no longer accepted.',
	origin:
		'Describes an indirect object of the activity from which the activity is directed. The precise meaning of the origin is the object of the English preposition "from". For instance, in the activity "John moved an item to List B from List A", the origin of the activity is "List A".',
	next: 'In a paged `Collection`, indicates the next page of items.',
	object:
		'When used within an `Activity`, describes the direct object of the activity. For instance, in the activity "John added a movie to his wishlist", the object of the activity is the movie added. When used within a `Relationship` describes the entity to which the `subject` is related.',
	prev: 'In a paged `Collection`, identifies the previous page of items.',
	preview: 'Identifies an entity that provides a preview of this object.',
	result:
		'Describes the result of the activity. For instance, if a particular action results in the creation of a new resource, the result property can be used to describe that new resource.',
	replies:
		'Identifies a `Collection` containing objects considered to be responses to this object.',
	tag:
		'One or more "tags" that have been associated with an objects. A `tag` can be any kind of `Object`. The key difference between `attachment` and `tag` is that the former implies association by inclusion, while the latter implies associated by reference.',
	target:
		'Describes the indirect object, or target, of the activity. The precise meaning of the target is largely dependent on the type of action being described but will often be the object of the English preposition "to". For instance, in the activity "John added a movie to his wishlist", the target of the activity is John\'s wishlist. An activity can have more than one target.',
	to: 'Identifies an entity considered to be part of the public primary audience of an `Object`.',
	url: 'Identifies one or more links to representations of the object.',
	accuracy:
		'Indicates the accuracy of position coordinates on a `Place` objects. Expressed in properties of percentage. e.g. "94.0" means "94.0% accurate".',
	altitude:
		'Indicates the altitude of a place. The measurement units is indicated using the `units` property. If `units` is not specified, the default is assumed to be "m" indicating meters.',
	content:
		'The content or textual representation of the `Object` encoded as a JSON string. By default, the value of `content` is HTML. The `mediaType` property can be used in the object to indicate a different content type. The content MAY be expressed using multiple language-tagged values.',
	name:
		'A simple, human-readable, plain-text name for the object. HTML markup MUST NOT be included. The name MAY be expressed using multiple language-tagged values.',
	duration:
		'When the object describes a time-bound resource, such as an audio or video, a meeting, etc, the `duration` property indicates the object\'s approximate duration. The value MUST be expressed as an `xsd:duration` as defined by [ <a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-xmlschema11-2">xmlschema11-2</a>], section 3.3.6 (e.g. a period of 5 seconds is represented as "PT5S").',
	height:
		'On a `Link`, specifies a hint as to the rendering height in device-independent pixels of the linked resource.',
	href: 'The target resource pointed to by a `Link`',
	hreflang:
		'Hints as to the language used by the target resource. Value MUST be a [<a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-BCP47">BCP47</a>] Language-Tag.',
	partOf: 'Identifies the `Collection` to which a `CollectionPage` objects items belong.',
	latitude: 'The latitude of a place',
	longitude: 'The longitude of a place',
	mediaType:
		'When used on a `Link`, identifies the MIME media type of the referenced resource. When used on an `Object`, identifies the MIME media type of the value of the `content` property. If not specified, the `content` property is assumed to contain text/html content.',
	endTime:
		'The date and time describing the actual or expected ending time of the object. When used with an `Activity` object, for instance, the `endTime` property specifies the moment the activity concluded or is expected to conclude.',
	published: 'The date and time at which the object was published',
	startTime:
		'The date and time describing the actual or expected starting time of the object. When used with an `Activity` object, for instance, the `startTime` property specifies the moment the activity began or is scheduled to begin.',
	radius:
		'The radius from the given `latitude` and `longitude` for a `Place`. The units is expressed by the `units` property. If `units` is not specified, the default is assumed to be "m" indicating "meters".',
	rel:
		'A link relation associated with a `Link`. The value MUST conform to both the [<a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-HTML5">HTML5</a>] and [<a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-RFC5988">RFC5988</a>] "link relation" definitions. In the [<a href="https://www.w3.org/TR/activitystreams-vocabulary/#bib-HTML5">HTML5</a>], any string not containing the "space" U+0020, "tab" (U+0009), "LF" (U+000A), "FF" (U+000C), "CR" (U+000D) or "," (U+002C) characters can be used as a valid link relation.',
	startIndex:
		'A non-negative integer value identifying the relative position within the logical view of a strictly ordered collection.',
	summary:
		'A natural language summarization of the object encoded as HTML. Multiple language tagged summaries MAY be provided.',
	totalItems:
		'A non-negative integer specifying the total number of objects contained by the logical view of the collection. This number might not reflect the actual number of items serialized within the `Collection` object instance.',
	units:
		'Specifies the measurement units for the `radius` and `altitude` properties on a `Place` object. If not specified, the default is assumed to be "m" for "meters".',
	updated: 'The date and time at which the object was updated',
	width:
		'On a `Link`, specifies a hint as to the rendering width in device-independent pixels of the linked resource.',
	subject:
		'On a `Relationship` object, the `subject` property identifies one of the connected individuals. For instance, for a `Relationship` object describing "John is related to Sally", `subject` would refer to John.',
	relationship:
		'On a `Relationship` object, the `relationship` property identifies the kind of relationship that exists between `subject` and `object`.',
	describes:
		'On a `Profile` object, the `describes` property identifies the object described by the `Profile`.',
	formerType:
		'On a `Tombstone` object, the `formerType` property identifies the type of the object that was deleted.',
	deleted:
		'On a `Tombstone` object, the `deleted` property is a timestamp for when the object was deleted.',
};
