<script lang="ts">
	import VocabularyTypeTable from '$lib/VocabularyTypeTable.svelte';
	import VocabularyPropertyTable from '$lib/VocabularyPropertyTable.svelte';
	import VocabularyDetails from '$lib/VocabularyDetails.svelte';
	import VocabularyTree from '$lib/VocabularyTree.svelte';
	import VocabularyGroups from '$lib/VocabularyGroups.svelte';
	import type {Vocabulary} from '$lib/vocabulary.js';

	export let vocabulary: Vocabulary;

	// TODO render multiple at once, and sync them
	let active_tab = 'tree'; // 'details' | 'tables' | 'tree'
	const go_to = (tab: string) => (active_tab = tab);
</script>

<nav>
	<button on:click={() => go_to('types')} disabled={active_tab === 'types'}>types</button>
	<button on:click={() => go_to('properties')} disabled={active_tab === 'properties'}
		>properties</button
	>
	<button on:click={() => go_to('details')} disabled={active_tab === 'details'}>details</button>
	<button on:click={() => go_to('tree')} disabled={active_tab === 'tree'}>tree</button>
	<button on:click={() => go_to('groups')} disabled={active_tab === 'groups'}>groups</button>
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
