<script lang="ts">
  import type { Swatch } from '../../stores'

  export let swatch: Swatch
  export let swatchSize: string
  export let isActive = false

  export let sat = 50

  const hue = swatch[0]
  const lum = swatch[1]
</script>

<button
  on:click
  class:isActive
  style:background="hsl({hue},{sat}%,{lum}%)"
  style:width={swatchSize}
  style:height={swatchSize}
/>

<style>
  button {
    border: none;
    cursor: crosshair;
  }

  .isActive {
    border: 2px solid #ffffffaa;
    box-shadow: inset 0 0 5px #00000066;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
