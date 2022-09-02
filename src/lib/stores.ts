import { writable } from 'svelte/store';

export const count = writable(0);
let val: any = {};
export const user = writable(val);
export const accForms = writable(false);