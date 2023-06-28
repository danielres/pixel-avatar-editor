import type { Actions } from './$types'

import { drawings } from '$db/schema'
import { uuid } from '$lib/utils/uuid'

export const actions: Actions = {
  async save({ request, locals: { user, db } }) {
    const jsonBoard = (await request.formData()).get('board') as string
    const data = JSON.parse(jsonBoard)

    db.insert(drawings)
      .values({ data, authorId: user.id, id: uuid(), createdAt: new Date() })
      .returning()
      .get()
  },
}
