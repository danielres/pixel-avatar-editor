import { get, writable } from 'svelte/store'
import adjust from './stores/adjust'
import getColors from './stores/getColors'
import { paint } from './stores/paint'

export type Board = { cols: number; values: string[] }
export type Tool = 'brush' | 'eraser' | 'fill' | 'adjust' | 'pipette' | 'smudge' | 'picker'
export type Stores = ReturnType<typeof makeStores>

export default function makeStores(cols: number, rows: number) {
  const initialValue = () => ({
    cols,
    values: Array.from({ length: cols * rows }).map(() => 'none'),
  })
  const board = writable<Board>(initialValue())
  const isPainting = writable<boolean>(false)
  const currentTool = writable<Tool>('brush')
  const previousTools = writable<Tool[]>(['brush'])
  const currentColor = writable<string>('none')

  const historyStore = writable<Board[]>([initialValue()])
  const historyIndex = writable<number>(0)

  const history = {
    ...historyStore,
    index: historyIndex,

    append() {
      historyStore.update(($history) => {
        const b = structuredClone(get(board))
        const $historyIndex = get(historyIndex)
        if ($historyIndex < $history.length - 1) {
          return $history.slice(0, $historyIndex + 1).concat(b)
        }
        return [...$history, b]
      })

      historyIndex.update(($idx) => $idx + 1)
    },

    undo() {
      historyIndex.update(($historyIndex) => {
        if ($historyIndex === 0) return $historyIndex
        const b = get(historyStore)[$historyIndex - 1]
        board.set(structuredClone(b))
        return $historyIndex - 1
      })
    },

    redo() {
      historyIndex.update(($idx) => {
        const history = get(historyStore)
        if ($idx === history.length - 1) return $idx
        const b = history[$idx + 1]
        board.set(structuredClone(b))
        return $idx + 1
      })
    },
  }

  return {
    adjust: adjust(board, history.append),
    board: {
      ...board,
      reset: () => {
        board.set(initialValue())
        history.append()
      },
      history,
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
