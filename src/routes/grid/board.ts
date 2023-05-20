import { grouper } from '$lib/utils/array'

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
    .replaceAll('xxxx', 'y')
    .replaceAll('xx', 'z')
    .replaceAll('5555', 'c')
    .replaceAll('0000', 'a')
    .replaceAll('00', 'b')
    .replaceAll('yyyy', 'D')
    .replaceAll('DDD', 'G')

  return numCols + '_' + stringified
}

export function decode(str: string): Board {
  const [numCols, s] = str.split('_')
  const expanded = s
    .replaceAll('G', 'DDD')
    .replaceAll('D', 'yyyy')
    .replaceAll('b', '00')
    .replaceAll('a', '0000')
    .replaceAll('c', '5555')
    .replaceAll('z', 'xx')
    .replaceAll('y', 'xxxx')
    .replaceAll('x', 'xx')
  const split = expanded.split('')
  const cells = grouper(split, 2)
  const cleanedCells = cells.map((tuple) =>
    tuple[0] === 'x' ? [] : tuple.map((t) => parseInt(t, 10))
  ) as Cell[]
  const board = grouper(cleanedCells, parseInt(numCols, 10))
  return board
}
