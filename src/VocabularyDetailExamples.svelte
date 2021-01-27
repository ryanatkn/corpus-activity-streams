<script>
	export let examples;
</script>

{#if examples}
	{#each examples as example (example)}
		<pre>{JSON.stringify(example, null, 2)}</pre>
	{/each}
{/if}

<style>
	pre {
		background-color: rgb(252, 250, 238);
		color: rgba(75, 70, 50);
		padding: 4px;
		overflow: hidden; /* maybe `auto`, but this looks better */
	}
</style>
