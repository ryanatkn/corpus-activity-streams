<script lang="ts">
	import EntityLink from './EntityLink.svelte';
	import StringLink from './StringLink.svelte';
	import type {Vocabulary} from './vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each Object.keys(vocabulary.byTypeName) as typeName (typeName)}
	<div class="vocabulary-group">
		<h2>
			<StringLink>{typeName}</StringLink>
		</h2>
		<div class="items">
			{#each vocabulary.byTypeName[typeName] as entity (entity)}
				<EntityLink {entity} />
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
