<script lang="ts">
  import type { Pigggy } from '$lib/usePigggy'
  import { Eye, Flower } from 'lucide-svelte'
  import Checkerboard from './Checkerboard.svelte'

  export let pigggy: Pigggy
  export let hues = 8
  export let lums = 8
  export let lumPad = 30

  const { currentColor, getColors, restorePreviousTool } = pigggy
  const { sat, op, values } = getColors(hues, lums, lumPad)

  type OnPickTarget = EventTarget & HTMLButtonElement & { dataset: { background: string } }

  const onPick = (e: MouseEvent) => {
    const newColor = (e.target as OnPickTarget).dataset.background
    pigggy.setCurrentColor(newColor)
    restorePreviousTool()
  }

  pigggy.setCurrentColor($values[Math.floor($values.length / 2)])
</script>

<Checkerboard color="hsl(0, 0%, 95%)">
  <div class="swatches" style:grid-template-columns="repeat({lums}, 1fr)">
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

<div class="sliders">
  <label title="Saturation: {$sat}%">
    <input type="range" bind:value={$sat} step="25" />
    <div><Flower size={24} color="hsl(310, {$sat / 1.5}%, 45%, 1)" /></div>
  </label>

  <hr />

  <label title="Opacity: {$op}%">
    <Checkerboard rows={1} cols={1} color="hsla(0, 0%, 75%,{1 - $op / 100})">
      <Eye size={24} color="hsla(0, 0%, 45%, {$op / 100})" />
    </Checkerboard>
    <input type="range" bind:value={$op} step="25" />
  </label>
</div>

<style>
  .swatches {
    display: grid;
  }

  .swatches button {
    aspect-ratio: 1;
    border: thin solid #ffffff33;
  }

  .swatches button.active {
    border-color: white;
    box-shadow: -1px 2px 10px 2px hsla(0, 0%, 0%, 0.15), inset 0 0 5px 2px hsla(0, 0%, 0%, 0.05);
    position: relative;
  }

  .sliders {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem;
    margin-top: 1rem;
    text-align: center;
    font-size: smaller;
  }

  .sliders hr {
    border-left-width: 2px;
    height: 100%;
    border-color: #d5d8de;
  }

  .sliders label {
    display: flex;
    gap: 1rem;
  }

  .sliders label input {
    width: 100%;
  }

  .sliders label div {
    margin-inline: auto;
    width: fit-content;
  }
</style>
