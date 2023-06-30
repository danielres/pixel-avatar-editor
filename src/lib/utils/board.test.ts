import type { Board } from '$lib/usePigggy'

import { describe, it, expect } from 'vitest'
import * as boardUtils from './board'

describe('Board utils', () => {
  describe('encode(board) + decode(encodedBoard)', () => {
    it('encodes and decodes a board into a compressed, url-safe string', () => {
      // prettier-ignore
      const board: Board = { cols: 12, values: [ 'none', 'none', 'none', 'none', 'none', 'none', 'hsla(45, 50%, 56.25%, 1)', 'none', 'none', 'none', 'none', 'none', 'hsla(45, 50%, 56.25%, 1)', 'none', 'hsla(45, 50%, 56.25%, 1)', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'hsla(45, 50%, 56.25%, 1)', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(45, 50%, 56.25%, 1)', 'hsla(45, 50%, 56.25%, 1)', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'hsla(45, 50%, 56.25%, 1)', 'hsla(45, 50%, 56.25%, 1)', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(45, 50%, 56.25%, 1)', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'hsla(45, 50%, 56.25%, 1)', 'hsla(45, 50%, 56.25%, 1)', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'hsla(180, 50%, 30%, 1)', 'hsla(180, 50%, 30%, 1)', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', ], }

      const encodedBoard = boardUtils.encode(board)
      const decodedBoard = boardUtils.decode(encodedBoard)

      const boardLength = JSON.stringify(board).length
      const encodedBoardLength = encodedBoard.length

      expect(encodedBoardLength).toBeLessThan(boardLength / 5)
      expect(decodedBoard).toEqual(board)
    })
  })
})
