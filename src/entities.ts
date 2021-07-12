import {writable} from 'svelte/store';
import type {Vocabulary_Item} from 'src/activity_streams.js';

// TODO probably move to context
export const hovered_entity = writable<Vocabulary_Item | null>(null);
