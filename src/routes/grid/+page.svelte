<script lang="ts">
  import { page } from '$app/stores'
  import Tools from './Tools.svelte'
  import domtoimage from 'dom-to-image'

  const debug = false
  const boardSize = 12
  const boardHeight = boardSize
  const boardWidth = boardSize
  const query = $page.url.searchParams.get('s')

  let hues = 8
  let lums = 8
  let sat = 40

  type Tuple = [number, number]

  let swatches: Tuple[][] = [[]]
  let selected: Tuple

  let board: (Tuple | [])[][] = query
    ? decode(query)
    : Array.from({ length: boardHeight }, (_, i) => {
        return Array.from({ length: boardWidth }, (_, j) => [])
      })

  let isDrawing = false

  function getHue(index: number) {
    const hue = Math.floor((360 / hues) * index)
    return hue
  }

  function getLum(index: number) {
    const lum = Math.floor((80 / (lums - 0.5)) * index + 20)
    return lum
  }

  function encode(b: any, columns: number) {
    return columns + '-' + b.flat(2).join('')
  }

  function decode(str: string) {
    const [columns, values] = str.split('-')
    const numbers = values.split('').map((s) => parseInt(s, 10))
    const tuples = grouper(numbers, 2)
    return grouper(tuples, parseInt(columns, 10))
  }

  async function generatePng() {
    const node = document.getElementById('board')
    const container = document.getElementById('generated')

    if (!node) return
    if (!container) return

    try {
      const dataUrl = await domtoimage.toPng(node)
      const img = new Image()
      img.src = dataUrl
      container.appendChild(img)
    } catch (error) {
      console.error('oops, something went wrong!', error)
    }
  }

  function grouper(lst: any[], size: number) {
    var result = [],
      i = 0,
      n = lst.length
    while (i < n) {
      result.push(lst.slice(i, i + size))
      i += size
    }
    return result
  }
</script>

<div>
  <a href="/grid?s={encode(board, boardSize)}">Link</a>
</div>

<div>
  <button on:click={generatePng}>Generate PNG</button>
</div>

{selected}

<div class="shell">
  {#if swatches?.[0]?.[0]?.[0] !== undefined}
    <div class="board-shell">
      <div
        class="board"
        id="board"
        on:mousedown={() => (isDrawing = true)}
        on:mouseup={() => (isDrawing = false)}
        on:mouseleave={() => (isDrawing = false)}
      >
        {#each board as row, r}
          <div class="row">
            {#each row as cell, c}
              <!-- svelte-ignore a11y-mouse-events-have-key-events -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="cell"
                on:mouseover={() => {
                  if (isDrawing) board[r][c] = selected
                }}
                on:click={() => (board[r][c] = selected)}
                style="--cellHue: {getHue(cell[0] ?? 0)}; --cellLum: {getLum(
                  cell[1] ?? 0
                )}%; opacity: {cell[0] === undefined ? 0 : 1}"
              >
                {#if debug}{cell}{/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <Tools bind:swatches bind:hues bind:lums bind:sat bind:selected />

  {#if swatches?.[0]?.[0]?.[0] !== undefined}
    <div class="prev1">
      {#each board as row, r}
        <div class="row">
          {#each row as cell, c}
            <div
              class="cell"
              style="--cellHue: {getHue(cell[0] ?? 0)}; --cellLum: {getLum(
                cell[1] ?? 0
              )}%; opacity: {cell[0] === undefined ? 0 : 1}"
            >
              {#if debug}{cell}{/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}

  <div class="previews">
    <div class="preview" style="--dim: 7.5rem" />
    <div class="preview" style="--dim: 5rem" />
    <div class="preview" style="--dim: 2.5rem" />
  </div>
</div>

<div id="generated" />

<style>
  .shell {
    display: flex;
    gap: 2rem;
  }
  .board-shell {
    height: fit-content;
    box-shadow: inset 0 0 0 1px #00000033;
    margin-left: 2rem;
    background: repeating-conic-gradient(#fafafa 0% 25%, transparent 0% 50%) 50% / 1.5rem 1.5rem;
  }

  .board {
    --cellSize: 1.5rem;
  }

  .prev1 {
    --cellSize: 1rem;
  }

  .board .row {
    display: flex;
  }
  .prev1 .row {
    display: flex;
  }

  .cell {
    width: var(--cellSize);
    height: var(--cellSize);
    font-size: x-small;
    color: #00000033;
    background: hsl(var(--cellHue), 50%, var(--cellLum));
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .previews {
    display: flex;
    gap: 0.5rem;
  }

  .preview {
    border-radius: 10%;
    width: var(--dim);
    height: var(--dim);
    background: no-repeat center center / 100% 100%;
    background-image: -moz-element(#board);
  }
</style>
