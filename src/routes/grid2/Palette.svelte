<script lang="ts">
  import type { PaletteStore } from './stores'

  import Swatch from './Palette/Swatch.svelte'

  export let paletteStore: PaletteStore
  export let swatchSize: string
  export let sat: number

  const { currentSwatchXYStore } = paletteStore
</script>

<div class="palette">
  {#each $paletteStore as row, x}
    <div class="row">
      {#each row as swatch, y}
        <Swatch
          {swatchSize}
          {swatch}
          {sat}
          on:click={() => ($currentSwatchXYStore = [x, y])}
          isActive={x === $currentSwatchXYStore[0] && y === $currentSwatchXYStore[1]}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }
</style>
