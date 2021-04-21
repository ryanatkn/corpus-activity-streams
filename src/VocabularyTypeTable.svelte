<script lang="ts">
	import EntityLink from './EntityLink.svelte';
	import Items from './Items.svelte';
	import StringLink from './StringLink.svelte';
	import type {Vocabulary} from './vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

<table>
	<thead>
		<tr>
			<th>type ({vocabulary.types.length})</th>
			<th>extends</th>
			<th>properties</th>
			<th>category</th>
		</tr>
	</thead>
	{#each vocabulary.types as item (item)}
		<tr>
			<td>
				<EntityLink entity={item} />
			</td>
			{#if 'extends' in item}
				<td>
					<Items items={item.extends} let:item>
						{#if item}
							<EntityLink entity={vocabulary.byName[item]} />
						{/if}
					</Items>
				</td>
			{/if}
			{#if 'extends' in item}
				<td>
					<Items items={item.properties} let:item>
						{#if item}
							<EntityLink entity={vocabulary.byName[item]} />
						{/if}
					</Items>
				</td>
			{/if}
			<td>
				<StringLink>{item.category}</StringLink>
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
