<script lang="ts">
  import BoardPreview from '$lib/components/BoardPreview.svelte'
  import { page } from '$app/stores'
  import { paths } from '$constants'
  import { signIn, signOut } from '@auth/sveltekit/client'

  $: user = $page.data.user
</script>

<div class="space-y-4">
  {#if user}
    {#if user.role === 'ADMIN'}
      <div class="flex justify-end mb-4 gap-4 [&>*]:opacity-75 [&>*]:hover:opacity-75">
        <a href={paths.admin()} class="btn variant-ghost-error text-error-200">ADMIN</a>
        <button class="btn variant-ghost-primary" on:click={signOut}>Sign out</button>
      </div>
    {/if}

    <section>
      <h2 class="flex gap-3 justify-between">
        <div class="font-bold">Profile</div>
        <small title="Visible to all users and visitors" class="badge variant-filled-surface">
          Public
        </small>
      </h2>

      <div class="grid grid-cols-[auto_1fr] gap-4">
        <div>
          {#if user.avatar}
            <div class="w-16 border border-surface-900 rounded overflow-hidden">
              <BoardPreview board={user.avatar.data} />
            </div>
          {/if}
        </div>
        <div>
          <dl class="grid grid-cols-[auto_1fr] gap-x-4 text-sm">
            <dt>Username:</dt>
            <dd>{user.username}</dd>
          </dl>
        </div>
      </div>
    </section>

    <section>
      <h2 class="flex gap-3 justify-between">
        <div class="font-bold">Authentication</div>
        <small title="Never displayed to other users" class="badge variant-filled-surface">
          Confidential
        </small>
      </h2>

      <div class="grid grid-cols-[auto_1fr] gap-4">
        <div>
          <img class="w-16 border border-surface-800 rounded" src={user.image} alt="User avatar" />
        </div>
        <div>
          <dl class="grid grid-cols-[auto_1fr] gap-x-4 text-sm">
            <dt>Name:</dt>
            <dd>{user.name}</dd>
            <dt>Email:</dt>
            <dd>{user.email}</dd>
            <dt>
              {#if $page.data.accounts.length === 1}Provider:{:else}Providers:{/if}
            </dt>

            <dd>
              <ul class="list-disc list-inside" class:list-disc={$page.data.accounts.length > 1}>
                {#each $page.data.accounts as account}
                  <li>
                    {account.provider}
                    <code title="Scope" class="text-xs opacity-60">({account.scope})</code>
                  </li>
                {/each}
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  {:else}
    <div>You are not signed in</div>
    <button on:click={() => signIn('github')}>Sign In with GitHub</button>
  {/if}
</div>

<style lang="postcss">
  section {
    @apply rounded-md variant-ghost-surface p-4 text-surface-200 space-y-2;
  }
  .badge {
    @apply rounded cursor-help;
  }
  dt {
    @apply font-bold;
  }
</style>
