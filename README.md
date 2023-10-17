# corpus-activity-streams

> alternative docs for
> [ActivityStreams 2.0 vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/)

> **important**: this project has data in a lossy basic JSON form, not the full JSON-LD dataset;
> for the full dataset I recommend [go-fed/activity](https://github.com/go-fed/activity) and its
> [activitystreams.jsonld](https://github.com/go-fed/activity/blob/master/astool/activitystreams.jsonld).
> also, it's [non-normative](https://github.com/w3c/activitystreams/issues/516#issuecomment-805937131)
> and the spec authors
> [intentionally do not publish](https://github.com/w3c/activitystreams/issues/416#issuecomment-1552189009)
> a machine-readable vocabulary

[ActivityStreams spec](https://www.w3.org/TR/activitystreams-vocabulary/),
[w3c/activitystreams](https://github.com/w3c/activitystreams)

## website[🕸️](https://ryanatkn.github.io/corpus-activity-streams)

**[ryanatkn.github.io/corpus-activity-streams](https://ryanatkn.github.io/corpus-activity-streams)**

## compared to [the spec](https://www.w3.org/TR/activitystreams-vocabulary/)

This project's data was assembled by hand from both
[the ActivityStreams website](https://www.w3.org/TR/activitystreams-vocabulary/) and
[the w3c OWL file](https://github.com/w3c/activitystreams/blob/master/vocabulary/activitystreams2.owl).

The data also includes `Item`, a term not used in
[the ActivityStreams spec](https://www.w3.org/TR/activitystreams-vocabulary/).
The spec refers to "entity" informally, and `item` is the same concept.
The properties are inferred from what `Object` and `Link` share.
For a spec-compliant dataset,
I recommend [go-fed/activity](https://github.com/go-fed/activity) and its
[activitystreams.jsonld](https://github.com/go-fed/activity/blob/master/astool/activitystreams.jsonld).

## develop

```bash
npm i
# then
npm run dev
# or
gro dev # npm i -g @grogarden/gro
```

> learn more about [Gro](https://github.com/grogarden/gro)

## build

```bash
npm run build
# or
gro build
```

## deploy

[Deploy](https://github.com/grogarden/gro/blob/main/src/docs/deploy.md)
(build, commit, and push) to the `deploy` branch, e.g. for GitHub Pages:

```bash
npm run deploy
# or
gro deploy
```

## license 🐦

public domain ([The Unlicense](license))
