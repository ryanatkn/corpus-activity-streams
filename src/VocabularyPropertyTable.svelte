<script lang="ts">
	import EntityLink from './EntityLink.svelte';
	import Items from './Items.svelte';
	import UnknownLink from './UnknownLink.svelte';
	import type {Vocabulary} from './vocabulary.js';

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
				<EntityLink {entity} />
			</td>
			<td>
				<Items items={entity.domain} let:item>
					<EntityLink entity={vocabulary.byName[item]} />
				</Items>
			</td>
			<td>
				<Items items={entity.range} let:item>
					{#if item in vocabulary.byName}
						<EntityLink entity={vocabulary.byName[item]} />
					{:else}
						<UnknownLink>{item}</UnknownLink>
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
