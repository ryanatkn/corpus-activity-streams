<script lang="ts">
	import {base} from '$app/paths';

	import '$lib/style.css';

	// TODO fixes the browser back/forward buttons for reasons I don't understand
	const onHashChange = () => {
		if (window.location.hash) window.location.href = window.location.href;
	};
</script>

<svelte:window on:hashchange={onHashChange} />

<svelte:head>
	<title>corpus-activity-streams</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<slot />
