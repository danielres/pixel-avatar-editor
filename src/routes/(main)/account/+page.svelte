<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client'
  import { page } from '$app/stores'
</script>

{#if $page.data.session?.user}
  <div>
    <h2>Signed in as</h2>
    {$page.data.session?.user?.name} -
    {$page.data.session?.user?.email}
  </div>

  <button on:click={signOut}>Sign out</button>

  {#if $page.data.session?.user?.image}
    <img width="200" src={$page.data.session.user.image} alt="User avatar" />
  {/if}
{:else}
  <div>You are not signed in</div>
  <button on:click={() => signIn('github')}>Sign In with GitHub</button>
{/if}
