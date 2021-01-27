<script>
	import {vocabulary} from './vocabulary.js';

	// one of these two is required
	export let entity = null;
	export let name = null;

	$: ent = name ? vocabulary.byName[name] : entity;

	const colors = {
		'vocab.core': '#dfe8f7',
		'vocab.object': '#e6dff7',
		'vocab.link': '#e6dff7',
		'vocab.property': '#e3f4f7',
		'vocab.activity': '#f2dff7',
		'vocab.actor': '#f7dfe9',
	};

	$: color = colors[ent.category];
</script>

<a class="entity-link" href="#{ent.name}">
	<slot entity={ent} {color}><code style="background-color: {color};"> {ent.name} </code></slot>
</a>

<style>
	code {
		padding: 0 3px;
		margin: 3px;
		border-radius: 3px;
		line-height: 20px;
	}
</style>
