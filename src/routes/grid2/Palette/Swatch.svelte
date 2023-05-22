<script lang="ts">
  import type { Swatch } from '../stores'

  export let swatch: Swatch
  export let size = '2rem'
  export let sat = 50

  const hue = swatch[0]
  const lum = swatch[1]
</script>

<div
  style="
    background: hsl({hue},{sat}%,{lum}%);
    width: {size};
    height: {size};
  "
/>
