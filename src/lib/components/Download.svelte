<script lang="ts">
  import Icon from './Icon.svelte'

  export let size = '2rem'
</script>

<button on:click style:width={size} style:height={size} style:padding="4px" title="Download as PNG">
  <Icon kind="save" />
</button>

<style>
  button {
    cursor: pointer;
    color: #333;
    background: none;
    border: none;
    /* box-shadow: inset 0 0 0 1px #00000055; */
  }

  button:hover {
    background: #00000011;
  }
</style>
