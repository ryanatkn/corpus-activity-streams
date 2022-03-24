<script lang="ts">
	import {vocabulary} from '$lib/vocabulary';
	import TabbedView from '$lib/TabbedView.svelte';
	import TiledView from '$lib/TiledView.svelte';
	import GithubLink from '$lib/GithubLink.svelte';
	import {set_components, type Components} from '$lib/components';
	import Link from '$lib/Link.svelte';
	import EntityLink from '$lib/EntityLink.svelte';

	const view = TiledView || TabbedView;
	type DefaultComponents = 'Link' | 'EntityLink';

	const to_default_components = (): Components<DefaultComponents> => ({
		Link,
		EntityLink,
	});

	set_components(to_default_components());
</script>

<div class="app">
	<!-- TODO nav? -->
	<GithubLink />
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
