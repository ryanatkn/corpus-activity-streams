<script lang="ts">
	import Items from 'src/Items.svelte';
	import Entity_Link from 'src/Entity_Link.svelte';
	import Unknown_Link from 'src/Unknown_Link.svelte';
	import String_Link from 'src/String_Link.svelte';
	import Note from 'src/Note.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';
	import type {Vocabulary_Item} from 'src/activity_streams.js';

	export let item: Vocabulary_Item;
	export let vocabulary: Vocabulary;
</script>

<div class="item" id={item.name}>
	<h2>
		<Entity_Link entity={item} />
	</h2>
	<table>
		<tr>
			<td class="property-name">category</td>
			<td class="property-value">
				<String_Link>{item.category}</String_Link>
			</td>
		</tr>
		{#if 'extends' in item}
			<tr>
				<td class="property-name">extends</td>
				<td class="property-value">
					<Items items={item.extends} let:item>
						<Entity_Link entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'extended_by' in item}
			<tr>
				<td class="property-name">extended_by</td>
				<td class="property-value">
					<Items items={item.extended_by} let:item>
						<Entity_Link entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'domain' in item}
			<tr>
				<td class="property-name">domain</td>
				<td class="property-value">
					<Items items={item.domain} let:item>
						<Entity_Link entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'range' in item}
			<tr>
				<td class="property-name">range</td>
				<td class="property-value">
					<Items items={item.range} let:item>
						{#if item in vocabulary.by_name}
							<Entity_Link entity={vocabulary.by_name[item]} />
						{:else}
							<Unknown_Link>{item}</Unknown_Link>
						{/if}
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'properties' in item}
			<tr>
				<td class="property-name">properties</td>
				<td class="property-value">
					<Items items={item.properties} let:item>
						<Entity_Link entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'functional' in item}
			<tr>
				<td class="property-name">functional</td>
				<td class="property-value"><code>{item.functional}</code></td>
			</tr>
		{/if}
	</table>
	<Note {item} />
</div>

<style>
	.item {
		padding: 20px 0;
	}
	.property-name {
		color: #777;
		padding-right: 10px;
		font-family: monospace, monospace;
	}
	.property-name:before {
		content: '.';
	}
	.property-value {
		display: flex;
		flex-wrap: wrap;
	}
</style>
