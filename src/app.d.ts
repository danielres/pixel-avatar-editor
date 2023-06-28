/// <reference types="@sveltejs/kit" />
/// <reference types="@auth/sveltekit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  interface Locals {
    db: import('./db/db').Db
    session: import('@auth/sveltekit').Session
    user: import('./db/schema').User
  }
  // interface PageData {}
  // interface Platform {}
}
