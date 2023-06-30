<script lang="ts">
  import type { PageData } from './$types'

  import BoardPreview from '$lib/components/BoardPreview.svelte'

  export let data: PageData
</script>

<div class="space-y-4">
  <h2 class="alert variant-ghost-error">ADMIN</h2>

  <section>
    {#each data.users as { id, image, ...user }}
      <div class="variant-ghost-surface p-2 grid grid-cols-[auto_1fr] gap-2">
        <img src={image} alt="User portrait" class="w-24" />
        <div>
          {#each Object.entries(user) as [k, v]}
            <p>{k}: {v}</p>
          {/each}
        </div>

        <div class="flex gap-2 col-span-2">
          {#each data.drawings.filter((d) => d.authorId === id) as drawing}
            <div class="w-16 border border-surface-500">
              <BoardPreview board={drawing.data} />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </section>
</div>
