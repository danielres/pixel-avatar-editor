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
