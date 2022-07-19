import { writable } from 'svelte/store';

export const count = writable(0);

export const user = writable(false);
export const accForms = writable(false);