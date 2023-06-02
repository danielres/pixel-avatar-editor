import { dev } from '$app/environment'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const ensureCanonicalUrlInProd: Handle = async ({ event, resolve }) => {
  if (dev) return await resolve(event)

  const { hostname } = event.url
  if (hostname !== 'www.pigg.gy') throw redirect(303, `https://www.pigg.gy${event.url.pathname}`)
  return await resolve(event)
}

export const handle = sequence(ensureCanonicalUrlInProd)
