<script lang="ts">
  import { ProgressBar } from '@skeletonlabs/skeleton'

  export let value: number
  export let min = 0
  export let max = 100
  export let step = 12.5
</script>

<div class="stack">
  <input type="range" bind:value class="opacity-0 h-0" {min} {max} {step} />
  <ProgressBar {value} max={100} />
</div>
