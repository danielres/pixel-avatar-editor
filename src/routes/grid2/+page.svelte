<script lang="ts">
  import Palette from './Palette.svelte'
  import makeStores from './stores'

  const { boardStore, paletteStore } = makeStores({
    board: { width: 8, height: 8 },
    palette: { hues: 8, lums: 8, sat: 50 },
  })
</script>

<Palette store={paletteStore} />

<pre>{JSON.stringify($boardStore, null, 2)}</pre>

<section>[DrawingBoard]</section>
<section>[palette]</section>
<section>[history]</section>
