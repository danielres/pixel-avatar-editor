<script lang="ts">
  import type { Stores } from '$lib/stores'

  import {
    Brush,
    Crop,
    Eraser,
    FilePlus,
    PaintBucket,
    Pipette,
    Pointer,
    Redo2,
    Undo2,
  } from 'lucide-svelte'
  import Checkerboard from './Checkerboard.svelte'
  import CurrentColor from './CurrentColor.svelte'

  export let stores: Stores
  const { setCurrentTool, currentTool, restorePreviousTool, board } = stores
  const { undo, redo, undos, redos } = board
</script>

<ul class="tools">
  <li>
    <ul class="group">
      <li>
        <button on:pointerdown={() => board.reset()}><FilePlus /></button>
      </li>
      <li class:active={$currentTool === 'adjust'}>
        <button on:pointerdown={() => setCurrentTool('adjust')}><Crop /></button>
      </li>
      <li>
        <button on:pointerdown={undo} disabled={!$undos}><Undo2 /></button>
      </li>
      <li>
        <button on:pointerdown={redo} disabled={!$redos}><Redo2 /></button>
      </li>
    </ul>
  </li>

  <li>
    <ul class="group">
      <li class:active={$currentTool === 'brush'}>
        <button on:pointerdown={() => setCurrentTool('brush')}><Brush /></button>
      </li>
      <li class:active={$currentTool === 'fill'}>
        <button on:pointerdown={() => setCurrentTool('fill')}><PaintBucket /></button>
      </li>
      <li class:active={$currentTool === 'eraser'}>
        <button on:pointerdown={() => setCurrentTool('eraser')}><Eraser /></button>
      </li>
      <li class:active={$currentTool === 'pipette'}>
        <button on:pointerdown={() => setCurrentTool('pipette')}><Pipette /></button>
      </li>
      <li class:active={$currentTool === 'smudge'}>
        <button on:pointerdown={() => setCurrentTool('smudge')}><Pointer /></button>
      </li>
      <li class:active={$currentTool === 'picker'}>
        <button
          style:width="100%"
          on:pointerdown={() =>
            $currentTool === 'picker' ? restorePreviousTool() : setCurrentTool('picker')}
        >
          <Checkerboard rows={1} cols={1}>
            <CurrentColor {stores} />
          </Checkerboard>
        </button>
      </li>
    </ul>
  </li>
</ul>

<style>
  ul.tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  ul.tools li {
    width: 100%;
    text-align: center;
    display: flex;
  }

  ul.group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: white;
    place-items: center;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px 1px rgba(0, 0, 0, 0.1);
    gap: 0.5rem;
    padding: 0.5rem;
  }

  li {
    color: hsl(0, 0%, 70%);
  }

  li.active {
    color: hsl(0, 0%, 0%);
  }
</style>
