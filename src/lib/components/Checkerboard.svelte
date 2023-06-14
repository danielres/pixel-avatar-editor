<script lang="ts">
  export let cols = 12
  export let rows = 12
  export let color = 'hsl(0, 0%, 97%)'
</script>

<div style:--cols={cols} style:--rows={rows} style:--color={color}>
  <slot />
</div>

<style lang="postcss">
  div {
    background: repeating-conic-gradient(transparent 0 90deg, var(--color) 0 180deg) 0 0 /
      calc(100% / var(--cols)) calc(100% / var(--rows)) round;
  }
</style>
