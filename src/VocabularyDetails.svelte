<script lang="ts">
	import VocabularyDetail from './VocabularyDetail.svelte';
	import type {Vocabulary} from './vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

{#each vocabulary.items as item (item)}
	<VocabularyDetail {item} {vocabulary} />
{/each}
