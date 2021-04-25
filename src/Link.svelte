<script lang="ts">
	// a link to some external resource,
	// so our design options are limited compared to internal system "links"
	export let href: string;
</script>

<a {href} target="_blank" rel="noopener noreferrer">
	{href}
</a>

<style>
	a {
		color: var(--color_brown_text);
	}
</style>
