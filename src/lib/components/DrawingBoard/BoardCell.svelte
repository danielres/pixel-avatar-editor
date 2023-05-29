<script lang="ts">
  import type { BoardCell, Stores } from '$lib/stores'

  import { createEventDispatcher, onMount } from 'svelte'

  export let cell: BoardCell
  export let stores: Stores
  export let pointerXY: undefined | { x: number; y: number } = undefined

  const sat = stores.paletteStore.sat
  const debug = stores.debug

  const { paletteStore } = stores

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
  style:width="var(--cell-size)"
  style:height="var(--cell-size)"
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
  .debug {
    font-size: xx-small;
    opacity: 0.4;
  }
</style>
