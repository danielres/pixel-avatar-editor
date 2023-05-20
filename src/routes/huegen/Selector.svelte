<script lang="ts">
  export let hue = 340

  export let lums: number[] = []
</script>

<div class="row">
  <div class="variations">
    {#each lums as lum}
      <div class="swatch" style="--hue: {hue}; --lum: {lum}%" />
    {/each}
  </div>
  <input type="range" id="volume" name="volume" min="0" max="330" bind:value={hue} step="30" />
</div>

<style>
  :root {
    --hue: 0;
    --sat: 50%;
    --lum: 50%;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .swatch {
    background: hsl(var(--hue) var(--sat) var(--lum));
    width: 2rem;
    height: 2rem;
  }

  .variations {
    display: flex;
  }

  input[type='range'] {
    width: 5rem;
  }
</style>
