import type { PageServerLoad } from './$types'

import * as s from '$db/schema'
import { eq } from 'drizzle-orm'

export const load = (async ({ locals: { db, user } }) => {
  return {
    drawings: db.select().from(s.drawings).where(eq(s.drawings.authorId, user.id)).all(),
  }
}) satisfies PageServerLoad
