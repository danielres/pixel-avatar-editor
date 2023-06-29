import type { Board } from '$lib/usePigggy'
import type { ProviderType } from '@auth/core/providers'
import { blob, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type Role = 'ADMIN' | 'USER'

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  role: text('role').$type<Role>(),
})

export const accounts = sqliteTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<ProviderType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    nameDoesntMatter: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = sqliteTable('sessions', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    nameDoesntMatter: primaryKey(vt.identifier, vt.token),
  })
)

export const drawings = sqliteTable('drawings', {
  id: text('id').notNull().primaryKey(),
  data: blob('data', { mode: 'json' }).notNull().$type<Board>(),
  authorId: text('authorId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
})
