<script lang="ts">
  import { onlyUniqueTuples } from '$lib/utils/array'

  export let hues = 8
  export let lums = 8

  export const swatches = Array.from({ length: hues }, (_, i) =>
    Array.from({ length: lums }, (_, j) => [
      Math.floor((360 / hues) * i),
      Math.floor((80 / (lums - 0.5)) * j + 20),
    ])
  )

  export let sat = 50

  type Tuple = [number, number]
  export let selected: Tuple = [0, 0]

  let history: Tuple[] = []
</script>

<div class="shell" style="--sat: {sat}%">
  <section>
    <div>
      {#each swatches as row, i}
        <div class="row">
          {#each row as cell, j}
            <button
              class="swatch"
              style="--cellhue: {swatches[i][j][0]}; --celllum: {swatches[i][j][1]}%"
              class:active={selected[0] === i && selected[1] === j}
              on:click={() => {
                selected = [i, j]
                history = [selected, ...history].filter(onlyUniqueTuples)
              }}
            >
              {cell}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </section>

  <section>
    <div class="history">
      {#each history.slice(0, 8 * 2) as item}
        <button
          class="swatch"
          style="--cellhue: {swatches[item[0]][item[1]][0]}; --celllum: {swatches[item[0]][
            item[1]
          ][1]}%"
          on:click={() => (selected = item)}
          class:active={selected[0] === item[0] && selected[1] === item[1]}
        >
          {item}
        </button>
      {/each}
    </div>
  </section>
</div>

<style>
  :root {
    --size: 2rem;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  section h2 {
    font-size: medium;
    font-weight: normal;
  }
  .shell {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .row {
    display: flex;
  }
  .swatch {
    width: var(--size);
    height: var(--size);
    background: hsl(var(--cellhue) var(--sat) var(--celllum));
    color: transparent;
    font-size: x-small;
    border: none;
  }
  button.swatch {
    cursor: crosshair;
  }
  button.swatch.active {
    border: 2px solid #ffffff;
    position: relative;
    box-shadow: 0 0 5px 0 #00000066, 0 0 5px 0 #00000033 inset;
  }
  .history {
    --size: 2rem;
    display: flex flex-wrap;
    width: calc(var(--size) * 8);
  }
</style>
