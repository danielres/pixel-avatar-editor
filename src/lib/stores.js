import { browser } from '$app/environment'
import { get, writable } from 'svelte/store'

/**
 * @typedef {[number, number]} SwatchXY
 * @typedef {{ data: import('$lib/types').Board }} BoardData
 * @typedef {{ height: number; width: number }} NewBoardOptions
 *
 * @typedef {{
 *  board: BoardData | NewBoardOptions
 *  palette: { hues: number; lums: number; sat: number }
 *  debug?: boolean
 * }} Options
 */

export default makeStores

/**
 * @param {Options} options
 * @return {*}
 */
function makeStores(options) {
  const boardStore = makeBoardStore(options.board)

  const paletteStore = makePaletteStore(options.palette)

  /** @type {import('svelte/store').Writable<SwatchXY>} */
  const currentSwatchXYStore = writable([0, 0])

  const stateStore = writable({ isUsingEraser: false, isPainting: false, isLoading: true })

  /** @type {import('svelte/store').Writable<import('$lib/types').Swatch[]>} */
  const usedColors = writable([
    // [5, 5], [5, 5], [4, 5], [4, 3], [3, 2], [2, 4], [2, 5], [1, 3], [1, 2], [3, 2], [5, 2], [5, 4], [6, 4], [5, 3], [3, 4], [3, 3],
  ])

  /**
   * @param {number} rowIndex
   * @param {number} cellIndex
   */
  function paintCell(rowIndex, cellIndex) {
    return () => {
      boardStore.update((/** @type {(SwatchXY | null)[][]} */ $boardStore) => {
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

/**
 *
 *
 * @param {Options['palette']} options
 * @return {import('svelte/store').Writable<import('$lib/types').Palette>}
 */
function makePaletteStore(options) {
  return writable(makeNewPalette(options))
}

/**
 * @param {Options['palette']} options
 * @return {import('$lib/types').Palette}
 */
function makeNewPalette(options) {
  return Array.from({ length: options.hues }, (_, i) =>
    Array.from({ length: options.lums }, (_, j) => [
      Math.floor((360 / options.hues) * i),
      Math.floor((80 / (options.lums - 0.5)) * j + 20),
    ])
  )
}

/**
 * @param {Options['board']} options
 * @return {import('svelte/store').Writable<import('$lib/types').Board>}
 */
function makeBoardStore(options) {
  if ('data' in options) return writable(options.data)
  return writable(makeNewBoard(options.height, options.width))
}

/**
 * @param {number} height
 * @param {number} width
 * @return {import('$lib/types').Board}
 */
function makeNewBoard(height, width) {
  return Array.from({ length: height }, () => {
    return Array.from({ length: width }, () => null)
  })
}
