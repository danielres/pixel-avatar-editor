/**
 * Utilities to return errors instead of throwing them.
 * Source: https://dev.to/qpwo/goodbye-trycatch-hello-error-return-5hcp
 */

const ERR = Symbol('ERR')
type Err = {
  [ERR]: true
  error: unknown
  type?: ErrTypes
}

/** Optional addition if you want to handle errors differently based on their type */
type ErrTypes = 'internet' | 'fileSystem' | 'badInput'

export function isErr(x: unknown): x is Err {
  return typeof x === 'object' && x != null && ERR in x
}

export function Err(message: string, type?: string) {
  return { [ERR]: true, error: message, type: type }
}

/** Make an error-throwing function into a error-returning function */
export async function tryFail<T>(f: (() => Promise<T>) | (() => T)): Promise<T | Err> {
  try {
    return await f()
  } catch (e) {
    return { [ERR]: true, error: e }
  }
}

/** If you need to convert your error values back into throw/catch land */
export function assertOk<T>(x: T | Err) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (isErr(x)) throw Error(x.error)
}