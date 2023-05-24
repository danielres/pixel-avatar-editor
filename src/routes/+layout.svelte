<script lang="ts">
  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<div class="shell" data-sveltekit-reload>
  <header>
    <a href="/">
      <img class="mascot" src="/piggy.png" alt="mascot" width="75" height="75" />
      <img src="/logo_02.png" alt="logo" height="45" />
    </a>
  </header>

  <slot />
</div>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  :global(body) {
    background: white;
  }

  .shell {
    display: grid;
    gap: 3rem;
  }

  img.mascot {
    position: relative;
    top: 1rem;
  }

  header a {
    display: flex;
    /* justify-content: center; */
    gap: 1rem;
    align-items: center;
    padding: 0 2rem;
    background: #eee;
    background: rgb(240, 247, 233);
  }

  header img {
    image-rendering: crisp-edges;
  }
</style>
