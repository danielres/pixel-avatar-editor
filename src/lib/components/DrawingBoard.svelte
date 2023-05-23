<script lang="ts">
  import type { BoardStore, PaletteStore, StateStore } from '$lib/stores'

  import { createEventDispatcher } from 'svelte'
  import Cell from './DrawingBoard/BoardCell.svelte'

  export let boardStore: BoardStore
  export let paletteStore: PaletteStore
  export let stateStore: StateStore
  export let cellSize: string
  export let debug = false
  export let sat: number

  const { currentSwatchXYStore } = paletteStore

  const dispatch = createEventDispatcher()

  function paint(rowIndex: number, cellIndex: number) {
    return () => {
      $boardStore[rowIndex][cellIndex] = $stateStore.isUsingEraser ? null : $currentSwatchXYStore
      dispatch('paint')
    }
  }

  let isPainting = false
</script>

<div class="checkerboard">
  <div
    id="drawingboard"
    class="board"
    on:mousedown={() => (isPainting = true)}
    on:mouseup={() => (isPainting = false)}
    on:mouseleave={() => (isPainting = false)}
  >
    {#each $boardStore as row, rowIndex}
      <div class="row">
        {#each row as cell, cellIndex}
          <button
            on:mouseover={isPainting ? paint(rowIndex, cellIndex) : null}
            on:mousedown={paint(rowIndex, cellIndex)}
            on:focus
          >
            <Cell {cell} {cellSize} {sat} {paletteStore} {debug} />
          </button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .row {
    display: flex;
  }

  button {
    border: none;
    background: transparent;
  }

  .board {
    box-shadow: inset 0 0 1px 1px #00000033;
  }

  .checkerboard {
    background: repeating-conic-gradient(#00000011 0% 25%, #ffffff22 0% 50%) 50% / 1.5rem 1.5rem;
  }
</style>
