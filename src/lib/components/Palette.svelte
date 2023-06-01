<script>
  import Swatch from './Palette/Swatch.svelte'

  /** @type {import('$lib/types').Stores} */
  export let stores

  /** @type {string} */
  export let swatchSize

  const { paletteStore, stateStore } = stores
  const { currentSwatchXYStore, usedColors } = paletteStore
</script>

<div class="palette">
  {#each $paletteStore as row, x}
    <div class="row">
      {#each row as swatch, y}
        <Swatch
          {swatchSize}
          {swatch}
          sat={stores.paletteStore.sat}
          on:click={() => {
            $stateStore.isUsingEraser = false
            $currentSwatchXYStore = [x, y]
            $usedColors = [...$usedColors, $currentSwatchXYStore]
          }}
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
