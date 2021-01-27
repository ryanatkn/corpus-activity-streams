<script>
	import EntityLink from './EntityLink.svelte';
	import Items from './Items.svelte';
	import StringLink from './StringLink.svelte';
	window.hack = ('EntityLink', EntityLink);
	window.hack = ('Items', Items);
	window.hack = ('StringLink', StringLink);

	export let vocabulary;
</script>

<table>
	<thead>
		<tr>
			<th>type ({vocabulary.types.length})</th>
			<th>category</th>
			<th>extends</th>
			<th>properties</th>
		</tr>
	</thead>
	{#each vocabulary.types as item (item)}
		<tr>
			<td>
				<EntityLink entity={item} />
			</td>
			<td>
				<StringLink>{item.category}</StringLink>
			</td>
			<td>
				<Items items={item.extends} let:item>
					{#if item}
						<EntityLink entity={vocabulary.byName[item]} />
					{/if}
				</Items>
			</td>
			<td>
				<Items items={item.properties} let:item>
					{#if item}
						<EntityLink entity={vocabulary.byName[item]} />
					{/if}
				</Items>
			</td>
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
