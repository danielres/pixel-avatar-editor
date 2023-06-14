<script lang="ts">
  import type { Stores } from '$lib/stores'
  import Checkerboard from './Checkerboard.svelte'

  export let hues = 8
  export let lums = 8
  export let lumPad = 30
  export let stores: Stores

  const getHue = (i: number) => (Math.floor(i / lums) * 360) / hues
  const getLum = (i: number) => lumPad + ((100 - lumPad) / lums) * (i % hues)

  let sat = 40
  let op = 100

  type OnPickTarget = EventTarget &
    HTMLButtonElement & { dataset: { hue: string; lum: string; op: string; sat: string } }

  const onPick = (e: MouseEvent) => {
    const target = e.target as OnPickTarget
    const { hue, lum, op, sat } = target.dataset
    const str = `hsla(${hue}, ${sat}, ${lum}, ${op})`
    stores.setCurrentColor(str)
  }
</script>

<Checkerboard>
  <div style:--lums={lums}>
    {#each Array.from({ length: lums * hues }) as item, i}
      <button
        on:click={onPick}
        style:--hue={getHue(i)}
        style:--lum="{getLum(i)}%"
        style:--sat="{sat}%"
        style:--op={op / 100}
        data-hue={getHue(i)}
        data-lum="{getLum(i)}%"
        data-sat="{sat}%"
        data-op={op / 100}
      />
    {/each}
  </div>
</Checkerboard>

<input title="saturation {sat}" type="range" bind:value={sat} step="20" />
<input title="opacity {op}" type="range" bind:value={op} step="20" />

<style>
  div {
    display: grid;
    grid-template-columns: repeat(var(--lums), 1fr);
  }

  button {
    aspect-ratio: 1;
    background: hsla(var(--hue), var(--sat), var(--lum), var(--op));
    border: thin solid #ffffff33;
  }
</style>
