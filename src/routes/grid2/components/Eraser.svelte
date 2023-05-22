<script lang="ts">
  import type { StateStore } from '../stores'

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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

<style>
  button {
    cursor: pointer;
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
