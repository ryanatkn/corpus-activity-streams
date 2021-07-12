<script lang="ts">
	import Vocabulary_Details from 'src/Vocabulary_Details.svelte';
	import Vocabulary_Tree from 'src/Vocabulary_Tree.svelte';
	import Vocabulary_Groups from 'src/Vocabulary_Groups.svelte';
	import type {Vocabulary} from 'src/vocabulary.js';

	export let vocabulary: Vocabulary;
</script>

<div class="tiled-view">
	<div class="tile">
		<Vocabulary_Tree {vocabulary} />
	</div>
	<div class="tile">
		<Vocabulary_Details {vocabulary} />
	</div>
	<div class="tile">
		<Vocabulary_Groups {vocabulary} />
	</div>
</div>

<style>
	.tiled-view {
		display: flex;
		height: 100%;
	}
	.tile {
		flex: 1;
		padding: 0 10px;
		overflow: auto;
	}
</style>
