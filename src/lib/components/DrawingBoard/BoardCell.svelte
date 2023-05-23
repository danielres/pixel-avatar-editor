<script lang="ts">
  import type { BoardCell, PaletteStore } from '$lib/stores'

  export let debug = false
  export let cell: BoardCell
  export let cellSize: string
  export let paletteStore: PaletteStore
  export let sat: number

  $: swatch = cell ? $paletteStore[cell[0]][cell[1]] : null
</script>

<div
  style:width={cellSize}
  style:height={cellSize}
  style:background={swatch ? `hsl(${swatch[0]} ${sat}% ${swatch[1]}%)` : 'transparent'}
>
  {#if debug}
    <div>{cell}</div>
    <div>{swatch}</div>
  {/if}
</div>

<style>
  div {
    font-size: xx-small;
  }
</style>
