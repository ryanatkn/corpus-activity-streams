<script lang="ts">
	import Vocabulary_Detail from 'src/Vocabulary_Detail.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each vocabulary.items as item (item)}
	<Vocabulary_Detail {item} {vocabulary} />
{/each}
