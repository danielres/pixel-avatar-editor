<script lang="ts">
  import type { PageData } from './$types'

  import { enhance } from '$app/forms'
  import Board from '$lib/components/Board.svelte'
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import Checkerboard from '$lib/components/Checkerboard.svelte'
  import Picker from '$lib/components/Picker.svelte'
  import Tools from '$lib/components/Tools.svelte'
  import usePigggy from '$lib/usePigggy'
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'

  export let data: PageData

  const pigggy = usePigggy(12, 12)
  const { board } = pigggy

  let username = data.user.username
  let chosenUsername = ''

  let step = 1
</script>

<div class="space-y-8">
  <section>
    <h1 class="text-2xl">Welcome stranger!</h1>
    <p>Just a few last things...</p>
  </section>

  <Accordion autocollapse class="">
    <AccordionItem
      on:toggle={({ detail }) => detail.open && (step = 1)}
      open={step === 1}
      class="border border-black/20 bg-black/10"
    >
      <svelte:fragment slot="lead">
        <span class="badge-icon variant-filled-primary">1</span>
      </svelte:fragment>
      <svelte:fragment slot="summary">What should be your username?</svelte:fragment>
      <svelte:fragment slot="content">
        <form
          class="grid items-center gap-2 max-w-md mx-auto"
          on:submit={() => {
            step = 2
            chosenUsername = username
          }}
        >
          <label class="label">
            <input
              autocomplete="off"
              id="username"
              class="input"
              type="text"
              name="username"
              placeholder="Username"
              bind:value={username}
            />
          </label>

          <button class="btn variant-outline-surface" type="submit">Sounds good!</button>
        </form>
      </svelte:fragment>
    </AccordionItem>

    {#if chosenUsername}
      <AccordionItem
        open={step === 2}
        class="border border-black/20  bg-black/10"
        on:toggle={({ detail }) => detail.open && (step = 2)}
      >
        <svelte:fragment slot="lead">
          <span class="badge-icon variant-filled-primary">2</span>
        </svelte:fragment>
        <svelte:fragment slot="summary">Let's make you a nice profile picture!</svelte:fragment>
        <svelte:fragment slot="content">
          <div class="grid grid-cols-[4rem_2fr_1fr] gap-4">
            <div class="">
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
          </div>
          <div class="grid items-center gap-2 max-w-md mx-auto">
            <button on:click={() => (step = 3)} class="btn variant-outline-surface" type="button">
              Looks good!
            </button>
          </div>
        </svelte:fragment>
      </AccordionItem>
    {/if}

    {#if chosenUsername}
      <AccordionItem
        open={step === 3}
        class="border border-black/20  bg-black/10"
        on:toggle={({ detail }) => detail.open && (step = 3)}
      >
        <svelte:fragment slot="lead">
          <span class="badge-icon variant-filled-primary">3</span>
        </svelte:fragment>
        <svelte:fragment slot="summary">Review and submit</svelte:fragment>
        <svelte:fragment slot="content">
          <div>Username: {username}</div>
          <div class="w-32 border">
            <BoardPreview board={$board} />
          </div>
          <form
            action="?/update"
            method="post"
            class="p-6"
            use:enhance={({ formData }) => {
              formData.append('avatar', JSON.stringify($board))
              formData.append('username', chosenUsername)
              return ({ result }) => {
                console.log(result)
              }
            }}
          >
            <button class="btn variant-filled-surface" type="submit">Submit</button>
          </form>
        </svelte:fragment>
      </AccordionItem>
    {/if}
  </Accordion>
</div>
