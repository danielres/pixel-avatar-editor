<script lang="ts">
  import { paths } from '$constants'
  import picture from '$lib/assets/pigggy.png'
</script>

<div class="grid place-items-center min-h-screen">
  <div class="grid place-items-center gap-8">
    <div class="w-48">
      <img class="logo" src={picture} alt="logo" />
    </div>

    <main class="text-center text-lg glow">
      <p>Pigggy is a cute little pixel art editor.</p>
      <br />
      <p>But don't be mistaken...</p>
      <p>
        <b>Pigggy is tiny but mighty!</b>
      </p>
    </main>

    <a class="variant-ghost-success p-4 rounded text-2xl text-success-300" href={paths.draw()}>
      Start drawing!
    </a>
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
