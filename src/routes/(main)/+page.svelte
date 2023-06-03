<script lang="ts">
  import { fade } from 'svelte/transition'
  import { dev } from '$app/environment'
  import ButtonEraser from '$lib/components/ButtonEraser.svelte'
  import DrawingBoard from '$lib/components/DrawingBoard.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import Palette from '$lib/components/Palette.svelte'
  import Preview from '$lib/components/Preview.svelte'
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

  let currentLibraryIndex = 0
</script>

<svelte:window on:popstate={handleUrlUpdate} />
<main>
  <section
    class="board p-1 bg-white"
    on:mouseup={() => {
      undos++
      redos = 0
      saveBoardToUrl($boardStore)
    }}
  >
    <DrawingBoard {stores} />
  </section>

  <section class="tools">
    <div class=" p-1 bg-white shadow-md">
      <Palette {stores} swatchSize="1.5rem" />
    </div>

    <div class="flex justify-between">
      <ButtonEraser {stateStore} />

      <div class="flex">
        <button
          on:click={() => {
            undos--
            redos++
            window.history.back()
          }}
          class="w-[3rem] h-[3rem] aspect-square p-[0.75rem] hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={!undos}
          title="Undo"
        >
          <Icon kind="arrow-turn-left" />
          <!-- <img src={arrow_back} alt="" /> -->
        </button>

        <button
          on:click={() => {
            if (!redos) return
            undos++
            redos--
            window.history.forward()
          }}
          disabled={!redos}
          class="w-[3rem] h-[3rem] aspect-square p-[0.75rem] hover:bg-gray-100 text-gray-600 -scale-x-100 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo"
        >
          <Icon kind="arrow-turn-left" />
          <!-- <img src={arrow_back} alt="" /> -->
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
      <h2 class="label w-full text-center">Preview <span class="opacity-75">&</span> Download</h2>

      <div class="grid grid-cols-3 gap-2 border shadow-md p-4 w-48 bg-white">
        <div class="col-span-3 w-40">
          <Preview {stores} />
        </div>
        <div class="col-span-2 w-26">
          <Preview {stores} />
        </div>

        <div class="col-span-1 grid gap-1 w-13">
          <Preview {stores} />
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
  <section class="examples" on:click={() => undos++}>
    <h2 class="label flex justify-center w-full">
      <div class="flex items-center justify-between gap-2">
        <button
          class="text-black w-3 opacity-50 hover:opacity-100"
          on:click={() => {
            if (currentLibraryIndex > 0) return currentLibraryIndex--
            currentLibraryIndex = Object.keys(examples).length - 1
          }}
        >
          <Icon kind="arrow-left" />
        </button>

        <div class="min-w-[5rem] text-center">{Object.keys(examples)[currentLibraryIndex]}</div>

        <button
          class="text-black w-3 rotate-180 opacity-50 hover:opacity-100"
          on:click={() => {
            if (currentLibraryIndex === Object.keys(examples).length - 1)
              return (currentLibraryIndex = 0)
            currentLibraryIndex++
          }}
        >
          <Icon kind="arrow-left" />
        </button>
      </div>
    </h2>

    <div class="examples-previews grid grid-cols-3 gap-2 border shadow-md p-4 bg-white">
      {#each Object.values(examples) as entries, i}
        {#if i === currentLibraryIndex}
          {#each Object.values(entries) as example, j}
            <button
              in:fade={{ delay: j * 35 }}
              class="w-12"
              on:click={() => {
                $boardStore = example
                saveBoardToUrl($boardStore)
              }}
            >
              <Preview board={example} {stores} />
            </button>
          {/each}
        {/if}
      {/each}
    </div>
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
    touch-action: none;
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

    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: left;
  }

  section.examples {
    position: relative;
  }

  section.examples .examples-previews button {
    background: none;
    cursor: pointer;
    opacity: 0.7;
  }

  section.examples .examples-previews button:hover {
    opacity: 1;
  }
</style>
