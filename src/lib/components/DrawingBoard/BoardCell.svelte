<script lang="ts">
  import type { BoardCell, PaletteStore } from '$lib/stores'

  import { createEventDispatcher, onMount } from 'svelte'

  export let debug = false
  export let cell: BoardCell
  export let cellSize: string
  export let paletteStore: PaletteStore
  export let sat: number
  export let pointerXY: { x: number; y: number }

  $: swatch = cell ? $paletteStore[cell[0]][cell[1]] : null

  let element: HTMLElement
  let rect: DOMRect

  const dispatch = createEventDispatcher()

  $: if (rect && pointerXY) {
    const { left, right, top, bottom } = rect
    const { x, y } = pointerXY
    if (x > left && x < right && y > top && y < bottom) dispatch('pointerInside')
  }

  onMount(() => (rect = element.getBoundingClientRect()))
</script>

<div
  bind:this={element}
  style:width={cellSize}
  style:height={cellSize}
  style:background={swatch ? `hsl(${swatch[0]} ${sat}% ${swatch[1]}%)` : 'transparent'}
>
  {#if debug}
    <div class="debug">
      <div>{cell}</div>
      <div>{swatch}</div>
    </div>
  {/if}
</div>

<style>
  div {
    font-size: xx-small;
  }
  .debug {
    opacity: 0.4;
  }
</style>
