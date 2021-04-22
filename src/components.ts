import {getContext, setContext} from 'svelte';
import type {SvelteComponent} from 'svelte';

export type Components<T extends string = string> = Record<T, typeof SvelteComponent>;

const componentsKey = {};

export const provideComponents = <T extends string = string>(initial: Components<T>): void => {
	setContext(componentsKey, initial);
};

export const useComponents = <T extends string = string>(): Components<T> => {
	return getContext(componentsKey);
};
