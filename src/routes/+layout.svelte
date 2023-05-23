<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<div class="shell">
  <header>HEAD</header>

  <slot />

  <footer>Foot</footer>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  .shell {
    display: grid;
    gap: 1rem;
  }
</style>
