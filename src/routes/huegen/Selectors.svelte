<script lang="ts">
  import Selector from './Selector.svelte'

  export let hues = [0]
  export let lums = [20, 40, 60, 80, 90, 95]

  const MAX_HUES = 5
</script>

<div class="shell">
  {#each hues as hue, i}
    <div class="row">
      <Selector bind:hue bind:lums />
      {#if i > 0}<button on:click={() => (hues = hues.filter((_, j) => j !== i))}>-</button>{/if}
    </div>
  {/each}

  {#if hues.length < MAX_HUES}
    <button on:click={() => (hues = [...hues, (hues.reverse()[0] + 180 + 30) % 360])}>+</button>
  {/if}
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
</style>
