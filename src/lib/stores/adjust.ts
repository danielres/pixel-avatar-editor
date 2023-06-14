import type { Board } from '$lib/stores'
import { get, type Writable } from 'svelte/store'

export default (board: Writable<Board>) => {
  return {
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
  }
}

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
      if (i % cols === 0) newValues.push(values[i])
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
      if (i % cols === cols - 1) newValues.push(values[i])
    }
    $board.cols += 1
    $board.values = newValues
    return $board
  })
}

function addRowAfter(board: Writable<Board>) {
  const lastRow = get(board).values.slice(-get(board).cols)
  board.update(($board) => {
    $board.values = [...$board.values, ...lastRow]
    return $board
  })
}

function addRowBefore(board: Writable<Board>) {
  const firstRow = get(board).values.slice(0, get(board).cols)
  board.update(($board) => {
    $board.values = [...firstRow, ...$board.values]
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
