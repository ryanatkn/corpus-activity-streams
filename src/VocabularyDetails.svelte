<script>
	import VocabularyDetail from './VocabularyDetail.svelte';
	window.hack = ('VocabularyDetail', VocabularyDetail);

	export let vocabulary;
</script>

{#each vocabulary.items as item (item)}
	<VocabularyDetail {item} {vocabulary} />
{/each}
