import type { PageServerLoad } from './$types'

import { drawings } from '$db/schema'
import { desc } from 'drizzle-orm'

export const load = (async ({ locals: { db } }) => {
  const featured = db.select().from(drawings).orderBy(desc(drawings.createdAt)).limit(10).all()
  console.log('featured', featured)

  return {
    featured,
  }
}) satisfies PageServerLoad
