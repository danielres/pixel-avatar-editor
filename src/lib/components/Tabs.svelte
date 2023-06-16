<script lang="ts">
  import { Brush, DownloadCloud, Image, Info } from 'lucide-svelte'
</script>

<ul class="tabs">
  <li class="active"><button><Brush /></button></li>
  <li><button><Image /></button></li>
  <li><button><DownloadCloud /></button></li>
  <li><button><Info /></button></li>
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
