<script lang="ts">
  import Adjust from '$lib/components/Adjust.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import makeStores from '$lib/stores'

  const stores = makeStores(12, 12)
  const { board, isPainting, paint, setCurrentColor, tool } = stores
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<Tools {stores} />

<ul class="colorPicker">
  <li><button on:pointerdown={setCurrentColor('red')}>Red</button></li>
  <li><button on:pointerdown={setCurrentColor('blue')}>Blue</button></li>
  <li><button on:pointerdown={setCurrentColor('green')}>Green</button></li>
</ul>

<div class="wrapper">
  <div class="stack">
    <div
      class="checkerboard"
      style:--cols={$board.cols}
      style:--rows={$board.values.length / $board.cols}
    >
      <div class="board" style:grid-template-columns="repeat({$board.cols}, 1fr)">
        {#each $board.values as value, i}
          <button
            style:background={value}
            on:pointerdown={() => {
              paint(i)
              $isPainting = true
            }}
            on:pointerover={$isPainting ? () => paint(i) : null}
          />
        {/each}
      </div>
    </div>

    {#if $tool === 'adjust'}
      <Adjust {stores} />
    {/if}
  </div>
</div>

<style>
  .checkerboard {
    margin: 1rem;
  }

  .wrapper {
    max-width: 25%;
  }

  .board {
    display: grid;
    border: 1px solid black;
  }

  .board button {
    aspect-ratio: 1;
  }

  .checkerboard {
    --color: hsl(0, 0%, 97%);
    background: repeating-conic-gradient(transparent 0 90deg, var(--color) 0 180deg) 0 0 /
      calc(100% / var(--cols)) calc(100% / var(--rows)) round;
  }
</style>
