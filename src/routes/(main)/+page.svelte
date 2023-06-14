<script lang="ts">
  import Adjust from '$lib/components/Adjust.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import CurrentColor from '$lib/components/CurrentColor.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Ratio from '$lib/components/Ratio.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import makeStores from '$lib/stores'

  const stores = makeStores(12, 12)
  const { board, isPainting, paint, currentTool } = stores
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<div class="shell">
  <header>
    <div class="card">HEADER</div>
  </header>

  <aside>
    <div class="card shadow-md">
      <Tools {stores} />
    </div>
  </aside>

  <Ratio ratiow={$board.cols} ratioh={$board.values.length / $board.cols}>
    <div class="stack">
      <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
        <div class="board" style:grid-template-columns="repeat({$board.cols}, 1fr)">
          {#each $board.values as value, i}
            <button
              style:background={value}
              on:pointerdown={() => {
                $isPainting = true
                if (['pipette', 'smudge'].includes($currentTool)) stores.setCurrentColor(value)
                else paint(i)
              }}
              on:pointerover={() => {
                if (!$isPainting) return
                if ($currentTool === 'pipette') stores.setCurrentColor(value)
                else paint(i)
              }}
            />
          {/each}
        </div>
      </Checkerboard>

      {#if $currentTool === 'adjust'}
        <Adjust {stores} />
      {/if}

      <div
        class="card"
        style:display={$currentTool === 'picker' ? 'block' : 'none'}
        style:width="75%"
        style:place-self="center"
      >
        <Picker {stores} />
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

  .board {
    display: grid;
    box-shadow: inset 0 0 15px 1px #0000001e;
  }

  .board button {
    aspect-ratio: 1;
  }
</style>
