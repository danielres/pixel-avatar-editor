<script>
  import { createEventDispatcher, onMount } from 'svelte'

  /** @type {import('$lib/types').BoardCell} */
  export let cell

  /** @type {import('$lib/types').Stores} */
  export let stores

  /** @type {undefined | { x: number; y: number }} */
  export let pointerXY = undefined

  const sat = stores.paletteStore.sat
  const debug = stores.debug

  const { paletteStore } = stores

  $: swatch = cell ? $paletteStore[cell[0]][cell[1]] : null

  /** @type {HTMLElement} */
  let element

  /** @type {DOMRect} */
  let rect

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
