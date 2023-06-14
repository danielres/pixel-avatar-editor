<script lang="ts">
  import type { Stores } from '$lib/stores'

  import { Brush, Crop, Eraser, PaintBucket, Pipette, Pointer } from 'lucide-svelte'
  import Checkerboard from './Checkerboard.svelte'
  import CurrentColor from './CurrentColor.svelte'

  export let stores: Stores
  const { setCurrentTool, currentTool, restorePreviousTool } = stores
</script>

<ul>
  <li class:active={$currentTool === 'brush'}>
    <button on:pointerdown={() => setCurrentTool('brush')}><Brush /></button>
  </li>
  <li class:active={$currentTool === 'eraser'}>
    <button on:pointerdown={() => setCurrentTool('eraser')}><Eraser /></button>
  </li>
  <li class:active={$currentTool === 'fill'}>
    <button on:pointerdown={() => setCurrentTool('fill')}><PaintBucket /></button>
  </li>
  <li class:active={$currentTool === 'adjust'}>
    <button on:pointerdown={() => setCurrentTool('adjust')}><Crop /></button>
  </li>
  <li class:active={$currentTool === 'pipette'}>
    <button on:pointerdown={() => setCurrentTool('pipette')}><Pipette /></button>
  </li>
  <li class:active={$currentTool === 'smudge'}>
    <button on:pointerdown={() => setCurrentTool('smudge')}><Pointer /></button>
  </li>
  <li class:active={$currentTool === 'picker'}>
    <button
      style:width="2rem"
      on:pointerdown={() =>
        $currentTool === 'picker' ? restorePreviousTool() : setCurrentTool('picker')}
    >
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

  li {
    color: hsl(0, 0%, 70%);
  }

  li.active {
    color: hsl(0, 0%, 0%);
  }
</style>
