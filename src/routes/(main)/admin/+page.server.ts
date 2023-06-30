import type { PageServerLoad } from './$types'

import { paths } from '$constants'
import * as s from '$db/schema'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals }) => {
  const user = locals.user
  const isAdmin = user?.role === 'ADMIN'
  if (!isAdmin) throw redirect(303, paths.draw())

  const users = locals.db.select().from(s.users).all()
  const drawings = locals.db.select().from(s.drawings).all()

  return { users, drawings }
}) satisfies PageServerLoad
