# corpus-activity-streams

> [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)
> data and alternative docs

> **important**: this project is unofficial and
> [non-normative](https://github.com/w3c/activitystreams/issues/516#issuecomment-805937131)

> spec: [w3c/activitystreams](https://github.com/w3c/activitystreams)

## website[🕸️](https://ryanatkn.github.io/corpus-activity-streams)

<https://ryanatkn.github.io/corpus-activity-streams>

## useful data & modules

- data:
  - [src/activity_streams_vocabulary.json](/src/activity_streams_vocabulary.json):
    the vocabulary items
  - [src/activity_streams_notes.json](/src/activity_streams_notes.json):
    the `notes` property of the vocabulary items and
    [the parsed AST](/src/activity_streams_notes_ast.json)
  - [src/activity_streams_examples.json](/src/activity_streams_examples.json):
    the examples data and
    [the parsed AST](/src/activity_streams_examples_ast.json)
- [src/activity_streams.ts](/src/activity_streams.ts): vocabulary types
- [src/vocabulary.ts](/src/vocabulary.ts): all of the vocab data collections

## compared to the spec

This project's data was assembled by hand from both
[the ActivityStreams website](https://www.w3.org/TR/activitystreams-vocabulary/) and
[the w3c OWL spec](https://github.com/w3c/activitystreams/blob/master/vocabulary/activitystreams2.owl).

The data also includes `Entity`, a term used only informally in the spec.
The properties are inferred from what `Object` and `Link` share.

## todo

- generate JSON schema for each term (see the in-progress branch
  [**schema**](https://github.com/ryanatkn/corpus-activity-streams/tree/schema))
  - use JSON schemas to generate types with
    [`json-schema-to-typescript`](https://github.com/bcherny/json-schema-to-typescript)
  - generate fakes and other things too
- Export modules correctly and publish to npm.
- Make it usable on smaller screens. Collapse columns to tabs, probably.
- More data than just the vocabulary?
  See [ActivityPub](https://www.w3.org/TR/activitypub/) and
  [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/).
- More and better views! And then some way manage them.
- Somehow display the
  [other examples](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_examples.ts#L1426).

## develop

```bash
# node >=14.16
npm i
npm test # everything should look ok
npm start # browse to localhost:8999 or whatever it says
```

should look the same as the deployed version:
[ryanatkn.github.io/corpus-activity-streams](https://ryanatkn.github.io/corpus-activity-streams)

## license 🐦

public domain ([The Unlicense](license))
