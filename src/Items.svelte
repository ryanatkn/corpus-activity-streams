<script>
	export let items;
</script>

{#if Array.isArray(items)}
	{#each items as item (item)}
		<slot {item} />
	{/each}
{:else}
	<slot item={items} />
{/if}
