<script lang="ts">
  import makeStores from '$lib/stores'

  const { board, isPainting, paint, setTool, setCurrentColor, adjust, tool } = makeStores(12, 12)
</script>

<svelte:window on:pointerup={() => ($isPainting = false)} />

<ul class="tools">
  <li><button on:pointerdown={setTool('brush')}>Brush</button></li>
  <li><button on:pointerdown={setTool('eraser')}>Eraser</button></li>
  <li><button on:pointerdown={setTool('fill')}>Fill</button></li>
  <li><button on:pointerdown={setTool('adjust')}>Adjust</button></li>
</ul>

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
      <div class="adjust stack">
        <div class="adjust-left adjust-x">
          <button on:click={adjust.addColumnBefore}>+</button>
          <button on:click={adjust.moveLeft}>M</button>
          <button on:click={adjust.removeColumnBefore}>-</button>
        </div>
        <div class="adjust-right adjust-x">
          <button on:click={adjust.addColumnAfter}>+</button>
          <button on:click={adjust.moveRight}>M</button>
          <button on:click={adjust.removeColumnAfter}>-</button>
        </div>
        <div class="adjust-top adjust-y">
          <button on:click={adjust.addRowBefore}>+</button>
          <button on:click={adjust.moveUp}>M</button>
          <button on:click={adjust.removeRowBefore}>-</button>
        </div>
        <div class="adjust-bottom adjust-y">
          <button on:click={adjust.addRowAfter}>+</button>
          <button on:click={adjust.moveDown}>M</button>
          <button on:click={adjust.removeRowAfter}>-</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(button) {
    border: none;
    display: block;
    cursor: pointer;
  }

  .stack {
    display: grid;
  }

  .stack > * {
    grid-column: 1;
    grid-row: 1;
  }

  .stack > * + * {
    pointer-events: none;
  }

  .stack > * + * > * {
    pointer-events: auto;
  }

  .checkerboard {
    margin: 1rem;
  }

  .adjust-x {
    display: flex;
    flex-direction: column;
    width: fit-content;
    gap: 1rem;
  }
  .adjust-y {
    display: flex;
    height: fit-content;
    gap: 1rem;
  }

  .adjust-left {
    align-self: center;
  }

  .adjust-right {
    align-self: center;
    justify-self: end;
  }

  .adjust-top {
    justify-self: center;
  }

  .adjust-bottom {
    justify-self: center;
    align-self: end;
  }

  .adjust button {
    aspect-ratio: 1;
    width: 1rem;
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

  .tools {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  .checkerboard {
    --color: hsl(0, 0%, 97%);
    background: repeating-conic-gradient(transparent 0 90deg, var(--color) 0 180deg) 0 0 /
      calc(100% / var(--cols)) calc(100% / var(--rows)) round;
  }
</style>
