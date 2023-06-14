<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores
  const { setTool } = stores
</script>

<ul>
  <li><button on:pointerdown={setTool('brush')}>Brush</button></li>
  <li><button on:pointerdown={setTool('eraser')}>Eraser</button></li>
  <li><button on:pointerdown={setTool('fill')}>Fill</button></li>
  <li><button on:pointerdown={setTool('adjust')}>Adjust</button></li>
</ul>

<style>
  ul {
    display: flex;
    gap: 1rem;
  }
</style>
