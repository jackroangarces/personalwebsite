import { writable } from 'svelte/store';

function createThemeStore() {
  const { subscribe, set, update } = writable<boolean>(false);

  return {
    subscribe,
    toggle: () => update((v) => !v),
    set
  };
}

export const theme = createThemeStore();
