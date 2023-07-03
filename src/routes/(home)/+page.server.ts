import type { PageServerLoad } from './$types'

import { drawings } from '$db/schema'
import { desc } from 'drizzle-orm'

export const load = (async ({ locals: { db } }) => {
  const featured = db.query.drawings.findMany({
    with: { author: { columns: { name: true, id: true } } },
    orderBy: [desc(drawings.createdAt)],
  })

  return {
    featured,
  }
}) satisfies PageServerLoad
