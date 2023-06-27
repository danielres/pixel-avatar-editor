<script lang="ts">
  import type { PageData } from './$types'

  import clickOutside from '$lib/actions/clickOutside'
  import Activable from '$lib/components/Activable.svelte'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import { DownloadCloud, Eye, Save } from 'lucide-svelte'

  export let data: PageData

  const pigggy = data.pigggy
  const { board } = pigggy
</script>

<h2>Current</h2>
<Activable let:active let:toggleActive>
  <div class="stack w-36 border border-black/50 ring">
    <button on:click|stopPropagation={toggleActive}>
      <Checkerboard>
        <BoardPreview board={$board} />
      </Checkerboard>
    </button>

    {#if active}
      <div class="bg-white border place-self-center divide-y" use:clickOutside={toggleActive}>
        <button class="flex w-full p-2 gap-2"><Eye />Preview</button>
        <button class="flex w-full p-2 gap-2"><DownloadCloud />PNG</button>
        <button class="flex w-full p-2 gap-2"><Save />Save</button>
      </div>
    {/if}
  </div>
</Activable>

<style>
</style>
