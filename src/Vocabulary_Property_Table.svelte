<script lang="ts">
	import Entity_Link from 'src/Entity_Link.svelte';
	import Items from 'src/Items.svelte';
	import Unknown_Link from 'src/Unknown_Link.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

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
	{#each vocabulary.properties as entity (entity)}
		<tr>
			<td>
				<Entity_Link {entity} />
			</td>
			<td>
				<Items items={entity.domain} let:item>
					<Entity_Link entity={vocabulary.by_name[item]} />
				</Items>
			</td>
			<td>
				<Items items={entity.range} let:item>
					{#if item in vocabulary.by_name}
						<Entity_Link entity={vocabulary.by_name[item]} />
					{:else}
						<Unknown_Link>{item}</Unknown_Link>
					{/if}
				</Items>
			</td>
			<td><code>{entity.functional}</code></td>
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
