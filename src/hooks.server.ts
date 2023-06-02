import { redirect } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (event.url.hostname === 'pigg.gy') throw redirect(303, 'https://www.pigg.gy')
  if (event.url.hostname === 'pigggy.fly.dev') throw redirect(303, 'https://www.pigg.gy')

  const response = await resolve(event)
  return response
}
