<script lang="ts">
  import DrawingBoard from './DrawingBoard.svelte'
  import Palette from './Palette.svelte'
  import makeStores from './stores'

  const { boardStore, paletteStore } = makeStores({
    board: { width: 8, height: 8 },
    palette: { hues: 8, lums: 8, sat: 50 },
  })
</script>

<div class="main">
  <DrawingBoard {boardStore} {paletteStore} cellSize="2rem" />
  <Palette {paletteStore} swatchSize="2rem" />
</div>

<section>[history]</section>

<style>
  .main {
    display: flex;
    gap: 2rem;
  }
</style>
