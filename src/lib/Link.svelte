<script lang="ts">
	// a link to some external resource,
	// so our design options are limited compared to internal system "links"
	export let href: string | undefined = undefined;
	export let content: string | undefined = undefined;
	$: child = content || href;
</script>

<a {href} target="_blank" rel="noreferrer">{child}</a>

<style>
	a {
		color: var(--color_brown_text);
	}
</style>
