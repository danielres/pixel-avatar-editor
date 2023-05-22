<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<div class="shell">
  <nav>
    <ul>
      <li><a href="/class">Class & canvas</a></li>
      <li><a href="/huegen">Huegen</a></li>
      <li><a href="/grid" data-sveltekit-reload>Grid</a></li>
      <li><a href="/grid2" data-sveltekit-reload>Grid2</a></li>
    </ul>
  </nav>

  <slot />
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
  }

  .shell {
    display: grid;
    gap: 1rem;
  }
</style>
