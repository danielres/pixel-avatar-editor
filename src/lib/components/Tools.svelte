<script lang="ts">
  import type { Stores } from '$lib/stores'

  import { Brush, Crop, Eraser, PaintBucket, Pipette, Pointer } from 'lucide-svelte'
  import Checkerboard from './Checkerboard.svelte'
  import CurrentColor from './CurrentColor.svelte'

  export let stores: Stores
  const { setCurrentTool } = stores
</script>

<ul>
  <li><button on:pointerdown={setCurrentTool('brush')}><Brush /></button></li>
  <li><button on:pointerdown={setCurrentTool('eraser')}><Eraser /></button></li>
  <li><button on:pointerdown={setCurrentTool('fill')}><PaintBucket /></button></li>
  <li><button on:pointerdown={setCurrentTool('adjust')}><Crop /></button></li>
  <li><button on:pointerdown={setCurrentTool('pipette')}><Pipette /></button></li>
  <li><button on:pointerdown={setCurrentTool('smudge')}><Pointer /></button></li>
  <li>
    <button on:pointerdown={setCurrentTool('picker')} style:width="2rem">
      <Checkerboard rows={1} cols={1}>
        <CurrentColor {stores} />
      </Checkerboard>
    </button>
  </li>
</ul>

<style>
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>
