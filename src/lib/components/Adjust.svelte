<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores
  const { adjust } = stores
</script>

<div class="adjust stack">
  <div class="left x">
    <button on:click={adjust.addColumnBefore}>+</button>
    <button on:click={adjust.moveLeft}>M</button>
    <button on:click={adjust.removeColumnBefore}>-</button>
  </div>

  <div class="right x">
    <button on:click={adjust.addColumnAfter}>+</button>
    <button on:click={adjust.moveRight}>M</button>
    <button on:click={adjust.removeColumnAfter}>-</button>
  </div>

  <div class="top y">
    <button on:click={adjust.addRowBefore}>+</button>
    <button on:click={adjust.moveUp}>M</button>
    <button on:click={adjust.removeRowBefore}>-</button>
  </div>

  <div class="bottom y">
    <button on:click={adjust.addRowAfter}>+</button>
    <button on:click={adjust.moveDown}>M</button>
    <button on:click={adjust.removeRowAfter}>-</button>
  </div>
</div>

<style>
  button {
    aspect-ratio: 1;
    width: 1rem;
  }

  .x {
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 1rem;
  }

  .y {
    display: flex;
    height: fit-content;
    gap: 1rem;
  }

  .left {
    align-self: center;
  }

  .right {
    align-self: center;
    justify-self: end;
  }

  .top {
    justify-self: center;
  }

  .bottom {
    justify-self: center;
    align-self: end;
  }
</style>
