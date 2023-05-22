<script lang="ts">
  import type { Board, PaletteStore } from '../stores'

  import Cell from './DrawingBoard/BoardCell.svelte'

  export let board: Board
  export let paletteStore: PaletteStore
  export let cellSize: string
  export let debug = false
  export let sat: number
</script>

<div>
  {#each board as row}
    <div class="row">
      {#each row as cell}
        <Cell {cell} {cellSize} {sat} {paletteStore} {debug} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }
</style>
