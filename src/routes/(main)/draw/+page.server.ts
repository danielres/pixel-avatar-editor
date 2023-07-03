import type { Actions } from './$types'

import { codes } from '$constants'
import { drawings } from '$db/schema'
import { uuid } from '$lib/utils/uuid'
import { fail } from '@sveltejs/kit'
import md5 from 'blueimp-md5'

export const actions: Actions = {
  async save({ request, locals: { user, db } }) {
    const jsonBoard = (await request.formData()).get('board') as string
    const data = JSON.parse(jsonBoard)
    const hash = md5(jsonBoard)
    const id = uuid()
    const authorId = user.id
    const createdAt = new Date()

    try {
      db.insert(drawings).values({ id, data, hash, authorId, createdAt }).returning().get()
    } catch (err) {
      if (
        err instanceof Error &&
        err.name === 'SqliteError' &&
        err.message.includes('UNIQUE constraint failed')
      ) {
        return fail(409, {
          message: 'Drawing already in your library',
          code: codes.UNIQUE_CONSTRAINT_VIOLATION,
        })
      } else {
        throw err
      }
    }
  },
}
