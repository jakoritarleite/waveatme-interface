<script lang="ts">
  import { slide } from 'svelte/transition';
  import * as metamask from '@app/lib/metamask';
  import { isConnected } from '@stores/wallet';
  import SendIcon from '@components/assets/SendIcon.svelte';

  let value: string;

  const send = async () => {
    if (value === undefined) return;

    try {
      await metamask.sendWave(value);
      await metamask.getAllWaves();

      value = '';
    } catch (err) {
      console.log(err);
    }
  };
</script>

{#if $isConnected}
  <div transition:slide class="message-input">
    <textarea
      placeholder="Write your message here"
      maxlength="280"
      bind:value
    />
    <button on:click={send}
      ><SendIcon style={'margin-left: 2px; margin-top: 2px;'} /></button
    >
  </div>
{/if}

<style>
  .message-input {
    position: relative;

    margin-top: 65px;
  }

  textarea {
    background-color: #f2e8e1;

    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 16px;

    width: 100%;
    height: 181px;

    resize: none;
    border: none;
    outline: none;
    border-radius: 10px;

    margin-top: 15px;

    box-sizing: border-box;
    padding: 25px;
  }

  button {
    position: absolute;

    background-color: #c4c4c4;

    height: 40px;
    width: 40px;

    border: none;
    outline: none;
    border-radius: 10px;

    right: 23px;
    bottom: 25px;

    transition: all 0.2s ease;
  }

  button:hover {
    height: 45px;
    width: 45px;

    right: 20px;
    bottom: 22px;
  }
</style>
