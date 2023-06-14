import { get, writable, type Writable } from 'svelte/store'
import adjust from './stores/adjust'

export type Board = { cols: number; values: string[] }
export type Tool = 'brush' | 'eraser' | 'fill' | 'adjust'
export type Stores = ReturnType<typeof makeStores>

export default function makeStores(cols: number, rows: number) {
  const initialValue = { cols, values: Array.from({ length: cols * rows }).map(() => 'none') }
  const board = writable<Board>(initialValue)
  const isPainting = writable<boolean>(false)
  const currentTool = writable<Tool>('brush')
  const currentColor = writable<string>('none')

  return {
    adjust: adjust(board),
    board,
    currentColor,
    isPainting,
    paint: (index: number) => paint(index, currentTool, currentColor, board),
    setCurrentColor: (nextColor: string) => setCurrentColor(nextColor, currentColor),
    setCurrentTool: (nextTool: Tool) => setCurrentTool(nextTool, currentTool),
    currentTool,
  }
}

function setCurrentTool(nextTool: Tool, currentTool: Writable<Tool>) {
  return () => currentTool.set(nextTool)
}

function setCurrentColor(nextColor: string, currentColor: Writable<string>) {
  currentColor.set(nextColor)
}

function paint(
  index: number,
  currentTool: Writable<Tool>,
  currentColor: Writable<string>,
  board: Writable<Board>
) {
  const cols = get(board).cols
  const rows = get(board).values.length / cols

  if (get(currentTool) === 'eraser') {
    board.update(($board) => {
      $board.values[index] = 'none'
      return $board
    })
    return
  }

  if (get(currentTool) === 'fill') {
    const color = get(board).values[index]
    const queue = [index]
    const visited = new Set<number>()
    while (queue.length > 0) {
      const index = queue.pop()! // eslint-disable-line @typescript-eslint/no-non-null-assertion
      visited.add(index)
      board.update(($board) => {
        $board.values[index] = get(currentColor)
        return $board
      })
      const neighbors = [index - 1, index + 1, index - cols, index + cols]
      for (const neighbor of neighbors) {
        if (neighbor < 0 || neighbor >= cols * rows) continue
        if (visited.has(neighbor)) continue
        if (get(board).values[neighbor] !== color) continue
        queue.push(neighbor)
      }
    }
    return
  }

  board.update(($board) => {
    $board.values[index] = get(currentColor)
    return $board
  })
}
