<script lang="ts">
	import Items from '$lib/Items.svelte';
	import EntityLink from '$lib/EntityLink.svelte';
	import UnknownLink from '$lib/UnknownLink.svelte';
	import StringLink from '$lib/StringLink.svelte';
	import Note from '$lib/Note.svelte';
	import {type Vocabulary} from '$lib/vocabulary';
	import {type VocabularyItem} from '$lib/activity_streams';

	export let item: VocabularyItem;
	export let vocabulary: Vocabulary;
</script>

<div class="item" id={item.name}>
	<h2>
		<EntityLink entity={item} />
	</h2>
	<table>
		<tr>
			<td class="property-name">category</td>
			<td class="property-value">
				<StringLink>{item.category}</StringLink>
			</td>
		</tr>
		{#if 'extends' in item}
			<tr>
				<td class="property-name">extends</td>
				<td class="property-value">
					<Items items={item.extends} let:item>
						<EntityLink entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'extended_by' in item}
			<tr>
				<td class="property-name">extended_by</td>
				<td class="property-value">
					<Items items={item.extended_by} let:item>
						<EntityLink entity={vocabulary.by_name[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if 'domain' in item}
			<tr>
				<td class="property-name">domain</td>
				<td class="property-value">
					<Items items={item.domain} let:item>
						<EntityLink entity={vocabulary.by_name[item]} />
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
							<EntityLink entity={vocabulary.by_name[item]} />
						{:else}
							<UnknownLink>{item}</UnknownLink>
						{/if}
					</Items>
					{#if 'functional' in item && !item.functional}
						<code class="literal" title="can be an Array because it is not 'functional'">[]</code>
					{/if}
				</td>
			</tr>
		{/if}
		{#if 'properties' in item}
			<tr>
				<td class="property-name">properties</td>
				<td class="property-value">
					<Items items={item.properties} let:item>
						<EntityLink entity={vocabulary.by_name[item]} />
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
		padding: 3px 0;
	}
	.literal {
		padding: 0 3px;
		margin: 0 3px;
		border-radius: 2px;
		background-color: var(--color_gray);
	}
</style>
