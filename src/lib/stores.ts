import { get, writable } from 'svelte/store'
import adjust from './stores/adjust'
import getColors from './stores/getColors'
import paint from './stores/paint'
import undoable from './stores/undoable'

export type Board = { cols: number; values: string[] }
export type Tool = 'brush' | 'eraser' | 'fill' | 'adjust' | 'pipette' | 'smudge' | 'picker'
export type Stores = ReturnType<typeof makeStores>

export default function makeStores(cols: number, rows: number) {
  const getInitialValue = () => {
    const values = Array.from({ length: cols * rows }).map(() => 'none')
    return { cols, values }
  }

  const board = undoable(writable<Board>(getInitialValue()))
  const isPainting = writable<boolean>(false)
  const currentTool = writable<Tool>('brush')
  const previousTools = writable<Tool[]>(['brush'])
  const currentColor = writable<string>('none')

  return {
    adjust: adjust(board, board.snapshot),
    board: {
      ...board,
      reset() {
        board.set(getInitialValue())
        board.snapshot()
      },
    },
    currentColor,
    currentTool,
    isPainting,
    paint: (index: number) => paint(index, currentTool, currentColor, board),
    getColors,
    setCurrentColor: (nextColor: string) => currentColor.set(nextColor),
    setCurrentTool: (nextTool: Tool) => {
      previousTools.update(($previousTools) => [
        ...$previousTools.filter((i) => i !== get(currentTool)),
        get(currentTool),
      ])
      currentTool.set(nextTool)
    },
    previousTools,
    restorePreviousTool: () => {
      const previousTool = ['picker'].includes(get(currentTool))
        ? get(previousTools)
            .reverse()
            .find((t) => ['brush', 'fill'].includes(t)) ?? 'brush'
        : ['adjust'].includes(get(currentTool))
        ? get(previousTools)
            .reverse()
            .find((t) => ['brush', 'fill', 'smudge', 'eraser', 'pipette'].includes(t)) ?? 'brush'
        : 'brush'
      currentTool.set(previousTool)
    },
  }
}
