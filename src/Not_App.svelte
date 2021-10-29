<script lang="ts">
  import { onMount, beforeUpdate } from 'svelte';
  import { account } from '@stores/accounts';
  import { waves, waveCount } from '@stores/wave';
  import type { Wave, ContractWave } from '@stores/wave';
  import { ethers } from 'ethers';
  import contractABI from '@artifacts/WavePortal.json';

  const contractAddress = '0x4a8ae3253b413505e02f33c33745958998ba14f0';

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );

        const waveTxn = await wavePortalContract.wave('Famous');
        console.log('mining', waveTxn.hash);
        waveTxn.wait();
        console.log('mined', waveTxn.hash);

        const Waves: ContractWave[] = await wavePortalContract.getAllWaves();

        let wavesCleaned: Wave[];
        Waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        waves.set(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllWaves = async () => {};

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
        const ethAccount = accounts[0];
        console.log('Found an authorized account:', ethAccount);
        account.set(ethAccount);

        const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );

        // let count = await wavePortalContract.getTotalWaves();
        // console.log('Retrieved total wave count...', count.toNumber());
        // waveCount.set(count.toNumber());

        const Waves: ContractWave[] = await wavePortalContract.getAllWaves();
        console.log('WAVES', Waves);

        let wavesCleaned: Wave[] = [];
        Waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });
        console.log('cleaned waves', wavesCleaned);
        console.log('cleaned waves', $waves);
        waves.set(wavesCleaned);
        console.log('cleaned', $waves);
      } else {
        console.log('No authorized account found');
      }
    } catch (err) {
      console.log(err);
    }
  });

  // beforeUpdate(async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log('Make sure you have metamask');
  //       return;
  //     } else {
  //       console.log('We have the ethereum object', ethereum);
  //     }

  //     const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
  //     const wavePortalContract = new ethers.Contract(
  //       contractAddress,
  //       contractABI.abi,
  //       signer
  //     );

  //     // let count = await wavePortalContract.getTotalWaves();
  //     // console.log('Retrieved total wave count...', count.toNumber());
  //     // waveCount.set(count.toNumber());

  //     const Waves: Wave[] = await wavePortalContract.getAllWaves();

  //     let wavesCleaned = [];
  //     Waves.forEach(wave => {
  //       wavesCleaned.push({
  //         waver: wave.waver,
  //         timestamp: new Date(wave.timestamp * 1000),
  //         message: wave.message
  //       });
  //     });
  //     console.log('cleaned waves', wavesCleaned);

  //     waves.set(wavesCleaned);
  //     console.log('cleaned', $waves);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  $: account;
  $: waveCount;
  $: waves;
</script>

<main>
  <div class="mainContainer">
    <div>
      <div class="header">Wave at me 👋</div>
      <div class="bio">Send me a wave on the public Ethereum blockchain.</div>
    </div>
    <div class="waveCount">
      Current wave count
      <span>
        {#if !$waveCount}
          🧐
        {:else}
          {$waveCount}
        {/if}
      </span>
    </div>
    {#if $waves}
      <div>
        {#each $waves as wave}
          <div>
            <div>Address: {wave.address}</div>
            <div>Time: {wave.timestamp.toString()}</div>
            <div>Message: {wave.message}</div>
          </div>
        {/each}
      </div>
    {/if}
    <div class="ctas">
      {#if !$account}
        <Button on:click={connectWallet}>Connect Wallet</Button>
      {:else}
        <a
          href="https://ethereum.stackexchange.com/questions/86901/how-can-i-disconnect-a-metamask-wallet-from-uniswap#:~:text=You%20can%20disconnect%20a%20Metamask,with%20the%20trash%20can%20icon."
          target="_blank"
          class="secondary"
        >
          Disconnect
        </a>
        <Button on:click={wave}>Wave at Me</Button>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;

    display: flex;
  }

  .mainContainer {
    color: #fff;

    text-align: center;

    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-top: auto;
    margin-left: auto;
    margin-bottom: auto;
    margin-right: auto;
  }

  .header {
    text-align: center;
    font-weight: bold;
    font-size: 64px;
    line-height: 77px;
  }

  .bio {
    color: #eaeaea;
    opacity: 0.8;

    margin-top: 30px;

    font-size: 23px;
    line-height: 34px;
    text-align: center;
  }

  .waveCount {
    font-size: 22px;
    font-weight: 600;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .waveCount span {
    font-size: 24px;
    margin-top: 25px;
    padding: 32px;
    border-radius: 10px;
    width: fit-content;
    background-color: #272a31;
  }

  .ctas {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
