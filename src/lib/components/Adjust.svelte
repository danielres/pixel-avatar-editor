<script lang="ts">
  import type { Stores } from '$lib/stores'
  import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, Minus, Plus } from 'lucide-svelte'

  export let stores: Stores
  const { adjust, restorePreviousTool, board } = stores
</script>

<div class="adjust stack">
  <div class="feedback-grid" style:grid-template-columns="repeat({$board.cols}, 1fr)">
    {#each $board.values as _}<div />{/each}
  </div>

  <button class="done" on:click={restorePreviousTool} title="Done" />

  <div
    class="info"
    title="{$board.cols} columns (width) × {$board.values.length / $board.cols} rows (height)"
  >
    {$board.cols} × {$board.values.length / $board.cols}
  </div>

  <div class="left x">
    <button on:click={adjust.addColumnBefore} title="Add one column to the left"><Plus /></button>
    <button on:click={adjust.moveLeft} title="Move drawing left"><ArrowBigLeft /></button>
    <button on:click={adjust.removeColumnBefore} title="Remove one column from the left">
      <Minus />
    </button>
  </div>

  <div class="right x">
    <button on:click={adjust.addColumnAfter} title="Add one column to the right"><Plus /></button>
    <button on:click={adjust.moveRight} title="Move drawing right"><ArrowBigRight /></button>
    <button on:click={adjust.removeColumnAfter} title="Remove one column from the right">
      <Minus />
    </button>
  </div>

  <div class="top y">
    <button on:click={adjust.addRowBefore} title="Add one row to the top"><Plus /></button>
    <button on:click={adjust.moveUp} title="Move drawing up"><ArrowBigUp /></button>
    <button on:click={adjust.removeRowBefore} title="Remove one row from the top"><Minus /></button>
  </div>

  <div class="bottom y">
    <button on:click={adjust.addRowAfter} title="Add one row to the bottom"><Plus /></button>
    <button on:click={adjust.moveDown} title="Move drawing down"><ArrowBigDown /></button>
    <button on:click={adjust.removeRowAfter} title="Remove one row from the bottom">
      <Minus />
    </button>
  </div>
</div>

<style>
  :is(.x, .y) button {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    place-items: center;
    padding: 0.5rem;
    backdrop-filter: blur(5px);
  }

  :is(.x, .y) button:hover {
    background: white;
  }

  .done {
    cursor: crosshair;
  }

  .feedback-grid {
    display: grid;
  }

  .feedback-grid > div {
    box-shadow: inset 0 0 0 1px #00000009;
  }

  .info {
    background: rgba(255, 255, 255, 0.4);
    place-self: start end;
    padding-inline: 0.375rem;
    padding-block: 0.125rem;
    margin: 0.5rem;
    font-size: smaller;
    backdrop-filter: blur(5px);
    cursor: help;
  }

  .info:hover {
    background: white;
  }

  .x {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 2px;
  }

  .y {
    display: flex;
    height: fit-content;
    margin: 2px;
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
