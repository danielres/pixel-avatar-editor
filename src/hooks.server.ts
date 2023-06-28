import type { Handle } from '@sveltejs/kit'

import { db } from '$db/db'
import { users } from '$db/schema'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { DrizzleAdapter } from '$lib/auth/adapter-drizzle'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'
import { sequence } from '@sveltejs/kit/hooks'
import { eq } from 'drizzle-orm'

const adapter = DrizzleAdapter(db)

const addAuthjs = SvelteKitAuth({
  adapter,
  //@ts-expect-error https://github.com/nextauthjs/next-auth/issues/6174
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
})

const addSessionToLocals: Handle = async ({ event, resolve }) => {
  const session = await event.locals.getSession()
  event.locals.session = session
  return resolve(event)
}

const addDbToLocals: Handle = ({ event, resolve }) => {
  event.locals.db = db
  return resolve(event)
}

const addUserToLocals: Handle = async ({ event, resolve }) => {
  const { session, db } = event.locals
  if (!session?.user?.email) return resolve(event)
  const user = db.select().from(users).where(eq(users.email, session.user.email)).get() ?? null
  event.locals.user = user
  return resolve(event)
}

export const handle = sequence(addAuthjs, addSessionToLocals, addDbToLocals, addUserToLocals)
