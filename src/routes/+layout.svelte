<script lang="ts">
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  import '@skeletonlabs/skeleton/themes/theme-rocket.css'
  import '../app.postcss'

  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { Modal, storePopup } from '@skeletonlabs/skeleton'

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
</script>

<Modal background="bg-red-500" />

<slot />
