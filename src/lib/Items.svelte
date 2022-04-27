<script lang="ts">
	export let items: any | any[];
</script>

{#if Array.isArray(items)}{#each items as item (item)}<slot {item} />{/each}{:else}<slot
		item={items}
	/>{/if}
