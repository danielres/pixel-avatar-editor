<script lang="ts">
  import type { PageData } from './$types'

  import { page } from '$app/stores'
  import Tabs from '$lib/components/Tabs.svelte'
  import Tools from '$lib/components/Tools.svelte'

  export let data: PageData

  const pigggy = data.pigggy
  $: pathname = $page.url.pathname
</script>

<div class="shell">
  <h1>
    <img class="logo" src="https://www.pigg.gy/piggy.png" alt="logo" />
  </h1>

  <header>
    <img class="logo-name" src="https://www.pigg.gy/logo_02.png" alt="site name" />
    <div class="tabs"><Tabs /></div>
  </header>

  {#if pathname === '/'}
    <aside>
      <Tools {pigggy} />
    </aside>
  {/if}

  {#if pathname === '/'}
    <main>
      <slot />
    </main>
  {:else}
    <main class="max-h-full overflow-auto" style:grid-column="-1/1">
      <slot />
    </main>
  {/if}
</div>

<style lang="postcss">
  .shell {
    height: calc(100svh);
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    padding-inline: 1rem;
    padding-bottom: 1rem;
    max-width: 64rem;
    margin-inline: auto;
  }

  h1 {
    display: flex;
    align-items: flex-end;
    justify-items: center;
  }

  .logo {
    width: 4rem;
    margin-inline: auto;
    position: relative;
    top: 0.5rem;
    filter: drop-shadow(0 0 10px theme(colors.surface.500));
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

  .tabs {
    margin-left: 2rem;
    align-self: end;
    position: relative;
    top: calc(1rem + 2px);
    flex-grow: 1;
  }

  main {
    @apply p-4 md:p-8 bg-surface-100 rounded;
    box-shadow: -2px 2px 5px 0 hsla(0, 0%, 0%, 0.121);
  }
</style>
