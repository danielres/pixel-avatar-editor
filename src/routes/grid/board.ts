import { grouper } from '$lib/utils/array'
import {
  compressToEncodedURIComponent as lzcompress,
  decompressFromEncodedURIComponent as lzdecompress,
} from 'lz-string'

export type Cell = [number, number] | []
export type Row = Cell[]
export type Board = Row[]

export function makeBoard(height: number, width = height): Board {
  return Array.from({ length: height }, () => {
    return Array.from({ length: width }, () => [])
  })
}

export function encode(board: Board, numCols: number) {
  const stringified = board
    .map((row) => row.map((cell) => (cell.length ? cell : 'x')))
    .flat(2)
    .join('')

  return lzcompress(numCols + '_' + stringified)
}

export function decode(encoded: string): Board {
  const [numCols, str] = lzdecompress(encoded).split('_')
  const expanded = str.replaceAll('x', 'xx')

  const chars = expanded.split('')
  const cells = grouper(chars, 2)
  const cleanedCells = cells.map((cell) =>
    cell[0] === 'x' ? [] : cell.map((t) => parseInt(t, 10))
  ) as Cell[]
  const board = grouper(cleanedCells, parseInt(numCols, 10))
  return board
}
