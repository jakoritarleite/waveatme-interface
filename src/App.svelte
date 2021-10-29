<script lang="ts">
  import Button from '@components/Button.svelte';
  import ConnectWalletModal from '@components/ConnectWalletModal.svelte';

  let showConnectWalletModal: boolean = false;
</script>

<main>
  <header>
    <h1>Wave at me</h1>
    <Button on:click={() => (showConnectWalletModal = !showConnectWalletModal)}
      >Connect</Button
    >
  </header>
  <h1 class="description">Send me messages through the blockchain network</h1>
  <ConnectWalletModal bind:show={showConnectWalletModal} />
</main>

<style>
  main {
    font-family: 'Poppins', sans-serif;

    max-width: 30ch;
    height: 100vh;
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
