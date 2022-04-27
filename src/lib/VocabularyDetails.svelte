<script lang="ts">
	import VocabularyDetail from '$lib/VocabularyDetail.svelte';
	import type {Vocabulary} from '$lib/vocabulary';

	export let vocabulary: Vocabulary;
</script>

{#each vocabulary.items as item (item)}<VocabularyDetail {item} {vocabulary} />{/each}
