import {writable} from 'svelte/store';
import {type VocabularyItem} from '$lib/activity_streams';

// TODO probably move to context
export const hovered_entity = writable<VocabularyItem | null>(null);