import { writable } from 'svelte/store';
import { email } from '$lib/constants/contact';

export const showCopyPopup = writable(false);

export async function copyEmail() {
  await navigator.clipboard.writeText(email);
  showCopyPopup.set(true);
  setTimeout(() => showCopyPopup.set(false), 2000);
}
