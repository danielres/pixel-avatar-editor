<script lang="ts">
  import { paths } from '$constants'
  import picture from '$lib/assets/pigggy.png'
  import BoardPreview from '$lib/components/BoardPreview.svelte'

  export let data
</script>

<div class="grid place-items-center min-h-screen">
  <div class="grid justify-items-center gap-4">
    <div class="w-48">
      <img class="logo" src={picture} alt="logo" />
    </div>

    <main class="text-center text-lg glow">
      <p>
        Pigggy is a cute lil pixel art editor, <br />
        but don't be mistaken...
      </p>
      <p class="my-4">
        <b>Pigggy is tiny but mighty!</b>
      </p>
    </main>

    <a class="variant-ghost-success p-4 rounded text-2xl text-success-300" href={paths.draw()}>
      Start drawing!
    </a>

    <hr class="w-full my-8" />

    <section class="space-y-4 text-center">
      <h2 class="text-2xl opacity-75">User creations</h2>
      <ul class="flex gap-4 justify-center">
        {#each data.featured as drawing}
          <li class="">
            <button
              class="w-24 border border-surface-400-500-token hover:border-surface-600-300-token p-0.5"
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
