<script lang="ts">
  import Adjust from '$lib/components/Adjust.svelte'
  import Board from '$lib/components/Board.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Ratio from '$lib/components/Ratio.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import makeStores from '$lib/stores'
  import { Info, Image, DownloadCloud, Brush } from 'lucide-svelte'
  const stores = makeStores(12, 12)
  const { board, currentTool, restorePreviousTool } = stores
</script>

<div class="shell">
  <h1>
    <img class="logo" src="https://www.pigg.gy/piggy.png" alt="logo" />
  </h1>

  <header>
    <img class="logo-name" src="https://www.pigg.gy/logo_02.png" alt="site name" />
    <ul class="tabs">
      <li class="active"><button><Brush /></button></li>
      <li><button><Image /></button></li>
      <li><button><DownloadCloud /></button></li>
      <li><button><Info /></button></li>
    </ul>
  </header>

  <aside>
    <Tools {stores} />
  </aside>

  <Ratio ratiow={$board.cols} ratioh={$board.values.length / $board.cols}>
    <div class="stack">
      <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
        <Board {stores} />
      </Checkerboard>

      {#if $currentTool === 'adjust'}
        <Adjust {stores} />
      {/if}

      <div class="stack" style:display={$currentTool === 'picker' ? 'grid' : 'none'}>
        <button on:pointerdown={restorePreviousTool} title="close" />
        <div class="card" style:width="75%" style:place-self="center">
          <Picker {stores} />
        </div>
      </div>
    </div>
  </Ratio>
</div>

<style>
  .shell {
    height: calc(100svh);
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    padding-inline: 1rem;
    padding-bottom: 1rem;
  }

  h1 {
    display: flex;
    align-items: end;
    justify-items: center;
    /* border: 1px solid red; */
  }

  .logo {
    width: 4rem;
    margin-inline: auto;
    position: relative;
    top: 0.5rem;
    filter: drop-shadow(0 0 10px #fffbfe);
  }

  header {
    display: flex;
  }

  .logo-name {
    height: 1.25rem;
    align-self: end;
    filter: drop-shadow(0 0 10px #fff4fd);
    position: relative;
    left: -1.25rem;
    display: none;
  }

  header ul.tabs {
    margin-left: 2rem;
    display: flex;
    align-self: end;
    gap: 1rem;
    position: relative;
    top: calc(1rem + 2px);
  }

  header ul.tabs button {
    padding: 0.6rem 0.75rem;
    border-radius: 10% 10% 0 0;
    color: hsl(0, 0%, 70%);
  }

  header ul.tabs li.active button {
    background: white;
    color: hsl(0, 0%, 0%);
  }
</style>
