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
    background-color: #fffcf5;

    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 16px;

    width: 100%;
    height: 181px;

    resize: none;
    border: none;
    outline: none;
    border-radius: 50px;

    margin-top: 15px;

    box-sizing: border-box;
    padding: 25px;

    transition: border-radius cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  }

  textarea:hover {
    border-radius: 30px;
  }

  button {
    position: absolute;

    background-color: #b7f1db;

    height: 60px;
    width: 60px;

    border: none;
    outline: none;
    border-radius: 20px;

    right: 23px;
    bottom: 25px;

    transition: border-radius cubic-bezier(0.4, 0, 0.2, 1) 250ms;
  }

  button:hover {
    border-radius: 14px;
  }
</style>
