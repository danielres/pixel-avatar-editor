<script lang="ts">
  import type { Board, Stores } from '$lib/stores'

  import Cell from './DrawingBoard/BoardCell.svelte'

  export let board: Board
  export let stores: Stores
</script>

<div>
  {#each board as row}
    <div class="row">
      {#each row as cell}
        <Cell {cell} {stores} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }
</style>
