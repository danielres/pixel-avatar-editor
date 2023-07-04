<script lang="ts">
  import type { PageData } from './$types'

  import { paths } from '$constants'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import { ChevronLeft, ChevronRight } from 'lucide-svelte'

  export let featured: PageData['featured']
  export let index = 0

  const next = () => (index = (index + 1) % featured.length)
  const prev = () => (index = (index - 1 + featured.length) % featured.length)
  const author = featured[index].author
</script>

<div
  class="w-modal bg-surface-200-700-token py-12 border-4 border-black/50 shadow-lg rounded-md space-y-8"
>
  <div class="grid grid-cols-[auto_1fr_auto]">
    <button class="flex place-items-center" on:click={prev}>
      <div
        class="p-2 m-2 rounded-full text-black bg-transparent hover:bg-surface-600 aspect-square flex place-content-center transition-all"
      >
        <ChevronLeft />
      </div>
    </button>

    <div class="bg-black/5 shadow-md">
      <BoardPreview board={featured[index].data} />
    </div>

    <button class="flex place-items-center" on:click={next}>
      <div
        class="p-2 m-2 rounded-full text-black hover:bg-surface-600 aspect-square flex place-content-center"
      >
        <ChevronRight />
      </div>
    </button>
  </div>

  <div class="px-16 text-center">
    <span class="opacity-75">Author:</span>
      {author.name}
  </div>
</div>

<style>
</style>
