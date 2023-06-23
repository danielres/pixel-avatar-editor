import type { LayoutLoad } from './$types'
import usePigggy from '$lib/usePigggy'

const pigggy = usePigggy(12, 12)

export const load = (async () => {
  return { pigggy }
}) satisfies LayoutLoad
