<script>
  /** @type {import("$lib/types").Stores} */
  export let stores
  /** @type {import("$lib/types").Board | undefined} */
  export let board = undefined

  const { boardStore, paletteStore } = stores
  const { sat } = paletteStore

  let _class = 'shadow-inner bg-gray-50 border border-gray-300'
  export { _class as class }

  $: b = board ? board : $boardStore
</script>

<div class={_class}>
  {#each b as row}
    <div class="row" style:grid-template-columns="repeat({b.length},1fr)">
      {#each row as cell}
        {@const swatch = cell ? $paletteStore[cell[0]][cell[1]] : null}
        <!-- nested divs are a fix for rounding error in chrome leaving visible gaps at certain zoom levels -->
        <div style:background={swatch ? `hsl(${swatch[0]} ${sat}% ${swatch[1]}%)` : 'transparent'}>
          <div style:aspect-ratio="1" />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: grid;
  }
</style>
