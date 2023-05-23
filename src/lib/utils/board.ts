import type { Board } from '$lib/stores'

import {
  compressToEncodedURIComponent as lzcompress,
  decompressFromEncodedURIComponent as lzdecompress,
} from 'lz-string'

export function encode(board: Board) {
  const stringified = JSON.stringify(board)
  const minified = stringified.replaceAll('null', 'x')
  return lzcompress(minified)
}

export function decode(encoded: string): Board {
  const decompressed = lzdecompress(encoded)
  const unminified = decompressed.replaceAll('x', 'null')
  const board = JSON.parse(unminified) as Board
  return board
}

export function saveBoardToUrl(board: Board) {
  const encoded = encode(board)
  window.history.pushState(null, '', `?b=${encoded}`)
}

export function getBoardFromUrl() {
  const encoded = new URLSearchParams(window.location.search).get('b')
  if (!encoded) return
  return decode(encoded)
}
