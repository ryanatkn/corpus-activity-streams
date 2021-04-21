<script lang="ts">
	import type {MarkupNode} from './markup.js';
	import Markup from './Markup.svelte';

	// TODO maybe replace this with `Tag` markup type or something

	export let node: MarkupNode;
</script>

<pre>
  <Markup {node} />
</pre>
