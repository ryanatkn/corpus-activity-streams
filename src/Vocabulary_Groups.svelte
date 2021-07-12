<script lang="ts">
	import Entity_Link from 'src/Entity_Link.svelte';
	import String_Link from 'src/String_Link.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each Object.keys(vocabulary.by_type_name) as type_name (type_name)}
	<div class="vocabulary-group">
		<h2>
			<String_Link>{type_name}</String_Link>
		</h2>
		<div class="items">
			{#each vocabulary.by_type_name[type_name] as entity (entity)}
				<Entity_Link {entity} />
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
