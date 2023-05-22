<script lang="ts">
  import DrawingBoard from './components/DrawingBoard.svelte'
  import Eraser from './components/Eraser.svelte'
  import Palette from './components/Palette.svelte'
  import Preview from './components/Preview.svelte'
  import presets from './presets'
  import makeStores from './stores'

  const debug = false
  const sat = 45

  const { boardStore, paletteStore, stateStore } = makeStores({
    board: { width: 12, height: 12 },
    palette: { hues: 8, lums: 8, sat },
  })
</script>

<div class="main">
  <DrawingBoard {boardStore} {paletteStore} cellSize="2rem" {sat} {debug} {stateStore} />

  <div class="tools">
    <Palette {paletteStore} swatchSize="2rem" {sat} {stateStore} />
    <Eraser {stateStore} />
  </div>

  <div class="previews">
    <Preview board={$boardStore} {paletteStore} cellSize="0.5rem" {sat} {debug} />
    <Preview board={$boardStore} {paletteStore} cellSize="0.25rem" {sat} {debug} />
  </div>

  <div class="presets">
    {#each Object.entries(presets) as [k, v]}
      <button on:click={() => ($boardStore = v)}>
        <Preview board={v} {paletteStore} cellSize="0.25rem" {sat} {debug} />
      </button>
    {/each}
  </div>
</div>

<div style:color="transparent">
  {JSON.stringify($boardStore)}
</div>

<style>
  .main {
    display: flex;
    gap: 2rem;
    margin: 0 2rem;
  }

  .tools {
    display: grid;
    gap: 1rem;
    height: fit-content;
  }

  .previews {
    display: flex;
    flex-direction: column;
    border: 1px solid #00000022;
    width: 8rem;
    height: 16rem;
    position: relative;
    justify-content: space-evenly;
    align-items: center;
  }

  .previews::before {
    content: 'Preview';
    position: absolute;
    top: -1rem;
    left: 0;
    color: #00000066;
    font-family: monospace;
  }

  .presets {
    position: relative;
    display: flex;
    height: fit-content;
    width: 12rem;
    height: 16rem;
    border: 1px solid #00000022;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .presets::before {
    content: 'Presets';
    position: absolute;
    top: -1rem;
    left: 0;
    color: #00000066;
    font-family: monospace;
  }

  .presets button {
    border: none;
    background: none;
    cursor: pointer;
    opacity: 0.5;
  }

  .presets button:hover {
    opacity: 1;
  }
</style>
