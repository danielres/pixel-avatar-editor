<script lang="ts">
  import Adjust from '$lib/components/Adjust.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import makeStores from '$lib/stores'

  const stores = makeStores(12, 12)
  const { board, isPainting, paint, tool } = stores
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<Tools {stores} />

<div style="width: 200px">
  <Picker {stores} />
</div>

<div class="wrapper">
  <div class="stack">
    <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
      <div class="board" style:grid-template-columns="repeat({$board.cols}, 1fr)">
        {#each $board.values as value, i}
          <button
            style:background={value}
            on:pointerdown={() => {
              paint(i)
              $isPainting = true
            }}
            on:pointerover={$isPainting ? () => paint(i) : null}
          />
        {/each}
      </div>
    </Checkerboard>

    {#if $tool === 'adjust'}
      <Adjust {stores} />
    {/if}
  </div>
</div>

<style>
  .wrapper {
    max-width: 25%;
  }

  .board {
    display: grid;
    border: 1px solid black;
  }

  .board button {
    aspect-ratio: 1;
  }
</style>
