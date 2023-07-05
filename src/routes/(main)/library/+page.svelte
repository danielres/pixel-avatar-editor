<script lang="ts">
  import type { PageData } from './$types'

  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation'
  import { paths } from '$constants'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import { Brush, DownloadCloud, Trash2, UserSquare2 } from 'lucide-svelte'

  export let data: PageData

  const pigggy = data.pigggy
  const { board } = pigggy

  let activeId = data.drawings[0]?.id
  $: active = data.drawings.find((d) => d.id === activeId)
</script>

<div class="space-y-8">
  <section class="space-y-4">
    <h2>Your drawings</h2>

    {#if data.user}
      <div class="flex gap-4">
        {#each data.drawings as drawing}
          <div class="grid w-24 border border-black/50" class:ring={activeId === drawing.id}>
            <button on:click={() => (activeId = drawing.id)}>
              <Checkerboard>
                <BoardPreview board={drawing.data} />
              </Checkerboard>
            </button>
          </div>
        {/each}
      </div>
    {:else}
      <div class="alert variant-ghost-warning whitespace-nowrap block">
        <span>Please</span>
        <a class="font-bold underline" href={paths.account()}>sign in</a>
        <span>to save and view your drawings.</span>
      </div>
    {/if}
  </section>

  {#if active}
    <section>
      <h2>Preview</h2>
      <div class="flex gap-4 shadow-md">
        <div class="grid w-full border border-black/50">
          <div class="grid grid-cols-4 gap-4 p-4">
            <div class="col-span-2">
              <Checkerboard>
                <BoardPreview board={active.data} />
              </Checkerboard>
            </div>
            <div class="grid">
              <div>
                <Checkerboard>
                  <BoardPreview board={active.data} />
                </Checkerboard>
              </div>

              <ul>
                <li>
                  <button
                    on:click={() => {
                      if (!active) return
                      board.snapshot()
                      board.set(active.data)
                      goto(paths.draw())
                    }}
                    class="flex p-2 gap-2 w-full"
                  >
                    <Brush />Edit
                  </button>
                </li>
                <li>
                  <form
                    action="?/delete"
                    method="post"
                    use:enhance={({ formData }) => {
                      if (!active) return
                      formData.append('id', active.id)
                      return async ({ update }) => {
                        await update()
                        activeId = data.drawings[0].id
                      }
                    }}
                  >
                    <button type="submit" class="flex p-2 gap-2 w-full"><Trash2 />Delete</button>
                  </form>
                </li>
                <li>
                  <button class="flex p-2 gap-2 w-full whitespace-nowrap">
                    <DownloadCloud />Download PNG
                  </button>
                </li>
                <li>
                  <button class="flex p-2 gap-2 w-full whitespace-nowrap">
                    <UserSquare2 />Use as avatar
                  </button>
                </li>
              </ul>
            </div>
            <div class="w-1/2">
              <Checkerboard>
                <BoardPreview board={active.data} />
              </Checkerboard>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/if}
</div>
