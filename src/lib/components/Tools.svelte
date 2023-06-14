<script lang="ts">
  import type { Stores } from '$lib/stores'

  export let stores: Stores
  const { setCurrentTool } = stores
</script>

<ul>
  <li><button on:pointerdown={setCurrentTool('brush')}>Brush</button></li>
  <li><button on:pointerdown={setCurrentTool('eraser')}>Eraser</button></li>
  <li><button on:pointerdown={setCurrentTool('fill')}>Fill</button></li>
  <li><button on:pointerdown={setCurrentTool('adjust')}>Adjust</button></li>
</ul>

<style>
  ul {
    display: flex;
    gap: 1rem;
  }
</style>
