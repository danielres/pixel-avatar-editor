import { dev } from '$app/environment'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const ensureCanonicalUrlInProd: Handle = async ({ event, resolve }) => {
  if (dev) return await resolve(event)
  if (event.url.hostname === 'www.pigg.gy') return await resolve(event)

  throw redirect(303, `https://www.pigg.gy${event.url.pathname}${event.url.search}`)
}

export const handle = sequence(ensureCanonicalUrlInProd)
