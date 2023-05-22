<script lang="ts">
  import type { BoardStore, PaletteStore } from './stores'

  export let boardStore: BoardStore
  export let paletteStore: PaletteStore
  export let cellSize: string

  const currentSwatchXYStore = paletteStore.currentSwatchXYStore

  function onClick(rowIndex: number, cellIndex: number) {
    return () => ($boardStore[rowIndex][cellIndex] = $currentSwatchXYStore)
  }
</script>

<div class="drawingBoard">
  {#each $boardStore as row, rowIndex}
    <div class="row">
      {#each row as cell, cellIndex}
        <button
          class="cell"
          on:click={onClick(rowIndex, cellIndex)}
          style="
            width: {cellSize};
            height: {cellSize};
          "
        >
          {cell}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }

  .cell {
    border: none;
  }
</style>
