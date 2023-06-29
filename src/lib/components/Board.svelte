<script lang="ts">
  import type { Pigggy } from '$lib/usePigggy'

  export let pigggy: Pigggy

  const { board, currentTool, isPainting, paint } = pigggy
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<div style:grid-template-columns="repeat({$board.cols}, 1fr)">
  {#each $board.values as value, i}
    <button
      style:background={value}
      on:pointerup={board.snapshot}
      on:pointerdown={() => {
        $isPainting = true
        if (['pipette', 'smudge'].includes($currentTool)) pigggy.setCurrentColor(value)
        else paint(i)
      }}
      on:pointerover={() => {
        if (!$isPainting) return
        if ($currentTool === 'pipette') pigggy.setCurrentColor(value)
        else paint(i)
      }}
    />
  {/each}
</div>

<style>
  div {
    display: grid;
  }

  button {
    aspect-ratio: 1;
    cursor: crosshair;
  }
</style>
