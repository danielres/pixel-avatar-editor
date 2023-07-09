<script lang="ts">
  import type { Board as TBoard } from '$lib/usePigggy'
  import type { PageData } from './$types'

  import Board from '$lib/components/Board.svelte'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import usePigggy from '$lib/usePigggy'
  import { capitalizeFirstLetter } from '$lib/utils/string'
  import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton'
  import { Check } from 'lucide-svelte'
  import { fade } from 'svelte/transition'
  import { superForm } from 'sveltekit-superforms/client'
  import { setUsernameSchema } from './schemas'

  export let data: PageData

  const pigggy = usePigggy(12, 12)
  const { board } = pigggy

  let confirmedUsername = ''
  let confirmedAvatar: TBoard

  let step = 1

  const { form, enhance, errors } = superForm(data.form, {
    validators: setUsernameSchema,
    onResult: ({ result }) => {
      if (result.type === 'success') {
        const validUsername = result.data?.form.data.username
        confirmedUsername = validUsername
        step = 2
      }
    },
  })

  $: $form.username = capitalizeFirstLetter($form.username).trimStart().replace(/\s+/g, ' ')

  const avatarValidMinPixels = $board.values.length / 3
  $: paintedPixelsCount = $board.values.filter((c) => c !== 'none').length
  $: isAvatarValid = paintedPixelsCount >= avatarValidMinPixels
  $: percentage = Math.round((paintedPixelsCount / avatarValidMinPixels) * 100)
</script>

<div class="space-y-8">
  <section>
    <h1 class="text-2xl">
      Welcome
      {#if confirmedUsername}<span in:fade>{confirmedUsername}!</span>{:else}stranger...{/if}
    </h1>
  </section>

  <Accordion autocollapse>
    <AccordionItem
      on:toggle={({ detail }) => detail.open && (step = 1)}
      open={step === 1}
      class="border border-black/20 bg-black/10"
    >
      <svelte:fragment slot="lead">
        <span class="lead-content" class:lead-content-done={step > 1}>
          {#if step > 1}<Check />{:else}1{/if}
        </span>
      </svelte:fragment>
      <svelte:fragment slot="summary">What should be your username?</svelte:fragment>
      <svelte:fragment slot="content">
        <form
          class="grid items-center gap-2 max-w-xs mx-auto"
          method="POST"
          action="?/checkUsername"
          autocomplete="off"
          use:enhance
        >
          <div class="info">
            <p>This will be visible to other users</p>
            <p>It cannot be changed later, so choose wisely!</p>
          </div>

          <label class="label">
            <input
              autocomplete="off"
              class="input text-center"
              type="text"
              name="username"
              placeholder="Username"
              bind:value={$form.username}
            />
          </label>
          {#if $errors.username}
            <ul class="bg-error-500/40 px-4 py-2 text-error-100 text-sm">
              {#each $errors.username as e}
                <li class="">{e}</li>
              {/each}
            </ul>
          {/if}
          <button
            disabled={Boolean($errors.username)}
            class="btn variant-outline-surface"
            type="submit"
          >
            Sounds good!
          </button>
        </form>
      </svelte:fragment>
    </AccordionItem>

    {#if confirmedUsername}
      <div in:fade>
        <AccordionItem
          open={step === 2}
          class="border border-black/20  bg-black/10"
          on:toggle={({ detail }) => detail.open && (step = 2)}
        >
          <svelte:fragment slot="lead">
            <span class="lead-content" class:lead-content-done={step > 2}>
              {#if step > 2}<Check />{:else}2{/if}
            </span>
          </svelte:fragment>
          <svelte:fragment slot="summary">How should you look like?</svelte:fragment>
          <svelte:fragment slot="content">
            <div class="info">
              <p>This is how you will appear to other users.</p>
              <p>It can be changed later, so don't worry too much.</p>
            </div>
            <div class="grid grid-cols-[1fr_2fr_1fr] gap-4">
              <div class="ml-auto">
                <Tools {pigggy} />
              </div>

              <div class="aspect-square">
                <div class="border border-black/20">
                  <Checkerboard rows={$board.values.length / $board.cols} cols={$board.cols}>
                    <Board {pigggy} />
                  </Checkerboard>
                </div>
              </div>

              <div>
                <div class="card">
                  <Picker {pigggy} hues={8} lums={8} lumPad={30} />
                </div>
              </div>
              <div class="col-start-2 max-w-xs mx-auto space-y-2">
                <ProgressBar
                  value={percentage}
                  meter="opacity-50 {percentage < 25
                    ? 'bg-error-500'
                    : percentage < 50
                    ? 'bg-warning-500'
                    : percentage < 100
                    ? 'bg-primary-500'
                    : 'bg-success-500'}"
                />

                <button
                  on:click={() => {
                    confirmedAvatar = $board
                    step = 3
                  }}
                  class="btn variant-outline-surface"
                  type="button"
                  disabled={!isAvatarValid}
                >
                  {#if isAvatarValid}Use as profile picture{:else}Please keep drawing!{/if}
                </button>
              </div>
            </div>
          </svelte:fragment>
        </AccordionItem>
      </div>
    {/if}

    <div class:hidden={!confirmedUsername || !confirmedAvatar}>
      <AccordionItem
        open={step === 3}
        class="border border-black/20  bg-black/10"
        on:toggle={({ detail }) => detail.open && (step = 3)}
      >
        <svelte:fragment slot="lead">
          <span class="lead-content" class:lead-content-done={step > 3}>
            {#if step > 3}<Check />{:else}3{/if}
          </span>
        </svelte:fragment>
        <svelte:fragment slot="summary">
          {#if step === 3}
            How do you like it?
          {:else}
            Review and submit
          {/if}
        </svelte:fragment>
        <svelte:fragment slot="content">
          <form action="?/update" method="post" use:enhance class="grid justify-center gap-1">
            <div class="w-16 border-2 border-surface-400 rounded-md mx-auto">
              <BoardPreview board={$board} />
            </div>
            <div class="text-surface-300 mx-auto text-sm">{confirmedUsername}</div>

            <input type="hidden" name="avatar" value={JSON.stringify($board)} />
            <input type="hidden" name="username" value={confirmedUsername} />

            <div class="info my-4">
              <p>Your profile picture can be changed in the future,</p>
              <p>but your username is definitive.</p>
            </div>

            <button class="btn variant-outline-surface mt-4" type="submit">I love it!</button>

            <div>
              <button
                class="btn opacity-50 hover:opacity-100"
                type="button"
                on:click={() => (step = 1)}
              >
                I want another username
              </button>
              <button
                class="btn opacity-50 hover:opacity-100"
                type="button"
                on:click={() => (step = 2)}
              >
                I want to polish my picture
              </button>
            </div>
          </form>
        </svelte:fragment>
      </AccordionItem>
    </div>
  </Accordion>
</div>

<style lang="postcss">
  .lead-content {
    @apply badge-icon bg-primary-500 text-primary-900 font-bold;
  }
  .lead-content-done {
    @apply bg-success-500 text-success-900;
  }
  .info {
    @apply text-surface-400 max-w-md text-sm text-center mx-auto;
  }
</style>
