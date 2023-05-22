import { writable, type Writable } from 'svelte/store'

export type BoardCell = [number, number] | []
export type BoardRow = BoardCell[]
export type Board = BoardRow[]

export type Hue = number
export type Lum = number
export type Opacity = number
export type Swatch = [Hue, Lum, Opacity?]
export type PaletteRow = Swatch[]
export type Palette = PaletteRow[]

type BoardData = { data: Board }
type NewBoardOptions = { height: number; width: number }

type Options = {
  board: BoardData | NewBoardOptions
  palette: { hues: number; lums: number; sat: number }
}

export default function (options: Options) {
  const boardStore = makeBoardStore(options.board)
  const paletteStore = makePaletteStore(options.palette)
  return { boardStore, paletteStore }
}

function makePaletteStore(options: Options['palette']): Writable<Palette> {
  return writable(makeNewPalette(options))
}

function makeNewPalette(options: Options['palette']): Palette {
  return Array.from({ length: options.hues }, (_, i) =>
    Array.from({ length: options.lums }, (_, j) => [
      Math.floor((360 / options.hues) * i),
      Math.floor((80 / (options.lums - 0.5)) * j + 20),
    ])
  )
}

function makeBoardStore(options: Options['board']): Writable<Board> {
  if ('data' in options) return writable(options.data)
  return writable(makeNewBoard(options.height, options.width))
}

function makeNewBoard(height: number, width: number): Board {
  return Array.from({ length: height }, () => {
    return Array.from({ length: width }, () => [])
  })
}
