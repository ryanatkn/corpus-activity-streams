<script lang="ts">
	import {vocabulary} from './vocabulary.js';
	import {hoveredEntity} from './entities.js';
	import type {VocabularyItem} from './activity_streams.js';

	// one of these two is required
	export let entity: VocabularyItem | null = null;
	export let name: string | null = null;

	if (!entity && !name) throw Error('Expected an entity or a name');

	$: ent = name ? vocabulary.byName[name] : entity!;

	$: hovered = ent && ent === $hoveredEntity;

	const colors = {
		'vocab.core': 123,
		'vocab.object': 195,
		'vocab.link': 195,
		'vocab.property': 51,
		'vocab.activity': 267,
		'vocab.actor': 339,
	};

	const saturation = '43%';
	$: hue = colors[ent.category];
	$: color = `hsl(${hue}, ${saturation}, 93%)`;
	$: hoveredColor = `hsl(${hue}, ${saturation}, 87%)`;
	$: pressedColor = `hsl(${hue}, ${saturation}, 82%)`;

	// TODO is there a significantly more efficient
	// way to do this than listening to these events?
	// there's 1270 instances of this component at last count lol
</script>

<a
	class="entity-link"
	class:hovered
	style="--color: {color}; --hovered-color: {hoveredColor}; --pressed-color: {pressedColor};"
	href="#{ent.name}"
	on:mouseenter={() => {
		$hoveredEntity = ent;
	}}
	on:mouseleave={() => {
		$hoveredEntity = null;
	}}
>
	<slot entity={ent} {color}><code> {ent.name} </code></slot>
</a>

<style>
	code {
		background-color: var(--color);
		padding: 0 3px;
		margin: 3px;
		border-radius: 3px;
		line-height: 20px;
	}
	.hovered code {
		background-color: var(--hovered-color);
	}
	.hovered code:active {
		/* TODO store pressed state and style all `EntityLinks` with the pressed entity,
		not just the sole active one */
		background-color: var(--pressed-color);
	}
</style>
