<script>
  import Cell from './DrawingBoard/BoardCell.svelte'

  /** @type {import('$lib/types').Board} */
  export let board

  /** @type {import('$lib/types').Stores} */
  export let stores
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
