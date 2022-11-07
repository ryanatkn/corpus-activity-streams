import {getContext, setContext, type SvelteComponent} from 'svelte';

export type Components<T extends string = string> = Record<T, typeof SvelteComponent>;

const KEY = {};

export const set_components = <T extends string = string>(initial: Components<T>): Components<T> =>
	setContext(KEY, initial);

export const get_components = <T extends string = string>(): Components<T> => getContext(KEY);
