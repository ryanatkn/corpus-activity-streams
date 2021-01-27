# corpus-activity-streams

> [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) data and alternative docs

## website🕸️

<https://ryanatkn.github.io/corpus-activity-streams>

## useful modules

- [src/activity_streams.ts](src/activity_streams.ts): vocabulary types and pimary data
- [src/activity_streams_notes.ts](src/activity_streams_notes.ts):
  the `notes` property of the vocabulary items
- [src/activity_streams_examples.ts](src/activity_streams_examples.ts):
  the vocabulary examples data
- [src/vocabulary.ts](src/vocabulary.ts): all of the vocab data collections

## todo

- Make it usable on smaller screens. Collapse columns to tabs, probably.
- More data than just the vocabulary?
  See [ActivityPub](https://www.w3.org/TR/activitypub/) and
  [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/).
- More and better views! And then some way manage them.
- Clicking #hashlinks navigates like you'd expect, but browser nav backward/forward doesn't work.
- Make it more usable as a library.
  Right now, developer users must import individual TypeScript modules.
  It should be published in a more standard npm-friendly way.
- Somehow display the
  [other examples](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_examples.ts#L1426)
- It currently uses a harshly inefficient codegen solution
  (that was
  [quick to implement](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_notes_html.gen.ts)
  !)
  to output Svelte components to `src/notes`, bloating the JS payload.
  All it's doing is injecting the `EntityLink` Svelte components into otherwise plain HTML,
  so unless there's something more clever that can be done with codegen,
  the app should render notes from data at runtime instead of generating components.

## develop

```bash
# node 14+
npm i
npm run setup # needed the first time (TODO remove this step)
npm start # or `gro dev` with global install: `npm i -g @feltcoop/gro`
# browse to localhost:8999 or whatever it says
```

should look the same as the deployed version:
[ryanatkn.github.io/corpus-activity-streams](https://ryanatkn.github.io/corpus-activity-streams)

## license 🐦

[MIT](LICENSE)
