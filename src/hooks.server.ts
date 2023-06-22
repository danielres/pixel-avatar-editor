import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import GitHub from '@auth/core/providers/github'
import { SvelteKitAuth } from '@auth/sveltekit'

export const handle = SvelteKitAuth({
  //@ts-expect-error https://github.com/nextauthjs/next-auth/issues/6174
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
})
