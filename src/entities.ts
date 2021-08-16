import {writable} from 'svelte/store';
import type {VocabularyItem} from 'src/activity_streams.js';

// TODO probably move to context
export const hovered_entity = writable<VocabularyItem | null>(null);
