<script>
	import VocabularyTypeTable from './VocabularyTypeTable.svelte';
	import VocabularyPropertyTable from './VocabularyPropertyTable.svelte';
	import VocabularyDetails from './VocabularyDetails.svelte';
	import VocabularyTree from './VocabularyTree.svelte';
	import VocabularyGroups from './VocabularyGroups.svelte';

	window.hack = ('VocabularyTypeTable', VocabularyTypeTable);
	window.hack = ('VocabularyPropertyTable', VocabularyPropertyTable);
	window.hack = ('VocabularyDetails', VocabularyDetails);
	window.hack = ('VocabularyTree', VocabularyTree);
	window.hack = ('VocabularyGroups', VocabularyGroups);

	export let vocabulary;

	// TODO render multiple at once, and sync them
	let activeTab = 'tree'; // 'details' | 'tables' | 'tree'
	const goTo = (tab) => (activeTab = tab);
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
