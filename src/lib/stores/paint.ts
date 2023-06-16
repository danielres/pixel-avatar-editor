import { get, type Writable } from 'svelte/store'
import type { Board, Tool } from '../stores'

export default function (
  index: number,
  currentTool: Writable<Tool>,
  currentColor: Writable<string>,
  board: Writable<Board>
) {
  const cols = get(board).cols
  const rows = get(board).values.length / cols

  if (['brush', 'smudge'].includes(get(currentTool))) {
    board.update(($board) => {
      $board.values[index] = get(currentColor)
      return $board
    })
  }

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
}
