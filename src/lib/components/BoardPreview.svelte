<script lang="ts">
  import type { Board } from '$lib/usePigggy'

  export let board: Board
</script>

<div class="board" style:grid-template-columns="repeat({board.cols}, 1fr)">
  {#each board.values as value, i}
    <div class="cell" style:background={value} />
  {/each}
</div>

<style>
  .board {
    display: grid;
  }

  .cell {
    aspect-ratio: 1;
    cursor: crosshair;
  }
</style>
