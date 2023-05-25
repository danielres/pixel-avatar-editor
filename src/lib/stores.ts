import { browser } from '$app/environment'
import { get, writable, type Writable } from 'svelte/store'

export type BoardCell = SwatchXY | null
export type BoardRow = BoardCell[]
export type Board = BoardRow[]

export type Hue = number
export type Lum = number
export type Opacity = number
export type Swatch = [Hue, Lum, Opacity?]
export type PaletteRow = Swatch[]
export type Palette = PaletteRow[]
type SwatchXY = [number, number]

export type BoardStore = ReturnType<typeof makeStores>['boardStore']
export type PaletteStore = ReturnType<typeof makeStores>['paletteStore']
export type StateStore = ReturnType<typeof makeStores>['stateStore']
export type Stores = ReturnType<typeof makeStores>

type BoardData = { data: Board }
type NewBoardOptions = { height: number; width: number }

type Options = {
  board: BoardData | NewBoardOptions
  palette: { hues: number; lums: number; sat: number }
  debug?: boolean
}

export default makeStores

function makeStores(options: Options) {
  const boardStore = makeBoardStore(options.board)
  const paletteStore = makePaletteStore(options.palette)
  const currentSwatchXYStore = writable<SwatchXY>([0, 0])
  const stateStore = writable({ isUsingEraser: false, isPainting: false })
  const usedColors = writable<Swatch[]>([
    // [5, 5], [5, 5], [4, 5], [4, 3], [3, 2], [2, 4], [2, 5], [1, 3], [1, 2], [3, 2], [5, 2], [5, 4], [6, 4], [5, 3], [3, 4], [3, 3],
  ])

  function paintCell(rowIndex: number, cellIndex: number) {
    return () => {
      boardStore.update(($boardStore) => {
        $boardStore[rowIndex][cellIndex] = get(stateStore).isUsingEraser
          ? null
          : get(currentSwatchXYStore)
        return $boardStore
      })
    }
  }

  stateStore.subscribe(($stateStore) => {
    if (!browser) return
    $stateStore.isPainting
      ? document.body.classList.add('is-painting')
      : document.body.classList.remove('is-painting')
  })

  return {
    debug: options.debug ?? false,
    boardStore,
    paletteStore: {
      ...paletteStore,
      sat: options.palette.sat,
      currentSwatchXYStore,
      usedColors,
    },
    stateStore,
    paintCell,
  }
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
    return Array.from({ length: width }, () => null)
  })
}
