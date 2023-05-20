<script lang="ts">
  import type { Writable } from 'svelte/store'
  import { AvatarEditor } from './AvatarEditor'
  import palette1 from './palette1'
  import { onMount } from 'svelte'

  let canvas: HTMLCanvasElement

  let editor: AvatarEditor
  let pixelArtStore: Writable<any>

  onMount(() => {
    editor = new AvatarEditor(canvas)
    pixelArtStore = editor.getPixelArtStore()
  })
</script>

<canvas bind:this={canvas} width="160" height="160" />

{#if pixelArtStore}
  <pre>
    {JSON.stringify($pixelArtStore)}
   </pre>
{/if}

<div id="color-palette">
  {#each palette1 as color}
    <div>
      {#each color as hue}
        <button class="color-btn" style="background-color: {hue};" />
      {/each}
    </div>
  {/each}
</div>

<div id="layers">
  <button class="layer-btn">Layer 1</button>
  <!-- Additional layers will be added here -->
</div>
<button id="new-layer-btn">New Layer</button>

<style>
  canvas {
    border: 1px solid black;
  }

  .color-btn {
    width: 20px;
    height: 20px;
    border: none;
    margin-right: 5px;
  }

  .layer-btn {
    width: 50px;
    height: 20px;
    border: none;
    margin-top: 5px;
  }
</style>
