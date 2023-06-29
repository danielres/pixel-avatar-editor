import type { Db } from '$db/db'
import type { Adapter, AdapterAccount } from '@auth/core/adapters'

import { uuid } from '$lib/utils/uuid'
import { and, eq } from 'drizzle-orm'
import { accounts, sessions, users, verificationTokens } from '../../db/schema'

export function DrizzleAdapter(db: Db): Adapter {
  const usersCount = db.select({ id: users.id }).from(users).all().length

  return {
    createUser: (data) => {
      return db
        .insert(users)
        .values({ ...data, id: uuid(), role: usersCount === 0 ? 'ADMIN' : 'USER' })
        .returning()
        .get()
    },

    getUser: (data) => {
      return db.select().from(users).where(eq(users.id, data)).get() ?? null
    },

    getUserByEmail: (data) => {
      return db.select().from(users).where(eq(users.email, data)).get() ?? null
    },

    createSession: (data) => {
      return db.insert(sessions).values(data).returning().get()
    },

    getSessionAndUser: (data) => {
      return (
        db
          .select({
            session: sessions,
            user: users,
          })
          .from(sessions)
          .where(eq(sessions.sessionToken, data))
          .innerJoin(users, eq(users.id, sessions.userId))
          .get() ?? null
      )
    },

    updateUser: (data) => {
      if (!data.id) throw new Error('updateUser: No id provided')
      return db.update(users).set(data).where(eq(users.id, data.id)).returning().get()
    },

    updateSession: (data) => {
      return db
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .get()
    },

    linkAccount: (rawAccount) => {
      const updatedAccount = db.insert(accounts).values(rawAccount).returning().get()

      const account = {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined,
      }

      return account as unknown as AdapterAccount
    },

    getUserByAccount: (account) => {
      return (
        db
          .select({
            id: users.id,
            email: users.email,
            emailVerified: users.emailVerified,
            image: users.image,
            name: users.name,
          })
          .from(users)
          .innerJoin(
            accounts,
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider)
            )
          )
          .get() ?? null
      )
    },

    deleteSession: (sessionToken) => {
      return (
        db.delete(sessions).where(eq(sessions.sessionToken, sessionToken)).returning().get() ?? null
      )
    },

    createVerificationToken: (token) => {
      return db.insert(verificationTokens).values(token).returning().get()
    },

    useVerificationToken: (token) => {
      try {
        return (
          db
            .delete(verificationTokens)
            .where(
              and(
                eq(verificationTokens.identifier, token.identifier),
                eq(verificationTokens.token, token.token)
              )
            )
            .returning()
            .get() ?? null
        )
      } catch (err) {
        throw new Error('No verification token found.')
      }
    },

    deleteUser: (id) => {
      return db.delete(users).where(eq(users.id, id)).returning().get()
    },

    unlinkAccount: (account) => {
      db.delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .run()

      return undefined
    },
  }
}
