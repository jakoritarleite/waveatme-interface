import { ethers } from 'ethers';
import { get } from 'svelte/store';
import { walletProvider, walletAccount, isConnected } from '@stores/wallet';
import { contractAddress, contractABI } from '@stores/contract';
import { waves as _waves } from '@stores/wave';
import type { Wave, ContractWave } from '@stores/wave';

export const connect = async () => {
  walletProvider.set('metamask');

  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log(
        "WARN the ethereum object isn't accessible. Please install the metamask extension!"
      );
      throw new Error('Ethereum object unaccessible');
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log('cnac', accounts);

    if (accounts.length !== 0) {
      walletAccount.set(accounts[0]);
      isConnected.set(true);
    } else {
      console.log('Did not found any valid account!');
    }
  } catch (err) {
    console.log('dota', err);
  }
};

export const getAllWaves = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log(
        "WARN the ethereum object isn't accessible. Please install the metamask extension!"
      );
      throw new Error('Ethereum object unaccessible');
    }

    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const wavePortalContract = new ethers.Contract(
      get(contractAddress),
      get(contractABI),
      signer
    );

    const waves: ContractWave[] = await wavePortalContract.getAllWaves();
    const cleansedWaves: Wave[] = waves.map((wave: ContractWave) => {
      return {
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message
      };
    });
    _waves.set(cleansedWaves);
  } catch (err) {
    console.log(err.message);
    if (err.message.includes('unknown account #0')) {
      walletAccount.set([]);
      isConnected.set(false);
    }
  }
};
