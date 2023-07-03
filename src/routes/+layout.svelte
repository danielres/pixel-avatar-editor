<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-rocket.css'
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  import '../app.postcss'

  import { Modal } from '@skeletonlabs/skeleton'
</script>

<Modal background="bg-red-500" />
<slot />
