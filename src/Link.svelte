<script lang="ts">
	export let url: string;
</script>

<a href={url} target="_blank" rel="noopener noreferrer">
	{url}
</a>

<style>
	a {
		color: var(--color_brown_text);
	}
</style>
