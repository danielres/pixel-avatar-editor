import type { PageServerLoad } from './$types'

export const load = (async ({ locals: { db } }) => {
  const featured = db.query.drawings.findMany({
    with: { author: { columns: { name: true, id: true } } },
    orderBy: (drawings, { desc }) => [desc(drawings.createdAt)],
  })

  return {
    featured,
  }
}) satisfies PageServerLoad
