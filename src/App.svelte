<script lang="ts">
  import { onMount } from 'svelte';
  import { account } from '@stores/accounts';
  import { ethers, ContractInterface } from 'ethers';
  import contractABI from '@artifacts/WavePortal.json';

  const contractAddress = '0x8187ea11cf65b9ede7d9b00cf36fcc2c52ac14a7';
  const contractABIA = [
    'function wave()',
    'function getTotalWaves() view returns (uint256)'
  ];

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          // contractABI as unknown as ContractInterface,
          contractABI.abi,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log('Retrieved total wave count...', count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get Metamask');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log('Connect wallet', accounts[0]);
      account.set(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  onMount(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have metamask');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        account.set(account);
      } else {
        console.log('No authorized account found');
      }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<main>
  <div class="mainContainer">
    <div class="dataContainer">
      <div class="header">👋 Hey there!</div>

      <div class="bio">
        I am farza and I worked on self-driving cars so that's pretty cool
        right? Connect your Ethereum wallet and wave at me!
      </div>

      <button class="waveButton" on:click={wave}> Wave at Me </button>
      {#if !$account}
        <button class="waveButton" on:click={connectWallet}>
          Connect Wallet
        </button>
      {/if}
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  .mainContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 64px;
  }

  .dataContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
  }

  .header {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
  }

  .bio {
    text-align: center;
    color: gray;
    margin-top: 16px;
  }

  .waveButton {
    cursor: pointer;
    margin-top: 16px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
  }
</style>
