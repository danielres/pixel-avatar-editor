<script lang="ts">
  import type { Stores } from '$lib/stores'
  import Checkerboard from './Checkerboard.svelte'

  export let stores: Stores
  export let hues = 8
  export let lums = 8
  export let lumPad = 30

  const { currentColor, getColors } = stores
  const { sat, op, values } = getColors(hues, lums, lumPad)

  type OnPickTarget = EventTarget & HTMLButtonElement & { dataset: { background: string } }

  const onPick = (e: MouseEvent) => {
    const newColor = (e.target as OnPickTarget).dataset.background
    stores.setCurrentColor(newColor)
  }

  stores.setCurrentColor($values[Math.floor($values.length / 2)])
</script>

<Checkerboard>
  <div style:grid-template-columns="repeat({lums}, 1fr)">
    {#each $values as bg}
      <button
        on:click={onPick}
        style:background={bg}
        data-background={bg}
        class:active={bg === $currentColor}
      />
    {/each}
  </div>
</Checkerboard>
<input title="saturation {sat}" type="range" bind:value={$sat} step="20" />
<input title="opacity {op}" type="range" bind:value={$op} step="20" />

<style>
  div {
    display: grid;
  }

  button {
    aspect-ratio: 1;
    border: thin solid #ffffff33;
  }

  button.active {
    border-color: white;
    box-shadow: -1px 2px 10px 2px hsla(0, 0%, 0%, 0.15), inset 0 0 5px 2px hsla(0, 0%, 0%, 0.05);
    position: relative;
  }
</style>
