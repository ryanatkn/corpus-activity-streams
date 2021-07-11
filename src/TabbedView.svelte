<script lang="ts">
	import VocabularyTypeTable from 'src/VocabularyTypeTable.svelte';
	import VocabularyPropertyTable from 'src/VocabularyPropertyTable.svelte';
	import VocabularyDetails from 'src/VocabularyDetails.svelte';
	import VocabularyTree from 'src/VocabularyTree.svelte';
	import VocabularyGroups from 'src/VocabularyGroups.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;

	// TODO render multiple at once, and sync them
	let activeTab = 'tree'; // 'details' | 'tables' | 'tree'
	const goTo = (tab: string) => (activeTab = tab);
</script>

<nav>
	<button on:click={() => goTo('types')} disabled={activeTab === 'types'}> types </button>
	<button on:click={() => goTo('properties')} disabled={activeTab === 'properties'}>
		properties
	</button>
	<button on:click={() => goTo('details')} disabled={activeTab === 'details'}> details </button>
	<button on:click={() => goTo('tree')} disabled={activeTab === 'tree'}> tree </button>
	<button on:click={() => goTo('groups')} disabled={activeTab === 'groups'}> groups </button>
</nav>

{#if activeTab === 'types'}
	<VocabularyTypeTable {vocabulary} />
{:else if activeTab === 'properties'}
	<VocabularyPropertyTable {vocabulary} />
{:else if activeTab === 'details'}
	<VocabularyDetails {vocabulary} />
{:else if activeTab === 'tree'}
	<VocabularyTree {vocabulary} />
{:else if activeTab === 'groups'}
	<VocabularyGroups {vocabulary} />
{:else}unknown tab: {activeTab}{/if}

<style>
	button {
		padding: 10px 30px;
	}
	button[disabled] {
		background-color: rgba(208, 214, 227);
	}
</style>
