<script lang="ts">
  import Icon from './Icon.svelte'
  import type { StateStore } from '$lib/stores'

  export let stateStore: StateStore

  export let size = '2rem'
</script>

<button
  on:click={() => ($stateStore.isUsingEraser = !$stateStore.isUsingEraser)}
  style:width={size}
  style:height={size}
  title="Erase"
  class:isActive={!!$stateStore.isUsingEraser}
>
  <Icon kind="eraser" />
</button>

<style>
  button {
    cursor: crosshair;
    background: none;
    border: none;
    box-shadow: inset 0 0 0 1px #00000055;
    color: #c29494;
  }
  .isActive {
    color: #512323;
    background: #c29494;
  }
</style>
