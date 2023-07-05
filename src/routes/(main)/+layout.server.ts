import type { LayoutServerLoad } from './$types'

import { redirect } from '@sveltejs/kit'
import { paths } from '$constants'

export const load = (async ({ parent, url }) => {
  const { user } = await parent()
  const isUserProfileComplete = user?.avatarId && user?.username

  if (user && !isUserProfileComplete && url.pathname !== paths.newUser()) {
    throw redirect(303, paths.newUser())
  }

  return {}
}) satisfies LayoutServerLoad
