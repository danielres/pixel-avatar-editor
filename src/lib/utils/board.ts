import type { Board } from '$lib/usePigggy'
import zlib from 'zlib'

export function encode(board: Board) {
  const jsonString = JSON.stringify(board)
  const compressedData = zlib.deflateSync(jsonString)
  const encodedString = compressedData.toString('base64')
  const urlEncodedString = encodeURIComponent(encodedString)
  return urlEncodedString
}
export function decode(encodedBoard: string): Board {
  const urlDecodedString = decodeURIComponent(encodedBoard)
  const compressedData = Buffer.from(urlDecodedString, 'base64')
  const jsonString = zlib.inflateSync(compressedData).toString()
  const decodedData = JSON.parse(jsonString)
  return decodedData
}

function doubleColumns(board: Board): Board {
  const newBoardValues = board.values.map((cell) => {
    return [cell, cell]
  })

  return { cols: board.cols * 2, values: newBoardValues.flat() }
}

function doubleRows(board: Board): Board {
  const rows = []
  const size = board.cols
  const a = board.values.slice()

  while (a.length > 0) rows.push(a.splice(0, size))

  const cells = rows
    .map((row) => [row, row])
    .flat()
    .flat()

  return { ...board, values: cells }
}

export function doubleResolution(board: Board): Board {
  return doubleColumns(doubleRows(board))
}
