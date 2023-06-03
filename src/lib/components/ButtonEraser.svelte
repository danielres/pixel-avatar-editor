<script>
  import Icon from './Icon.svelte'
  import eraser from '$lib/assets/icons/eraser.png'

  /** @type {import('$lib/types').StateStore} */
  export let stateStore

  export let size = '3rem'
</script>

<button
  on:click={() => ($stateStore.isUsingEraser = !$stateStore.isUsingEraser)}
  style:width={size}
  style:height={size}
  title="Erase"
  class:isActive={!!$stateStore.isUsingEraser}
>
  <img src={eraser} alt="" />
</button>

<style>
  button {
    border: 1px solid transparent;
    color: #c29494;
    background: white;
    box-shadow: -2px 2px 3px 0 #00000033;
  }
  .isActive {
    color: #512323;
    background: #ffd0d044;
    border-color: #ff5b5baa;
  }
  img {
    rotate: 45deg;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    filter: drop-shadow(5px 5px 3px #00000011);
  }
</style>
