<script lang="ts">
  import { page } from '$app/stores'
  import { paths } from '$constants'
  import { signIn, signOut } from '@auth/sveltekit/client'
</script>

{#if $page.data.user}
  {#if $page.data.user.role === 'ADMIN'}
    <a href={paths.admin()} class="float-right alert variant-ghost-error">ADMIN</a>
  {/if}

  <div>
    <h2>Signed in as</h2>
    {$page.data.user.name} -
    {$page.data.user.email}
  </div>

  <button on:click={signOut}>Sign out</button>

  <img width="200" src={$page.data.user.image} alt="User avatar" />
{:else}
  <div>You are not signed in</div>
  <button on:click={() => signIn('github')}>Sign In with GitHub</button>
{/if}
