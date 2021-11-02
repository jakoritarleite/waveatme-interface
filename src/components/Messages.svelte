<script lang="ts">
  import { slide } from 'svelte/transition';
  import * as metamask from '@app/lib/metamask';
  import { walletProvider, isConnected } from '@stores/wallet';
  import { waves } from '@stores/wave';
  import { beforeUpdate } from 'svelte';

  const colors = ['fffcf3', 'fefef6', 'f9f5eb', 'f6f1eb'];
  let messageIndexToColor = 0;

  const getColor = (index: number): string => {
    let color: string = colors[index - messageIndexToColor];

    if (index - messageIndexToColor > colors.length - 1) {
      messageIndexToColor = index;
      color = colors[index - messageIndexToColor];
    }

    return color;
  };

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

<div class="messages">
  {#if $waves && $isConnected}
    {#each $waves.reverse() as wave, index}
      <div
        class="message"
        style={`background-color: #${getColor(index)}`}
        transition:slide
      >
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
    <div
      class="message"
      style="background-color: #fffcf3; margin-top: 65px;"
      transition:slide
    >
      <h1>Ola mundo (literalmente)</h1>
      <div>0x0862...9405a</div>
    </div>
  {/if}
</div>

<style>
  .messages {
    padding-bottom: 65px;
  }

  .message {
    width: 100%;
    height: 181px;

    border-radius: 50px;

    margin-top: 15px;

    box-sizing: border-box;
    padding: 25px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: border-radius cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  }

  .message:hover {
    border-radius: 30px;
  }

  .message h1 {
    color: #4f4f4f;
    font-size: 16px;
  }

  .message div {
    font-size: 13px;
    font-weight: bold;
    color: #85837c;
  }
</style>
