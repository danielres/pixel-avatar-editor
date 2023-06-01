import { describe, expect, it } from 'vitest'
import { decode, encode } from './board'
import type { Board } from '$lib/types'

describe('encode/decode', () => {
  it('encodes/decodes a board', () => {
    const board: Board = [
      [[0, 0], null, null],
      [null, [0, 0], null],
      [null, null, [0, 0]],
    ]

    const encoded = encode(board)
    const decoded = decode(encoded)

    expect(decoded).toEqual(board)
  })
})
