import { get, writable, type Writable } from 'svelte/store'

type Board = { cols: number; values: string[] }
export type Tool = 'brush' | 'eraser' | 'fill' | 'adjust'

export default function makeStores(cols: number, rows: number) {
  const initialValue = { cols, values: Array.from({ length: cols * rows }).map(() => 'none') }
  const board = writable<Board>(initialValue)
  const isPainting = writable<boolean>(false)
  const tool = writable<Tool>('brush')
  const currentColor = writable<string>('red')

  return {
    adjust: {
      addColumnBefore: () => addColumnBefore(board),
      addColumnAfter: () => addColumnAfter(board),
      removeColumnAfter: () => removeColumnAfter(board),
      removeColumnBefore: () => removeColumnBefore(board),
      addRowAfter: () => addRowAfter(board),
      addRowBefore: () => addRowBefore(board),
      removeRowAfter: () => removeRowAfter(board),
      removeRowBefore: () => removeRowBefore(board),
      moveUp: () => {
        removeRowBefore(board)
        addRowAfter(board)
      },
      moveDown: () => {
        removeRowAfter(board)
        addRowBefore(board)
      },
      moveLeft: () => {
        removeColumnBefore(board)
        addColumnAfter(board)
      },
      moveRight: () => {
        removeColumnAfter(board)
        addColumnBefore(board)
      },
    },
    board,
    isPainting,
    paint: (index: number) => paint(index, tool, currentColor, board),
    setCurrentColor: (nextColor: string) => setCurrentColor(nextColor, currentColor),
    setTool: (nextTool: Tool) => setTool(nextTool, tool),
    tool,
  }
}

//prettier-ignore
function removeColumnBefore(board: Writable<Board>) {
  board.update(($board) => {
    const { cols, values } = $board
    const newValues = []
    for (let i = 0; i < values.length; i++) {
      if (i % cols === 0) continue
      newValues.push(values[i])
    }
    $board.cols -= 1
    $board.values = newValues
    return $board
  })
}

function removeColumnAfter(board: Writable<Board>) {
  board.update(($board) => {
    const { cols, values } = $board
    const newValues = []
    for (let i = 0; i < values.length; i++) {
      if (i % cols === cols - 1) continue
      newValues.push(values[i])
    }
    $board.cols -= 1
    $board.values = newValues
    return $board
  })
}

function addColumnBefore(board: Writable<Board>) {
  board.update(($board) => {
    const { cols, values } = $board
    const newValues = []
    for (let i = 0; i < values.length; i++) {
      if (i % cols === 0) newValues.push('none')
      newValues.push(values[i])
    }
    $board.cols += 1
    $board.values = newValues
    return $board
  })
}

function addColumnAfter(board: Writable<Board>) {
  board.update(($board) => {
    const { cols, values } = $board
    const newValues = []
    for (let i = 0; i < values.length; i++) {
      newValues.push(values[i])
      if (i % cols === cols - 1) newValues.push('none')
    }
    $board.cols += 1
    $board.values = newValues
    return $board
  })
}

function setTool(nextTool: Tool, tool: Writable<Tool>) {
  return () => tool.set(nextTool)
}

function setCurrentColor(nextColor: string, currentColor: Writable<string>) {
  return () => currentColor.set(nextColor)
}

function addRowAfter(board: Writable<Board>) {
  board.update(($board) => {
    $board.values = [...$board.values, ...Array.from({ length: $board.cols }).map(() => 'none')]
    return $board
  })
}

function addRowBefore(board: Writable<Board>) {
  board.update(($board) => {
    $board.values = [...Array.from({ length: $board.cols }).map(() => 'none'), ...$board.values]
    return $board
  })
}

function removeRowAfter(board: Writable<Board>) {
  board.update(($board) => {
    $board.values = $board.values.slice(0, $board.values.length - $board.cols)
    return $board
  })
}

function removeRowBefore(board: Writable<Board>) {
  board.update(($board) => {
    $board.values = $board.values.slice($board.cols)
    return $board
  })
}

function paint(
  index: number,
  tool: Writable<Tool>,
  currentColor: Writable<string>,
  board: Writable<Board>
) {
  const cols = get(board).cols
  const rows = get(board).values.length / cols

  if (get(tool) === 'eraser') {
    board.update(($board) => {
      $board.values[index] = 'none'
      return $board
    })
    return
  }

  if (get(tool) === 'fill') {
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
