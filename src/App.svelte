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
	:global(:root) {
		--color_gray: hsl(0, 0%, 96%);
		--color_yellow: hsl(51, 70%, 96%);
		--color_green: hsl(123, 70%, 96%);
		--color_blue: hsl(195, 70%, 96%);
		--color_purple: hsl(267, 70%, 96%);
		--color_pink: hsl(339, 70%, 96%);
		--color_yellow_bg: hsl(51, 70%, 98%);
		--color_yellow_text: rgba(75, 70, 50);
		--color_brown_text: hsl(10, 16%, 40%);
		--tab_size: 2;
	}
	/* TODO import a static css file */
	:global(html),
	:global(body) {
		height: 100%;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 16px;
		tab-size: var(--tab_size);
		-moz-tab-size: var(--tab_size);
	}
	:global(#root) {
		height: 100%;
	}
	:global(h1, h2) {
		margin: 1em 0 0.4em;
		font-weight: 300;
	}
	:global(a) {
		text-decoration: none;
		color: #444;
	}
	:global(a:hover) {
		text-decoration: underline;
	}
	.app {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
		overflow: hidden;
	}
	:global(code) {
		font-family: monospace, monospace; /* funky hack to prevent it from shrinking */
	}
	:global(*, *:before, *:after) {
		box-sizing: border-box;
	}
	:global(pre) {
		background-color: var(--color_yellow_bg);
		color: var(--color_yellow_text);
		padding: 4px;
		overflow: hidden; /* maybe `auto`, but this looks better */
	}
</style>
