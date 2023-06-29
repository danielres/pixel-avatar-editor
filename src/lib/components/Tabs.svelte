<script lang="ts">
  import { page } from '$app/stores'
  import { Brush, Book, Info, User2 } from 'lucide-svelte'

  $: pathname = $page.url.pathname
</script>

<ul class="tabs">
  <li class:active={pathname === '/'}>
    <a href="/"><Brush /></a>
  </li>
  <!-- <li class:active={pathname === '/creations'}>
    <a href="/creations"><Image /></a>
  </li> -->
  <li class:active={pathname === '/library'}>
    <a href="/library"><Book /></a>
  </li>
  <li class:active={pathname === '/info'}>
    <a href="/info"><Info /></a>
  </li>
  <li class:active={pathname === '/account'} class="account">
    <a href="/account"><User2 /></a>
  </li>
</ul>

<style lang="postcss">
  ul {
    display: flex;
    gap: 0.5rem;
  }

  a {
    @apply text-surface-500;
    padding: 0.6rem 0.75rem;
    border-radius: 10% 10% 0 0;
    display: block;
  }

  li.active a {
    @apply bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-surface-300;
  }

  li:hover:not(.active) a {
    @apply text-surface-100;
  }
</style>
