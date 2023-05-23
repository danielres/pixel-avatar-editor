<script lang="ts">
  import { onMount } from 'svelte'
  import DrawingBoard from './components/DrawingBoard.svelte'
  import Cell from './components/DrawingBoard/BoardCell.svelte'
  import Eraser from './components/Eraser.svelte'
  import Palette from './components/Palette.svelte'
  import Preview from './components/Preview.svelte'
  import Download from './components/Download.svelte'
  import presets from './presets'
  import makeStores from './stores'
  import { getBoardFromUrl, saveBoardToUrl } from './utils/board'
  import { downloadAsPng } from './utils/download'

  const debug = false
  const newBoardSize = 12
  const sat = 45

  const { boardStore, paletteStore, stateStore } = makeStores({
    board: { width: newBoardSize, height: newBoardSize },
    palette: { hues: 8, lums: 8, sat },
  })
  const { usedColors } = paletteStore

  function handleUrlUpdate() {
    const board = getBoardFromUrl()
    if (board) $boardStore = board
  }

  function handleDownload() {
    const node = document.getElementById('drawingboard')
    downloadAsPng(node)
  }

  onMount(handleUrlUpdate)
</script>

<svelte:window on:popstate={handleUrlUpdate} />

<main>
  <section>
    <DrawingBoard
      on:paint={() => saveBoardToUrl($boardStore)}
      cellSize="2rem"
      {boardStore}
      {paletteStore}
      {sat}
      {debug}
      {stateStore}
    />
  </section>

  <section class="tools">
    <Palette {paletteStore} swatchSize="2rem" {sat} {stateStore} />

    <div class="actions">
      <Eraser {stateStore} />
      <Download on:click={handleDownload} />
    </div>

    <div class="usedColors">
      {#each $usedColors.slice(0, 16) as cell}
        <Cell cellSize="2rem" {cell} {sat} {paletteStore} />
      {/each}
    </div>
  </section>

  <section class="previews">
    <div class="label">Previews</div>
    <Preview board={$boardStore} {paletteStore} cellSize="0.5rem" {sat} {debug} />
    <Preview board={$boardStore} {paletteStore} cellSize="0.25rem" {sat} {debug} />
    <Preview board={$boardStore} {paletteStore} cellSize="0.125rem" {sat} {debug} />
  </section>

  <section class="presets">
    <div class="label">Presets</div>
    {#each Object.entries(presets) as [k, v]}
      <button
        on:click={() => {
          $boardStore = v
          saveBoardToUrl($boardStore)
        }}
      >
        <Preview board={v} {paletteStore} cellSize="0.25rem" {sat} {debug} />
      </button>
    {/each}
  </section>
</main>

<div style:color="transparent">
  {JSON.stringify($boardStore)}
</div>

<style>
  main {
    display: flex;
    gap: 2rem;
    margin: 0 2rem;
  }

  section {
    height: fit-content;
  }

  section .label {
    position: absolute;
    top: -1rem;
    left: 0;
    color: #00000066;
    font-family: monospace;
  }

  section.tools {
    display: grid;
    gap: 1rem;
    height: fit-content;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .usedColors {
    display: flex;
    width: 16rem;
    flex-wrap: wrap;
  }

  section.previews {
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
    height: fit-content;
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
