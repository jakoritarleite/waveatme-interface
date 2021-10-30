import { readable } from 'svelte/store';
import abi from '@app/artifacts/WavePortal.json';

export const contractAddress = readable(
  '0x9e185e76b04e34a8fC17Ba9b2B21f79445a83731'
);

export const contractABI = readable(abi.abi);
