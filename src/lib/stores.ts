import { writable } from 'svelte/store';

export const count = writable(0);

export const user = writable({});
export const accForms = writable(false);