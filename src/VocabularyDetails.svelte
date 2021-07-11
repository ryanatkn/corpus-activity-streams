<script lang="ts">
	import VocabularyDetail from 'src/VocabularyDetail.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each vocabulary.items as item (item)}
	<VocabularyDetail {item} {vocabulary} />
{/each}
