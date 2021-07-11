<script lang="ts">
	import Entity_Link from 'src/Entity_Link.svelte';
	import Items from 'src/Items.svelte';
	import String_Link from 'src/String_Link.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

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
				<Entity_Link entity={item} />
			</td>
			{#if 'extends' in item}
				<td>
					<Items items={item.extends} let:item>
						{#if item}
							<Entity_Link entity={vocabulary.by_name[item]} />
						{/if}
					</Items>
				</td>
			{/if}
			{#if 'extends' in item}
				<td>
					<Items items={item.properties} let:item>
						{#if item}
							<Entity_Link entity={vocabulary.by_name[item]} />
						{/if}
					</Items>
				</td>
			{/if}
			<td>
				<String_Link>{item.category}</String_Link>
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
