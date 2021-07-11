<script lang="ts">
	import {vocabulary} from 'src/vocabulary.js';
	import Tabbed_View from 'src/Tabbed_View.svelte';
	import Tiled_View from 'src/Tiled_View.svelte';
	import Github_Link from 'src/Github_Link.svelte';
	import {set_components} from 'src/components.js';
	import type {Components} from 'src/components.js';
	import Link from 'src/Link.svelte';
	import Entity_Link from 'src/Entity_Link.svelte';

	let view = Tiled_View || Tabbed_View;
	type Default_Components = 'Link' | 'Entity_Link';

	const to_default_components = (): Components<Default_Components> => ({
		Link,
		Entity_Link,
	});

	set_components(to_default_components());
</script>

<div class="app">
	<!-- TODO nav? -->
	<Github_Link />
	<div class="content">
		<svelte:component this={view} {vocabulary} />
	</div>
</div>

<style>
	.app {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
		overflow: hidden;
	}
</style>
