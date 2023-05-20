import { describe, it, expect } from 'vitest'
import { decode, encode, type Board } from './board'

describe('encode/decode', () => {
  it('encodes/decodes a board', () => {
    const board: Board = [
      [[1, 2], [], [], []],
      [[], [0, 0], [], []],
      [[], [0, 0], [0, 0], []],
      [[], [], [], [0, 0]],
    ]

    const encoded = encode(board, 4)
    const decoded = decode(encoded)

    expect(decoded).toEqual(board)
  })
})
