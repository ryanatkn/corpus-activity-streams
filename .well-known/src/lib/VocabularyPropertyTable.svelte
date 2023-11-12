<script lang="ts">
	import ItemLink from '$lib/ItemLink.svelte';
	import Items from '$lib/Items.svelte';
	import UnknownLink from '$lib/UnknownLink.svelte';
	import type {Vocabulary} from '$lib/vocabulary';

	export let vocabulary: Vocabulary;
</script>

<table>
	<thead>
		<tr>
			<th>property ({vocabulary.properties.length})</th>
			<th>domain</th>
			<th>range</th>
			<th>functional</th>
		</tr>
	</thead>
	{#each vocabulary.properties as item (item)}
		<tr>
			<td>
				<ItemLink {item} />
			</td>
			<td>
				<Items items={item.domain} let:item>
					<ItemLink item={vocabulary.by_name[item]} />
				</Items>
			</td>
			<td>
				<Items items={item.range} let:item>
					{#if item in vocabulary.by_name}
						<ItemLink item={vocabulary.by_name[item]} />
					{:else}
						<UnknownLink>{item}</UnknownLink>
					{/if}
				</Items>
			</td>
			<td><code>{item.functional}</code></td>
		</tr>
	{/each}
</table>

<style>
	td {
		padding: 0 8px;
	}
	th {
		text-align: left;
		padding: 10px 0;
	}
</style>
