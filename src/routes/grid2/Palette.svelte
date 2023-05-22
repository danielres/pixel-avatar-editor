<script lang="ts">
  import type { Writable } from 'svelte/store'
  import type { Palette } from './stores'

  import Swatch from './Palette/Swatch.svelte'

  export let store: Writable<Palette>
</script>

<div class="palette">
  {#each $store as row}
    <div class="row">
      {#each row as swatch}
        <Swatch {swatch} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
  }
</style>
