<script lang="ts">
  import DrawingBoard from './DrawingBoard.svelte'
  import Palette from './Palette.svelte'
  import presets from './presets'
  import makeStores from './stores'

  const debug = false
  const sat = 40

  const { boardStore, paletteStore } = makeStores({
    board: { width: 12, height: 12 },
    palette: { hues: 8, lums: 8, sat },
  })
</script>

<div class="presets">
  {#each Object.entries(presets) as [k, v]}
    <button on:click={() => ($boardStore = v)}>{k}</button>
  {/each}
</div>

<div class="main">
  <DrawingBoard {boardStore} {paletteStore} cellSize="2rem" {sat} {debug} />
  <Palette {paletteStore} swatchSize="2rem" {sat} />
</div>

<div>
  {JSON.stringify($boardStore)}
</div>

<section>[history]</section>

<style>
  .main {
    display: flex;
    gap: 2rem;
  }
</style>
