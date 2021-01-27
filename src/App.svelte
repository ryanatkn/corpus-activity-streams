<script>
	import {vocabulary} from './vocabulary.js';
	import TabbedView from './TabbedView.svelte';
	import TiledView from './TiledView.svelte';
	import GitHubLink from './GitHubLink.svelte';

	window.hack = ('vocabulary', vocabulary, GitHubLink);

	let view = TiledView || TabbedView;
</script>

<div class="app">
	<!-- TODO nav? -->
	<GitHubLink />
	<div class="content">
		<svelte:component this={view} {vocabulary} />
	</div>
</div>

<style>
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
</style>
