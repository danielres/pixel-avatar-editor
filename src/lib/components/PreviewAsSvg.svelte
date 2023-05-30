<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores

  const { boardStore, paletteStore } = stores
  const { sat } = paletteStore

  let _class = ''
  export { _class as class }
</script>

<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class={_class}>
  {#each $boardStore as row, rowIndex}
    {#each row as cell, cellIndex}
      {@const swatch = cell ? $paletteStore[cell[0]][cell[1]] : null}

      <rect
        x={cellIndex * 10}
        y={rowIndex * 10}
        width="10"
        height="10"
        fill={swatch ? `hsl(${swatch[0]} ${sat}% ${swatch[1]}%)` : 'transparent'}
      />
    {/each}
  {/each}
</svg>
