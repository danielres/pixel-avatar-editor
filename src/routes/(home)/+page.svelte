<script lang="ts">
  import type { ModalComponent } from '@skeletonlabs/skeleton'

  import { paths } from '$constants'
  import picture from '$lib/assets/pigggy.png'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import { modalStore } from '@skeletonlabs/skeleton'
  import PreviewModal from './PreviewModal.svelte'

  export let data

  const modalComponent: ModalComponent = { ref: PreviewModal }
</script>

<div class="dark grid place-items-center min-h-screen bg-surface-800 text-surface-100">
  <div class="grid justify-items-center gap-4">
    <div class="w-48">
      <img class="logo" src={picture} alt="logo" />
    </div>

    <main class="text-center text-lg glow">
      <p>Pigggy is a cute lil' pixel art editor.</p>
      <p class="my-4">
        But don't be fooled...
        <br />
        <b>Pigggy is tiny but mighty!</b>
      </p>
    </main>

    <a class="variant-ghost-success p-4 rounded text-2xl text-success-300" href={paths.draw()}>
      Start drawing!
    </a>

    <hr class="w-96 my-8" />

    <section class="space-y-4 text-center px-8">
      <h2 class="text-2xl opacity-75">User creations</h2>
      <ul class="flex flex-wrap gap-4 justify-center max-w-xl">
        {#each data.featured as drawing, i}
          <li
            class="w-24 flex aspect-square border overflow-hidden border-surface-300-600-token hover:border-surface-600-300-token dark:bg-black/10 bg-surface-200/50"
          >
            <button
              class="w-full"
              on:click={() =>
                modalStore.trigger({
                  type: 'component',
                  component: {
                    ...modalComponent,
                    props: { featured: data.featured, index: i },
                  },
                })}
            >
              <BoardPreview board={drawing.data} />
            </button>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</div>

<style lang="postcss">
  img {
    filter: drop-shadow(0 0 10px theme(colors.surface.500));
  }

  .glow {
    text-shadow: 0 0 10px theme(colors.surface.500);
  }
</style>
