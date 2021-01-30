# corpus-activity-streams

> [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) data and alternative docs

## website[🕸️](https://ryanatkn.github.io/corpus-activity-streams)

<https://ryanatkn.github.io/corpus-activity-streams>

## useful data & modules

- [src/activity_streams.json](src/activity_streams.json): vocabulary JSON data
- [src/activity_streams_examples.json](src/activity_streams_examples.json): examples JSON data
- [src/vocabulary.ts](src/vocabulary.ts): all of the vocab data collections
- [src/activity_streams.ts](src/activity_streams.ts): vocabulary pimary data and types
- [src/activity_streams_notes.ts](src/activity_streams_notes.ts):
  the `notes` property of the vocabulary items
- [src/activity_streams_examples.ts](src/activity_streams_examples.ts):
  the vocabulary examples data

## compared to the spec

This project's data was assembled by hand from both
[the ActivityStreams website](https://www.w3.org/TR/activitystreams-vocabulary/) and
[the w3c OWL spec](https://github.com/w3c/activitystreams/blob/master/vocabulary/activitystreams2.owl).

The data also includes `Entity`, a term used only informally in the spec.
The properties are inferred from what `Object` and `Link` share.

## todo

- Make it more usable as a library.
  Right now, developer users must import individual TypeScript modules.
  It should be published in a more standard npm-friendly way.
- Make it usable on smaller screens. Collapse columns to tabs, probably.
- More data than just the vocabulary?
  See [ActivityPub](https://www.w3.org/TR/activitypub/) and
  [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/).
- More and better views! And then some way manage them.
- Somehow display the
  [other examples](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_examples.ts#L1426).
- It currently uses a harshly inefficient codegen solution
  (that was
  [quick to implement](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_notes_html.gen.ts)!)
  to output Svelte components to `src/notes`, bloating the JS payload.
  All it's doing is injecting the `EntityLink` Svelte components into otherwise plain HTML,
  so unless there's something more clever that can be done with codegen,
  the app should render notes from data at runtime instead of generating components.

## develop

```bash
# node 14+
npm i
npm run setup # needed the first time (TODO remove this step)
npm start
# browse to localhost:8999 or whatever it says
```

should look the same as the deployed version:
[ryanatkn.github.io/corpus-activity-streams](https://ryanatkn.github.io/corpus-activity-streams)

## license 🐦

[MIT](LICENSE)
