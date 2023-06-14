<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores

  const { currentColor } = stores
</script>

<div style:background={$currentColor} />

<style lang="postcss">
  div {
    aspect-ratio: 1;
  }
</style>
