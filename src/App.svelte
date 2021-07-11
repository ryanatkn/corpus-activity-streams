<script lang="ts">
	import {vocabulary} from './vocabulary.js';
	import TabbedView from './TabbedView.svelte';
	import TiledView from './TiledView.svelte';
	import GitHubLink from './GitHubLink.svelte';
	import {provideComponents} from './components.js';
	import type {Components} from './components.js';
	import Link from './Link.svelte';
	import EntityLink from './EntityLink.svelte';

	let view = TiledView || TabbedView;
	type DefaultComponents = 'Link' | 'EntityLink';

	const toDefaultComponents = (): Components<DefaultComponents> => ({
		Link,
		EntityLink,
	});

	provideComponents(toDefaultComponents());
</script>

<div class="app">
	<!-- TODO nav? -->
	<GitHubLink />
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
