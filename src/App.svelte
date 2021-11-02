<script lang="ts">
  import { onMount } from 'svelte';
  import { isConnected } from '@stores/wallet';
  import * as metamask from '@app/lib/metamask';
  import Button from '@components/Button.svelte';
  import ConnectWalletModal from '@components/ConnectWalletModal.svelte';
  import Messages from '@components/Messages.svelte';
  import Textarea from '@components/Textarea.svelte';

  let showConnectWalletModal: boolean = false;

  onMount(async () => {
    try {
      await metamask.checkWallet();
      await metamask.listenNewWave();
    } catch (err) {
      console.log(err);
    }
  });

  $: isConnected;
</script>

<main>
  <header>
    <h1>Wave at me</h1>
    {#if !$isConnected}
      <Button
        on:click={() => (showConnectWalletModal = !showConnectWalletModal)}
        >Connect</Button
      >
    {/if}
  </header>
  <h1 class="description">Send me messages through the blockchain network</h1>
  <Textarea />
  <Messages bind:showDemo={$isConnected} />
  <ConnectWalletModal bind:show={showConnectWalletModal} />
</main>

<style>
  main {
    font-family: 'Poppins', sans-serif;

    max-width: 30ch;
    margin-inline: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 100px;
  }

  header h1 {
    font-size: 20px;
  }

  .description {
    font-size: 25px;
    margin-inline: auto;

    margin-top: 70px;
  }

  @media only screen and (min-width: 620px) {
    main {
      max-width: 60ch;
    }

    header h1 {
      font-size: 25px;
    }

    .description {
      font-size: 30px;
    }
  }
</style>
