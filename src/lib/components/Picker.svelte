<script lang="ts">
  import type { Stores } from '$lib/stores'
  import { onMount } from 'svelte'
  import Checkerboard from './Checkerboard.svelte'

  export let stores: Stores
  export let hues = 8
  export let lums = 8
  export let lumPad = 30

  const { currentColor } = stores

  const getHue = (i: number) => (Math.floor(i / lums) * 360) / hues
  const getLum = (i: number) => lumPad + ((100 - lumPad) / lums) * (i % hues)

  let sat = 40
  let op = 100

  $: backgrounds = Array.from({ length: lums * hues }).map(
    (_, i) => `hsla(${getHue(i)}, ${sat}%, ${getLum(i)}%, ${op / 100})`
  )

  type OnPickTarget = EventTarget & HTMLButtonElement & { dataset: { background: string } }

  const onPick = (e: MouseEvent) => {
    const newColor = (e.target as OnPickTarget).dataset.background
    stores.setCurrentColor(newColor)
  }

  onMount(() => {
    const middleColor = backgrounds[Math.floor(backgrounds.length / 2)]
    stores.setCurrentColor(middleColor)
  })
</script>

<Checkerboard>
  <div style:grid-template-columns="repeat({lums}, 1fr)">
    {#each backgrounds as bg}
      <button
        on:click={onPick}
        style:background={bg}
        data-background={bg}
        class:active={bg === $currentColor}
      />
    {/each}
  </div>
</Checkerboard>
<input title="saturation {sat}" type="range" bind:value={sat} step="20" />
<input title="opacity {op}" type="range" bind:value={op} step="20" />

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
