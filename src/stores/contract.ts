import { readable } from 'svelte/store';
import abi from '@app/artifacts/WavePortal.json';

export const contractAddress = readable(
  '0x4a8ae3253b413505e02f33c33745958998ba14f0'
);

export const contractABI = readable(abi.abi);
