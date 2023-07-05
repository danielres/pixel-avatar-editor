import type { Actions, PageServerLoad } from './$types'

import * as s from '$db/schema'
import { eq } from 'drizzle-orm'

export const load = (async ({ locals: { db, user } }) => {
  const drawings = user
    ? db.query.drawings.findMany({
        where: (d) => eq(d.authorId, user.id),
        orderBy: (d, { desc }) => [desc(d.createdAt)],
      })
    : []

  return {
    drawings,
    user,
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  async delete({ locals, request }) {
    const formData = await request.formData()
    const drawingId = formData.get('id') as string
    locals.db.delete(s.drawings).where(eq(s.drawings.id, drawingId)).run()
  },
}
