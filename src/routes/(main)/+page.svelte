<script lang="ts">
  import { dev } from '$app/environment'
  import ButtonEraser from '$lib/components/ButtonEraser.svelte'
  import DrawingBoard from '$lib/components/DrawingBoard.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import Palette from '$lib/components/Palette.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import PreviewAsSvg from '$lib/components/PreviewAsSvg.svelte'
  import makeStores from '$lib/stores'
  import { getBoardFromUrl, saveBoardToUrl } from '$lib/utils/board'
  import { downloadAsPng, downloadAsSvg } from '$lib/utils/download'
  import { onMount } from 'svelte'
  import examples from './examples'

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
    downloadAsSvg(stores)
  }

  onMount(() => {
    handleUrlUpdate()
  })

  let undos = 0
  let redos = 0
</script>

<svelte:window on:popstate={handleUrlUpdate} />
<main>
  <section
    class="board"
    on:mouseup={() => {
      undos++
      redos = 0
      saveBoardToUrl($boardStore)
    }}
  >
    <DrawingBoard {stores} />
  </section>

  <section class="tools">
    <Palette {stores} swatchSize="1.5rem" />

    <div class="flex justify-between">
      <ButtonEraser {stateStore} />

      <div class="flex">
        <button
          on:click={() => {
            undos--
            redos++
            window.history.back()
          }}
          class="w-[2rem] aspect-square p-[5px] hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!undos}
          title="Undo"
        >
          <Icon kind="arrow-turn-left" />
        </button>

        <button
          on:click={() => {
            if (!redos) return
            undos++
            redos--
            window.history.forward()
          }}
          disabled={!redos}
          class="w-[2rem] aspect-square p-[5px] hover:bg-gray-100 text-gray-600 -scale-x-100 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Icon kind="arrow-turn-left" />
        </button>
      </div>
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

      <div class="grid grid-cols-3 gap-1">
        <div class="col-span-3">
          <PreviewAsSvg {stores} class="w-full shadow-inner bg-gray-50 border border-gray-300" />
        </div>
        <div class="col-span-2">
          <PreviewAsSvg {stores} class="w-full shadow-inner bg-gray-50 border border-gray-300" />
        </div>

        <div class="col-span-1 grid gap-1">
          <PreviewAsSvg {stores} class="w-full shadow-inner bg-gray-50 border border-gray-300" />

          <button
            on:click={handleDownload}
            class="p-3 hover:bg-gray-100 text-gray-600"
            title="Download as PNG + SVG"
          >
            <Icon kind="save" />
          </button>
        </div>
      </div>
    </section>
  </div>

  <!-- <div class="previews">
    <section>
      <div class="label">Previews</div>
      <div style:--cell-size="0.5rem">
        <Preview board={$boardStore} {stores} />
      </div>
      <div style:--cell-size="0.25rem">
        <Preview board={$boardStore} {stores} />
      </div>
      <div style:--cell-size="0.125rem">
        <Preview board={$boardStore} {stores} />
      </div>
      <div class="actions">
        <ButtonDownload on:click={handleDownload} />
      </div>
    </section>
  </div> -->

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <section class="examples" style:--cell-size="0.25rem" on:click={() => undos++}>
    <div class="label">Examples</div>
    {#each Object.entries(examples) as [k, v]}
      <button
        on:click={() => {
          $boardStore = v
          saveBoardToUrl($boardStore)
        }}
      >
        <Preview board={v} {stores} />
      </button>
    {/each}
  </section>
</main>

{#if dev}
  <div style:color="transparent">
    {JSON.stringify($boardStore)}
  </div>
{/if}

<style lang="postcss">
  .board {
    --cell-size: calc((100vw - 40px) / 12);
    @screen sm {
      --cell-size: 2rem;
    }
  }

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
    top: -1.25rem;
    left: 0;
    color: #00000088;
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

  .previews section {
    display: flex;
    position: relative;
    width: 10rem;

    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: left;
  }

  section.examples {
    display: flex;
    position: relative;
    width: 9.5rem;
    flex-wrap: wrap;
    gap: 0.25rem;
    justify-content: left;
  }

  section.examples button {
    background: none;
    cursor: pointer;
    opacity: 0.7;
  }

  section.examples button:hover {
    opacity: 1;
  }
</style>
