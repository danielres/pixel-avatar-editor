<script lang="ts">
  import makeStores from '$lib/stores'

  const {
    board,
    isPainting,
    paint,
    setTool,
    setCurrentColor,
    addRowAfter,
    addRowBefore,
    removeRowBefore,
    removeRowAfter,
    addColumnBefore,
    addColumnAfter,
    removeColumnAfter,
    removeColumnBefore,
  } = makeStores(12, 12)
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
  <div class="stack checkerboard">
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
    <div class="board-adjust">
      <button on:click={() => addRowBefore()}>Add row before</button>
      <button on:click={() => removeRowBefore()}>Remove row before</button>
      <button on:click={() => addRowAfter()}>Add row after</button>
      <button on:click={() => removeRowAfter()}>Remove row after</button>
      <button on:click={() => addColumnBefore()}>Add column before</button>
      <button on:click={() => addColumnAfter()}>Add column after</button>
      <button on:click={() => removeColumnAfter()}>Remove column after</button>
      <button on:click={() => removeColumnBefore()}>Remove column before</button>
    </div>
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
    background: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }
</style>
