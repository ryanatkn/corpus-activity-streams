# corpus-activity-streams

> [ActivityStreams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)
> data and alternative docs

> **important**: this project has data in a lossy basic JSON form, not the full JSON-LD dataset;
> for the full dataset I recommend [go-fed/activity](https://github.com/go-fed/activity) and its
> [activitystreams.jsonld](https://github.com/go-fed/activity/blob/master/astool/activitystreams.jsonld).
> also, it's [non-normative](https://github.com/w3c/activitystreams/issues/516#issuecomment-805937131)

[ActivityStreams spec](https://www.w3.org/TR/activitystreams-vocabulary/),
[w3c/activitystreams](https://github.com/w3c/activitystreams)

## website[🕸️](https://ryanatkn.github.io/corpus-activity-streams)

<https://ryanatkn.github.io/corpus-activity-streams>

## useful data & modules

- data:
  - [src/lib/activity_streams_vocabulary.json](/src/lib/activity_streams_vocabulary.json):
    the vocabulary items
  - [src/lib/activity_streams_notes.json](/src/lib/activity_streams_notes.json):
    the `notes` property of the vocabulary items
  - [src/lib/activity_streams_examples.json](/src/lib/activity_streams_examples.json):
    the examples data
- [src/lib/activity_streams.ts](/src/lib/activity_streams.ts): vocabulary types
- [src/lib/vocabulary.ts](/src/lib/vocabulary.ts): all of the vocab data collections

## compared to [the spec](https://www.w3.org/TR/activitystreams-vocabulary/)

This project's data was assembled by hand from both
[the ActivityStreams website](https://www.w3.org/TR/activitystreams-vocabulary/) and
[the w3c OWL spec](https://github.com/w3c/activitystreams/blob/master/vocabulary/activitystreams2.owl).

The data also includes `Entity`, a term used only informally in
[the spec](https://www.w3.org/TR/activitystreams-vocabulary/).
The properties are inferred from what `Object` and `Link` share.
If you want a spec compliant dataset, you'll need to correct for this,
or see [go-fed/activity](https://github.com/go-fed/activity) and its
[activitystreams.jsonld](https://github.com/go-fed/activity/blob/master/astool/activitystreams.jsonld).

## todo

- generate JSON schema (maybe with [zod](https://github.com/colinhacks/zod))
  for each term (see the in-progress branch
  [**schema**](https://github.com/ryanatkn/corpus-activity-streams/tree/schema))
  - use JSON schemas to generate types with
    [`json-schema-to-typescript`](https://github.com/bcherny/json-schema-to-typescript)
  - generate fakes and other things too
- Export modules correctly and publish to npm.
- Make it usable on smaller screens. Collapse columns to tabs, probably.
- More data than just the vocabulary?
  See [ActivityPub](https://www.w3.org/TR/activitypub/) and
  [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/).
- More and better views! And then some way manage them.

## develop

```bash
npm i
# then
npm run dev
# or
gro dev # npm i -g @feltcoop/gro
```

> learn more about [Gro](https://github.com/feltcoop/gro)
> (Windows users: you'll need Linux, see the readme)

## build

```bash
npm run build
# or
gro build
```

## deploy

[Deploy](https://github.com/feltcoop/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

## license 🐦

public domain ([The Unlicense](license))
