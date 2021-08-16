<script lang="ts">
	import VocabularyTypeTable from 'src/VocabularyTypeTable.svelte';
	import VocabularyPropertyTable from 'src/VocabularyPropertyTable.svelte';
	import VocabularyDetails from 'src/VocabularyDetails.svelte';
	import VocabularyTree from 'src/VocabularyTree.svelte';
	import VocabularyGroups from 'src/VocabularyGroups.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;

	// TODO render multiple at once, and sync them
	let active_tab = 'tree'; // 'details' | 'tables' | 'tree'
	const go_to = (tab: string) => (active_tab = tab);
</script>

<nav>
	<button on:click={() => go_to('types')} disabled={active_tab === 'types'}> types </button>
	<button on:click={() => go_to('properties')} disabled={active_tab === 'properties'}>
		properties
	</button>
	<button on:click={() => go_to('details')} disabled={active_tab === 'details'}> details </button>
	<button on:click={() => go_to('tree')} disabled={active_tab === 'tree'}> tree </button>
	<button on:click={() => go_to('groups')} disabled={active_tab === 'groups'}> groups </button>
</nav>

{#if active_tab === 'types'}
	<VocabularyTypeTable {vocabulary} />
{:else if active_tab === 'properties'}
	<VocabularyPropertyTable {vocabulary} />
{:else if active_tab === 'details'}
	<VocabularyDetails {vocabulary} />
{:else if active_tab === 'tree'}
	<VocabularyTree {vocabulary} />
{:else if active_tab === 'groups'}
	<VocabularyGroups {vocabulary} />
{:else}unknown tab: {active_tab}{/if}

<style>
	button {
		padding: 10px 30px;
	}
	button[disabled] {
		background-color: rgba(208, 214, 227);
	}
</style>
