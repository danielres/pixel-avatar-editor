import type { Board } from '$lib/stores'
import { get, type Writable } from 'svelte/store'

export default (board: Writable<Board>, onChange: () => void) => {
  return {
    addColumnBefore: () => {
      addColumnBefore(board)
      onChange()
    },
    addColumnAfter: () => {
      addColumnAfter(board)
      onChange()
    },
    removeColumnAfter: () => {
      removeColumnAfter(board)
      onChange()
    },
    removeColumnBefore: () => {
      removeColumnBefore(board)
      onChange()
    },
    addRowAfter: () => {
      addRowAfter(board)
      onChange()
    },
    addRowBefore: () => {
      addRowBefore(board)
      onChange()
    },
    removeRowAfter: () => {
      removeRowAfter(board)
      onChange()
    },
    removeRowBefore: () => {
      removeRowBefore(board)
      onChange()
    },
    moveUp: () => {
      removeRowBefore(board)
      addRowAfter(board)
      onChange()
    },
    moveDown: () => {
      removeRowAfter(board)
      addRowBefore(board)
      onChange()
    },
    moveLeft: () => {
      removeColumnBefore(board)
      addColumnAfter(board)
      onChange()
    },
    moveRight: () => {
      removeColumnAfter(board)
      addColumnBefore(board)
      onChange()
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
