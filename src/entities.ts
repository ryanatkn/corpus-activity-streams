import {writable} from 'svelte/store';
import type {VocabularyItem} from './activity_streams.js';

// TODO probably move to context
export const hoveredEntity = writable<VocabularyItem | null>(null);
