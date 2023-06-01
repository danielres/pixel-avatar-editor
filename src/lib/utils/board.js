import {
  compressToEncodedURIComponent as lzcompress,
  decompressFromEncodedURIComponent as lzdecompress,
} from 'lz-string'

/**
 * @param {import('$lib/types').Board} board
 * @return {string}
 */
export function encode(board) {
  const stringified = JSON.stringify(board)
  const minified = stringified.replaceAll('null', 'x')
  return lzcompress(minified)
}

/**
 * @param {string} encoded
 * @return {import('$lib/types').Board}
 */
export function decode(encoded) {
  const decompressed = lzdecompress(encoded)
  const unminified = decompressed.replaceAll('x', 'null')
  /** @type {import('$lib/types').Board} */
  const board = JSON.parse(unminified)
  return board
}

/**
 * @param {import('$lib/types').Board} board
 */
export function saveBoardToUrl(board) {
  const encoded = encode(board)
  window.history.pushState(null, '', `?b=${encoded}`)
}

/**
 * @return {undefined | import('$lib/types').Board}
 */
export function getBoardFromUrl() {
  const encoded = new URLSearchParams(window.location.search).get('b')
  if (!encoded) return
  return decode(encoded)
}
