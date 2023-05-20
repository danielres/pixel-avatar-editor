<script lang="ts">
  import Selectors from './Selectors.svelte'

  let lums: number[]
  let hues: number[]
</script>

<Selectors bind:lums bind:hues />

<div>
  <pre>{hues}</pre>
  <pre>{lums}</pre>
</div>
