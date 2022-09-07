import { writable } from 'svelte/store';

export const count = writable(0);
// user's state (logged in or not)
export const user = writable<boolean>(localStorage.user === 'true');
user.subscribe((val) => localStorage.user = String(val));

export const accForms = writable(false);