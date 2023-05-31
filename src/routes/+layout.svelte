<script lang="ts">
  // import type { LayoutData } from './$types'

  import '../app.postcss'

  // export let data: LayoutData
</script>

<div class="shell" data-sveltekit-reload>
  <header>
    <div class="container mx-auto px-4">
      <a href="/">
        <div class="circle">
          <img class="mascot" src="/piggy.png" alt="mascot" />
        </div>
        <img class="logo" src="/logo_02.png" alt="logo" />
      </a>
    </div>
  </header>

  <div class="container mx-auto px-4 pb-4">
    <slot />
  </div>
</div>

<style lang="postcss">
  :global(html) {
    overscroll-behavior: none;
  }

  :global(body) {
    overscroll-behavior-y: contain;
  }

  :global(*) {
    font-family: monospace;
    image-rendering: crisp-edges;
  }

  :global(body) {
    background: white;
  }

  .shell {
    display: grid;
    gap: 2rem;
  }

  header {
    /* background: rgb(240, 247, 233);
    background: rgb(186, 217, 155);
    background: rgb(214, 233, 196);
    background: rgb(214, 233, 196); */

    @apply h-[32px] sm:h-[62px];
    --stop: 0%;
    background: linear-gradient(180deg, rgb(218, 231, 205) var(--stop), rgb(202, 228, 176) 100%);
    padding-top: 5px;

    a {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      .circle {
        @apply ml-[-27px] max-sm:mr-[-20px];
        background: #ffffffaa;
        padding: 20px;
        border-radius: 100%;
        margin-top: -20px;

        box-shadow: 0 0 0 20px #ffffff55;
      }

      img.mascot {
        @apply w-[37px] sm:w-[75px] aspect-square;
        filter: drop-shadow(0 0 2px rgb(233, 196, 223));
      }

      img.logo {
        @apply w-[87px] sm:w-[175px] mt-[-21px] sm:mt-[-20px];
        filter: drop-shadow(0px 0px 8px #ffffffff);
      }
    }
  }
</style>
