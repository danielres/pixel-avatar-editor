<script>
  export let ratiow = 16
  export let ratioh = 9
</script>

<div class="ratio-container" style:--ratiow={ratiow} style:--ratioh={ratioh}>
  <main class="contained">
    <slot />
  </main>
</div>

<style lang="postcss">
  .ratio-container {
    container-type: size;
    width: 100%;
    height: 100%;
  }

  .contained {
    width: min(100cqw, 100cqh * var(--ratiow) / var(--ratioh));
    height: min(100cqw * var(--ratioh) / var(--ratiow), 100cqh);
    /* box-shadow: inset 0 0 0 10px #88000033; */
    display: grid;
    margin-inline: auto;
  }
</style>
