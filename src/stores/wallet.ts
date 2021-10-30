import { writable } from 'svelte/store';

export const walletProvider = writable<'metamask' | 'walletconnect'>(
  localStorage.getItem('wallet:provider') as 'metamask' | 'walletconnect'
);

walletProvider.subscribe((provider: 'metamask' | 'walletconnect') =>
  localStorage.setItem('wallet:provider', provider)
);

export const walletAccount = writable();

export const isConnected = writable<boolean>(
  JSON.parse(localStorage.getItem('wallet:isconnected')) as boolean
);

isConnected.subscribe(connection =>
  localStorage.setItem('wallet:isconnected', JSON.stringify(connection))
);
