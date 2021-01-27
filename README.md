# corpus-activity-streams

> **[ryanatkn.github.io/corpus-activity-streams](https://ryanatkn.github.io/corpus-activity-streams)**: data and components for [Activity Streams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)

## develop

```bash
npm i
npm run setup # needed the first time (TODO remove this step)
npm start # or `gro dev` with global install: `npm i -g @feltcoop/gro`
# browse to localhost:8999 or whatever it says
```

## todo

- Currently this uses an inefficient codegen solution (that was quick to implement!)
  to output Svelte components to `src/notes`, bloating the JS payload,
  but all it's doing is injecting the `EntityLink` Svelte components into otherwise plain HTML.
  The app should parse and render the data at runtime instead of generating components,
  unless there's something more clever that can be done with codegen.

## license 🐦

[MIT](LICENSE)
