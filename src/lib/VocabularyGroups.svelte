<script lang="ts">
	import ItemLink from '$lib/ItemLink.svelte';
	import StringLink from '$lib/StringLink.svelte';
	import type {Vocabulary} from '$lib/vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each Object.keys(vocabulary.by_type_name) as type_name (type_name)}
	<div class="vocabulary-group">
		<h2>
			<StringLink>{type_name}</StringLink>
		</h2>
		<div class="items">
			{#each vocabulary.by_type_name[type_name] as item (item)}
				<ItemLink {item} />
			{/each}
		</div>
	</div>
{/each}

<style>
	.vocabulary-group {
		display: flex;
		flex-direction: column;
	}
	.items {
		display: flex;
		flex-wrap: wrap;
	}
</style>
