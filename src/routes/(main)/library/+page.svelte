<script lang="ts">
  import type { PageData } from './$types'

  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import { Brush, DownloadCloud, Trash2 } from 'lucide-svelte'

  export let data: PageData

  const pigggy = data.pigggy

  let activeId = data.drawings[data.drawings.length - 1].id
  $: active = data.drawings.find((d) => d.id === activeId)
</script>

<div class="space-y-8">
  <div class="flex gap-4">
    {#each [...data.drawings].reverse() as drawing}
      <div class="grid w-24 border border-black/50" class:ring={activeId === drawing.id}>
        <button on:click={() => (activeId = drawing.id)}>
          <Checkerboard>
            <BoardPreview board={drawing.data} />
          </Checkerboard>
        </button>
      </div>
    {/each}
  </div>

  {#if active}
    <div class="flex gap-4">
      <div class="grid w-full border border-black/50">
        <Checkerboard>
          <BoardPreview board={active.data} />
        </Checkerboard>
      </div>

      <div>
        <ul>
          <li><button class="flex p-2 gap-2 w-full"><Brush />Edit</button></li>
          <li><button class="flex p-2 gap-2 w-full"><Trash2 />Delete</button></li>
          <li>
            <button class="flex p-2 gap-2 w-full whitespace-nowrap">
              <DownloadCloud />Download PNG
            </button>
          </li>
        </ul>
      </div>
    </div>
  {/if}
</div>
