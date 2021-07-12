<script lang="ts">
	import Vocabulary_Type_Table from 'src/Vocabulary_Type_Table.svelte';
	import Vocabulary_Property_Table from 'src/Vocabulary_Property_Table.svelte';
	import Vocabulary_Details from 'src/Vocabulary_Details.svelte';
	import Vocabulary_Tree from 'src/Vocabulary_Tree.svelte';
	import Vocabulary_Groups from 'src/Vocabulary_Groups.svelte';
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
	<Vocabulary_Type_Table {vocabulary} />
{:else if active_tab === 'properties'}
	<Vocabulary_Property_Table {vocabulary} />
{:else if active_tab === 'details'}
	<Vocabulary_Details {vocabulary} />
{:else if active_tab === 'tree'}
	<Vocabulary_Tree {vocabulary} />
{:else if active_tab === 'groups'}
	<Vocabulary_Groups {vocabulary} />
{:else}unknown tab: {active_tab}{/if}

<style>
	button {
		padding: 10px 30px;
	}
	button[disabled] {
		background-color: rgba(208, 214, 227);
	}
</style>
