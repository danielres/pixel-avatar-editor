<script lang="ts">
  import type { Pigggy } from '$lib/usePigggy'

  import { enhance } from '$app/forms'
  import {
    BookUp,
    Brush,
    Crop,
    Eraser,
    Grid,
    ImagePlus,
    PaintBucket,
    Pipette,
    Pointer,
    Redo2,
    Undo2,
  } from 'lucide-svelte'
  import Checkerboard from './Checkerboard.svelte'
  import CurrentColor from './CurrentColor.svelte'

  export let pigggy: Pigggy
  const { setCurrentTool, currentTool, restorePreviousTool, board, toggleCurrentTool } = pigggy
  const { undo, redo, undos, redos } = board
</script>

<ul class="tools">
  <li>
    <ul class="group">
      <li>
        <button on:pointerdown={board.reset}><ImagePlus /></button>
      </li>
      <li>
        <form
          action="?/save"
          method="post"
          use:enhance={({ formData }) => formData.append('board', JSON.stringify($board))}
          class="contents"
        >
          <button type="submit" title="Save current drawing"><BookUp /></button>
        </form>
      </li>
      <li class:active={$currentTool === 'adjust'}>
        <button on:pointerdown={() => toggleCurrentTool('adjust')}><Crop /></button>
      </li>
      <li>
        <button><Grid /></button>
      </li>
    </ul>
  </li>

  <li>
    <ul class="group">
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
            <CurrentColor {pigggy} />
          </Checkerboard>
        </button>
      </li>
    </ul>
  </li>
</ul>

<style lang="postcss">
  ul.tools {
    @apply grid gap-4;

    li {
      display: flex;
    }
  }

  ul.group {
    @apply grid bg-surface-800 rounded p-2 gap-2;
    @apply grid-cols-2;
  }

  li {
    @apply text-surface-400;
    &.active {
      @apply text-surface-100;
    }
  }
</style>
