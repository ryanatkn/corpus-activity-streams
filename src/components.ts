import {getContext, setContext} from 'svelte';
import type {SvelteComponent} from 'svelte';

export type Components<T extends string = string> = Record<T, typeof SvelteComponent>;

const KEY = {};

export const set_components = (initial: Components<string>): void => setContext(KEY, initial);

export const get_components = <T extends string = string>(): Components<T> => getContext(KEY);
