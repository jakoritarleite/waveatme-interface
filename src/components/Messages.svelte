<script lang="ts">
  import { slide } from 'svelte/transition';
  import * as metamask from '@app/lib/metamask';
  import { walletProvider, isConnected } from '@stores/wallet';
  import { waves } from '@stores/wave';
  import { beforeUpdate } from 'svelte';

  // Binds to isConnected, so if isConnect is true, showDemo should be false
  export let showDemo: boolean;

  switch ($walletProvider) {
    case 'metamask':
      metamask.getAllWaves();
      break;
  }

  beforeUpdate(() => {
    switch ($walletProvider) {
      case 'metamask':
        metamask.getAllWaves();
        break;
    }
  });

  $: waves;
  $: isConnected;
  $: showDemo;
</script>

<div>
  {#if $waves && $isConnected}
    {#each $waves.reverse() as wave}
      <div class="message" transition:slide>
        <h1>{wave.message}</h1>
        <div>
          {wave.address.substring(0, 6)}...{wave.address.substring(
            wave.address.length - 5
          )}
        </div>
      </div>
    {/each}
  {/if}

  {#if !showDemo}
    <div class="message" transition:slide>
      <h1>Ola mundo (literalmente)</h1>
      <div>0x0862...9405a</div>
    </div>
  {/if}
</div>

<style>
  .message {
    background-color: #f2e8e1;

    width: 100%;
    height: 181px;

    border-radius: 10px;

    margin-top: 15px;

    box-sizing: border-box;
    padding: 25px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .message h1 {
    font-size: 16px;
  }

  .message div {
    font-size: 13px;
    font-weight: bold;
    color: #4f4f4f;
  }
</style>
