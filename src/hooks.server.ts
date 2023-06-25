import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import { DrizzleAdapter } from '$lib/auth/adapter-drizzle'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'
import { db } from './db/db'

export const handle = SvelteKitAuth({
  adapter: DrizzleAdapter(db),
  //@ts-expect-error https://github.com/nextauthjs/next-auth/issues/6174
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
})
