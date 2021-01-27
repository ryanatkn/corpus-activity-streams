<script>
	import EntityLink from './EntityLink.svelte';
	import StringLink from './StringLink.svelte';
	window.hack = ('EntityLink', EntityLink);
	window.hack = ('StringLink', StringLink);
	export let vocabulary;
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
		align-items: center;
		justify-content: center;
	}
	.items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
