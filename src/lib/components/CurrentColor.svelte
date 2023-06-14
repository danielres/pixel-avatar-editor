<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores

  const { currentColor } = stores
  const size = '2rem'
</script>

<div style:background={$currentColor} style:width={size} />

<style lang="postcss">
  div {
    aspect-ratio: 1;
  }
</style>
