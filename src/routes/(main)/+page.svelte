<script lang="ts">
  import type { PageData } from './$types'

  import Adjust from '$lib/components/Adjust.svelte'
  import Board from '$lib/components/Board.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Ratio from '$lib/components/Ratio.svelte'

  export let data: PageData

  const pigggy = data.pigggy
  const { board, currentTool, restorePreviousTool } = pigggy
</script>

<Ratio ratiow={$board.cols} ratioh={$board.values.length / $board.cols}>
  <div class="stack outer">
    <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
      <Board {pigggy} />
    </Checkerboard>

    {#if $currentTool === 'adjust'}<Adjust {pigggy} />{/if}

    <div class="stack" style:display={$currentTool === 'picker' ? 'grid' : 'none'}>
      <button on:pointerdown={restorePreviousTool} title="close" />
      <div class="card" style:width="75%" style:place-self="center">
        <Picker {pigggy} />
      </div>
    </div>
  </div>
</Ratio>

<style>
  .outer {
    box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.604);
  }
</style>
