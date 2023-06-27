<script lang="ts">
  let active = false
  const toggleActive = () => (active = !active)
</script>

<slot {active} {toggleActive} />
