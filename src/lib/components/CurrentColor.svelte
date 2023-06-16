<script lang="ts">
  import type { Pigggy } from '$lib/usePigggy'

  export let pigggy: Pigggy

  const { currentColor } = pigggy
</script>

<div style:background={$currentColor} />

<style lang="postcss">
  div {
    aspect-ratio: 1;
  }
</style>
