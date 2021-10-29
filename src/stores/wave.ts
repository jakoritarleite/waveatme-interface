import { writable } from 'svelte/store';

export const waveCount = writable(0);

export type Wave = {
  address: string;
  message: string;
  timestamp: Date;
};

export type ContractWave = {
  waver: string;
  message: string;
  timestamp: number;
};

export const waves = writable<Array<Wave>>();
