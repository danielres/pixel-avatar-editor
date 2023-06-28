<script lang="ts">
  import { page } from '$app/stores'
  import { Brush, BookDown, Info, User2 } from 'lucide-svelte'

  $: pathname = $page.url.pathname
</script>

<ul class="tabs">
  <li class:active={pathname === '/'}>
    <a href="/"><Brush /></a>
  </li>
  <!-- <li class:active={pathname === '/creations'}>
    <a href="/creations"><Image /></a>
  </li> -->
  <li class:active={pathname === '/download'}>
    <a href="/download"><BookDown /></a>
  </li>
  <li class:active={pathname === '/info'}>
    <a href="/info"><Info /></a>
  </li>
  <li class:active={pathname === '/account'} class="account">
    <a href="/account"><User2 /></a>
  </li>
</ul>

<style>
  ul {
    display: flex;
    gap: 0.5rem;
  }

  a {
    padding: 0.6rem 0.75rem;
    border-radius: 10% 10% 0 0;
    color: hsl(0, 0%, 50%);
    display: block;
  }

  li.active a {
    background: white;
    color: hsl(0, 0%, 0%);
  }

  li:hover a {
    color: hsla(0, 0%, 0%, 0.721);
  }
</style>
