<script lang="ts">
  import ButtonDownload from '$lib/components/ButtonDownload.svelte'
  import ButtonEraser from '$lib/components/ButtonEraser.svelte'
  import DrawingBoard from '$lib/components/DrawingBoard.svelte'
  import Palette from '$lib/components/Palette.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import makeStores from '$lib/stores'
  import { getBoardFromUrl, saveBoardToUrl } from '$lib/utils/board'
  import { downloadAsPng } from '$lib/utils/download'
  import { onMount } from 'svelte'
  import presets from './presets'

  const newBoardSize = 12

  const stores = makeStores({
    board: { width: newBoardSize, height: newBoardSize },
    palette: { hues: 8, lums: 8, sat: 45 },
  })

  const { boardStore, stateStore } = stores

  // const { usedColors } = paletteStore

  function handleUrlUpdate() {
    const board = getBoardFromUrl()
    if (board) $boardStore = board
  }

  function handleDownload() {
    downloadAsPng(document.getElementById('drawingboard'))
  }

  onMount(handleUrlUpdate)
</script>

<svelte:window on:popstate={handleUrlUpdate} on:mouseup={() => saveBoardToUrl($boardStore)} />

<main>
  <!-- mobile -->
  <section class="sm:hidden">
    <DrawingBoard {stores} cellSize="calc((100vw - 40px) / {$boardStore[0].length})" />
  </section>

  <!-- desktop -->
  <section class="hidden sm:block">
    <DrawingBoard {stores} cellSize="2rem" />
  </section>

  <section class="tools">
    <Palette {stores} swatchSize="2rem" />

    <div class="flex justify-between">
      <ButtonEraser {stateStore} />

      <!-- <ButtonUndo
        on:click={() => {
          window.history.back()
          window.history.back()
        }}
      /> -->
    </div>

    <!-- <div class="usedColors" style:display="none">
      {#each $usedColors.slice(0, 16) as cell}
        <Cell cellSize="2rem" {cell} {sat} {paletteStore} />
      {/each}
    </div> -->
  </section>

  <div class="previews">
    <section>
      <div class="label">Previews</div>
      <Preview board={$boardStore} {stores} cellSize="0.5rem" />
      <Preview board={$boardStore} {stores} cellSize="0.25rem" />
      <Preview board={$boardStore} {stores} cellSize="0.125rem" />
      <div class="actions">
        <ButtonDownload on:click={handleDownload} />
      </div>
    </section>
  </div>

  <section class="presets">
    <div class="label">Presets</div>
    {#each Object.entries(presets) as [k, v]}
      <button
        on:click={() => {
          $boardStore = v
          saveBoardToUrl($boardStore)
        }}
      >
        <Preview board={v} {stores} cellSize="0.25rem" />
      </button>
    {/each}
  </section>
</main>

<!-- <div style:color="transparent">
  {JSON.stringify($boardStore)}
</div> -->

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  section {
    height: fit-content;
  }

  section .label {
    position: absolute;
    top: -1rem;
    left: 0;
    color: #00000066;
  }

  section.tools {
    display: grid;
    gap: 1rem;
    height: fit-content;
  }

  .usedColors {
    display: flex;
    width: 16rem;
    flex-wrap: wrap;
  }

  .previews {
    display: grid;
    gap: 1rem;
    height: fit-content;
    position: relative;
  }

  .previews .actions {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .previews section {
    display: flex;
    flex-direction: column;
    background: #00000006;
    border: 1px solid #00000022;
    width: 8rem;
    height: 16rem;
    position: relative;
    justify-content: space-evenly;
    align-items: center;
  }

  section.presets {
    position: relative;
    display: flex;
    width: 12rem;
    height: 16rem;
    border: 1px solid #00000022;
    background: #00000006;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  section.presets button {
    border: none;
    background: none;
    cursor: pointer;
    opacity: 0.5;
  }

  section.presets button:hover {
    opacity: 1;
  }
</style>
