<script lang="ts">
	import {vocabulary} from '$lib/vocabulary.js';
	// import TabbedView from '$lib/TabbedView.svelte'; // experimental alternative to TiledView
	import TiledView from '$lib/TiledView.svelte';
	import GithubLink from '$lib/GithubLink.svelte';
	import {set_components} from '$lib/components.js';
	import Link from '$lib/Link.svelte';
	import ItemLink from '$lib/ItemLink.svelte';
	import Example from '$lib/Example.svelte';

	const default_components = {
		Link,
		ItemLink,
		Example,
	};

	set_components(default_components);
</script>

<main>
	<!-- TODO nav? -->
	<GithubLink />
	<div class="content">
		<TiledView {vocabulary} />
	</div>
</main>

<style>
	main {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
		overflow: hidden;
	}
</style>
