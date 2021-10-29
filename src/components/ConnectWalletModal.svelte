<script lang="ts">
  import { slide } from 'svelte/transition';

  export let show: boolean = false;

  $: show;
</script>

{#if show}
  <div class="modal-bg">
    <div transition:slide class="modal">
      <h1>Connect your wallet</h1>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: absolute;

    height: 100vh;
    width: 100vw;

    top: 0;
    left: 0;

    background-color: #fafafa;
  }

  .modal h1 {
    font-size: 22px;
  }

  @media only screen and (min-width: 620px) {
    .modal-bg {
      position: absolute;

      height: 100vh;
      width: 100vw;

      top: 0;
      left: 0;

      background: rgba(0, 0, 0, 0.2);
      z-index: 99;
    }

    .modal {
      height: 437px;
      width: 55ch;

      border-radius: 10px;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
