/**
 * @param {*} maybeString
 * @returns {asserts maybeString is string}
 */
export function assertString(maybeString) {
  if (typeof maybeString !== 'string') throw Error('not a string')
}
