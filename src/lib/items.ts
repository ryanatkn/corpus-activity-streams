import {writable} from 'svelte/store';

import type {VocabularyItem} from '$lib/activity_streams.js';

// TODO probably move to context
export const hovered_item = writable<VocabularyItem | null>(null);
