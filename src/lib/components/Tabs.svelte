<script lang="ts">
  import { Brush, DownloadCloud, Image, Info, User2 } from 'lucide-svelte'

  export let activeTab = 'draw'

  function setActive(tab: string) {
    activeTab = tab
  }
</script>

<ul class="tabs">
  <li class:active={activeTab === 'draw'}>
    <button on:pointerdown={() => setActive('draw')}><Brush /></button>
  </li>
  <li class:active={activeTab === 'creations'}>
    <button on:pointerdown={() => setActive('creations')}><Image /></button>
  </li>
  <li class:active={activeTab === 'download'}>
    <button on:pointerdown={() => setActive('download')}><DownloadCloud /></button>
  </li>
  <li class:active={activeTab === 'info'}>
    <button on:pointerdown={() => setActive('info')}><Info /></button>
  </li>
  <li class:active={activeTab === 'user'}>
    <button on:pointerdown={() => setActive('user')}><User2 /></button>
  </li>
</ul>

<style>
  ul {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.6rem 0.75rem;
    border-radius: 10% 10% 0 0;
    color: hsl(0, 0%, 70%);
  }

  li.active button {
    background: white;
    color: hsl(0, 0%, 0%);
  }

  li:hover button {
    color: hsla(0, 0%, 0%, 0.721);
  }
</style>
