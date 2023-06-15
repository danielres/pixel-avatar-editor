<script lang="ts">
  import Adjust from '$lib/components/Adjust.svelte'
  import Board from '$lib/components/Board.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Ratio from '$lib/components/Ratio.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import makeStores from '$lib/stores'

  const stores = makeStores(12, 12)
  const { board, isPainting, paint, currentTool, restorePreviousTool } = stores
</script>

<div class="shell">
  <header>
    <div class="card">HEADER</div>
  </header>

  <aside>
    <Tools {stores} />
  </aside>

  <Ratio ratiow={$board.cols} ratioh={$board.values.length / $board.cols}>
    <div class="stack">
      <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
        <Board {stores} />
      </Checkerboard>

      {#if $currentTool === 'adjust'}
        <Adjust {stores} />
      {/if}

      <div class="stack" style:display={$currentTool === 'picker' ? 'grid' : 'none'}>
        <button on:pointerdown={restorePreviousTool} title="close" />
        <div class="card" style:width="75%" style:place-self="center">
          <Picker {stores} />
        </div>
      </div>
    </div>
  </Ratio>
</div>

<style>
  .shell {
    height: calc(100svh);
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  header {
    grid-column: 1 / -1;
    background: #ccc;
  }
</style>
