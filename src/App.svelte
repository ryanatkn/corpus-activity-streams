<script lang="ts">
	import {vocabulary} from 'src/vocabulary.js';
	import TabbedView from 'src/TabbedView.svelte';
	import TiledView from 'src/TiledView.svelte';
	import GitHubLink from 'src/GitHubLink.svelte';
	import {provideComponents} from 'src/components.js';
	import type {Components} from 'src/components.js';
	import Link from 'src/Link.svelte';
	import EntityLink from 'src/EntityLink.svelte';

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
