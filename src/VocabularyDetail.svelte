<script>
	import Items from './Items.svelte';
	import EntityLink from './EntityLink.svelte';
	import UnknownLink from './UnknownLink.svelte';
	import StringLink from './StringLink.svelte';
	import VocabularyDetailExamples from './VocabularyDetailExamples.svelte';
	import * as notes from './notes/index.js';
	import {examples} from './activity_streams_examples.js';
	export let item;
	export let vocabulary;
	window.hack = ('Items', Items);
	window.hack = ('EntityLink', EntityLink);
	window.hack = ('UnknownLink', UnknownLink);
	window.hack = ('StringLink', StringLink);
	window.hack = ('VocabularyDetailExamples', VocabularyDetailExamples);
	window.hack = ('examples', examples);
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
		{#if item.extends}
			<tr>
				<td class="property-name">extends</td>
				<td class="property-value">
					<Items items={item.extends} let:item>
						<EntityLink entity={vocabulary.byName[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if item.extendedBy}
			<tr>
				<td class="property-name">extendedBy</td>
				<td class="property-value">
					<Items items={item.extendedBy} let:item>
						<EntityLink entity={item} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if item.domain}
			<tr>
				<td class="property-name">domain</td>
				<td class="property-value">
					<Items items={item.domain} let:item>
						<EntityLink entity={vocabulary.byName[item]} />
					</Items>
				</td>
			</tr>
		{/if}
		{#if item.range}
			<tr>
				<td class="property-name">range</td>
				<td class="property-value">
					<Items items={item.range} let:item>
						{#if item in vocabulary.byName}
							<EntityLink entity={vocabulary.byName[item]} />
						{:else}
							<UnknownLink>{item}</UnknownLink>
						{/if}
					</Items>
				</td>
			</tr>
		{/if}
		{#if item.properties}
			<tr>
				<td class="property-name">properties</td>
				<td class="property-value">
					<Items items={item.properties} let:item>
						<EntityLink entity={vocabulary.byName[item]} />
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
	<svelte:component this={notes[item.name]} />
	<VocabularyDetailExamples examples={examples[item.name]} />
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
