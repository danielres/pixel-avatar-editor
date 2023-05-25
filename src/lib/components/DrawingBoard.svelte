<script lang="ts">
  import type { Stores } from '$lib/stores'

  import Cell from './DrawingBoard/BoardCell.svelte'

  export let stores: Stores
  export let cellSize: string

  const { boardStore, stateStore, debug, paintCell } = stores

  let pointerXY = { x: 0, y: 0 }
</script>

<div class="checkerboard">
  {#if debug}
    isPainting: {$stateStore.isPainting}
  {/if}

  <div
    id="drawingboard"
    class="board"
    on:mousedown={() => ($stateStore.isPainting = true)}
    on:mouseleave={() => ($stateStore.isPainting = false)}
    on:mouseup={() => ($stateStore.isPainting = false)}
    on:pointerdown={() => ($stateStore.isPainting = true)}
    on:pointermove={(e) => (pointerXY = { x: e.clientX, y: e.clientY })}
    on:pointerup={() => ($stateStore.isPainting = false)}
  >
    {#each $boardStore as row, rowIndex}
      <div class="row">
        {#each row as cell, cellIndex}
          <button on:pointerdown={paintCell(rowIndex, cellIndex)} on:focus>
            <Cell
              on:pointerInside={$stateStore.isPainting ? paintCell(rowIndex, cellIndex) : null}
              {cell}
              {cellSize}
              {stores}
              {pointerXY}
            />
          </button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  :global(body.is-painting) {
    width: 100vw;
    height: 50vh;
    overflow-y: hidden;
  }

  .row {
    display: flex;
  }

  button {
    border: none;
    background: transparent;
  }

  .checkerboard {
    box-shadow: inset 0 0 10px 1px #00000033;
    background: repeating-conic-gradient(#00000011 0% 25%, #ffffff22 0% 50%) 50% / 1.5rem 1.5rem;
  }
</style>
