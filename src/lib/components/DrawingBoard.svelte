<script lang="ts">
  import type { BoardStore, PaletteStore, StateStore } from '$lib/stores'

  import { browser } from '$app/environment'
  import Cell from './DrawingBoard/BoardCell.svelte'

  export let boardStore: BoardStore
  export let paletteStore: PaletteStore
  export let stateStore: StateStore
  export let cellSize: string
  export let debug = false
  export let sat: number

  const { currentSwatchXYStore } = paletteStore

  function paint(rowIndex: number, cellIndex: number) {
    return () => {
      $boardStore[rowIndex][cellIndex] = $stateStore.isUsingEraser ? null : $currentSwatchXYStore
    }
  }

  let isPainting = false
  let pointerXY = { x: 0, y: 0 }

  $: if (browser) {
    isPainting
      ? document.body.classList.add('is-painting')
      : document.body.classList.remove('is-painting')
  }
</script>

<div class="checkerboard">
  <div
    id="drawingboard"
    class="board"
    on:mousedown={() => (isPainting = true)}
    on:mouseleave={() => (isPainting = false)}
    on:mouseup={() => (isPainting = false)}
    on:pointerdown={() => (isPainting = true)}
    on:pointermove={(e) => (pointerXY = { x: e.clientX, y: e.clientY })}
    on:pointerup={() => (isPainting = false)}
  >
    {#each $boardStore as row, rowIndex}
      <div class="row">
        {#each row as cell, cellIndex}
          <button on:pointerdown={paint(rowIndex, cellIndex)} on:focus>
            <Cell
              on:pointerInside={isPainting ? paint(rowIndex, cellIndex) : null}
              {cell}
              {cellSize}
              {sat}
              {paletteStore}
              {debug}
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
