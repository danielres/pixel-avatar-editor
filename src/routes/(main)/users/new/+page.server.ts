import type { Actions, PageServerLoad } from './$types'

import { paths } from '$constants'
import * as s from '$db/schema'
import { uuid } from '$lib/utils/uuid'
import { error, redirect } from '@sveltejs/kit'
import md5 from 'blueimp-md5'
import { eq } from 'drizzle-orm'

export const load = (async ({ locals }) => {
  if (locals.user?.avatarId && locals.user?.username) {
    throw redirect(303, paths.account())
  }
  return {}
}) satisfies PageServerLoad

export const actions: Actions = {
  async update({ request, locals }) {
    const userId = locals.user?.id
    if (!userId) throw error(401, 'Unauthorized')

    const formData = await request.formData()
    const username = formData.get('username') as string
    const jsonAvatar = formData.get('avatar') as string
    const data = JSON.parse(jsonAvatar)
    const hash = md5(jsonAvatar)
    const id = uuid()
    const authorId = userId
    const createdAt = new Date()

    const dbAvatar = locals.db
      .insert(s.drawings)
      .values({ id, data, hash, authorId, createdAt })
      .returning()
      .get()

    const dbUser = locals.db
      .update(s.users)
      .set({ username, avatarId: dbAvatar.id })
      .where(eq(s.users.id, userId))
      .run()

    console.log(dbUser)
    console.log(dbAvatar)
  },
}
