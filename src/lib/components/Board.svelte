<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores

  const { board, currentTool, isPainting, paint } = stores
  const { history } = board
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<div style:grid-template-columns="repeat({$board.cols}, 1fr)">
  {#each $board.values as value, i}
    <button
      style:background={value}
      on:pointerup={history.append}
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

<style>
  div {
    display: grid;
    box-shadow: inset 0 0 15px 1px #0000001e;
    border: 2px solid white;
  }

  button {
    aspect-ratio: 1;
    cursor: crosshair;
  }
</style>
