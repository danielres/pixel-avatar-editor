import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const sqlite = new Database('data/pigggy.sqlite')
export const db = drizzle(sqlite, { schema })

export type Db = typeof db
