<script lang="ts">
  import { page } from '$app/stores'
  import { paths } from '$constants'
  import { Brush, Book, Info, User2 } from 'lucide-svelte'

  $: pathname = $page.url.pathname
</script>

<ul class="tabs">
  <li class:active={pathname === '/'}>
    <a href={paths.draw()}><Brush /></a>
  </li>
  <li class:active={pathname === '/library'}>
    <a href={paths.library()}><Book /></a>
  </li>
  <li class:active={pathname === '/info'}>
    <a href={paths.info()}><Info /></a>
  </li>
  <li class:active={pathname === '/account'} class="account">
    <a href={paths.account()}><User2 /></a>
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
