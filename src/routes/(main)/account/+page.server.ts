import { eq } from 'drizzle-orm'
import type { PageServerLoad } from './$types'

export const load = (async ({ parent, locals }) => {
  const { user } = await parent()
  console.log('user', user)

  const accounts = user
    ? locals.db.query.accounts.findMany({
        where: (a) => eq(a.userId, user.id),
        columns: { provider: true, type: true, scope: true },
      })
    : []

  return { accounts }
}) satisfies PageServerLoad
