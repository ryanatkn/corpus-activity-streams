# corpus-activity-streams

> [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) data, components, and alternative docs

## live on the web🕸️

<https://ryanatkn.github.io/corpus-activity-streams>

## useful modules

- [src/vocabulary.ts](src/vocabulary.ts): all of the vocab data collections
- [src/activity_streams.ts](src/activity_streams.ts): vocabulary types and pimary data
- [src/activity_streams_notes.ts](src/activity_streams_notes.ts):
  the `notes` property of the vocabulary items
- [src/activity_streams_examples.ts](src/activity_streams_examples.ts):
  the vocabulary examples data

## todo

- Make it usable on smaller screens. Collapse columns to tabs, probably.
- Clicking #hashlinks navigates like you'd expect, but browser nav backward/forward doesn't work.
- Make it more usable as a library.
  Right now, developer users must import individual TypeScript modules.
  It should be published in a more standard npm-friendly way.
- Somehow display the
  [other examples](https://github.com/ryanatkn/corpus-activity-streams/blob/main/src/activity_streams_examples.ts#L1426)
- Currently this uses an inefficient codegen solution (that was quick to implement!)
  to output Svelte components to `src/notes`, bloating the JS payload,
  but all it's doing is injecting the `EntityLink` Svelte components into otherwise plain HTML.
  The app should parse and render the data at runtime instead of generating components,
  unless there's something more clever that can be done with codegen!
- More and better views! And then some way manage them.

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
