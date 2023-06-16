import { derived, get, writable, type Writable } from 'svelte/store'

export default function <T>(store: Writable<T>, maxUndos = 20) {
  const history = writable<T[]>([structuredClone(get(store))])
  const index = writable<number>(0)

  return {
    ...store,
    undos: index,
    redos: derived([history, index], ([$h, $idx]) => $h.length - $idx - 1),

    snapshot() {
      if (get(history).length >= maxUndos) {
        history.update(($h) => $h.slice(1))
        index.update(($idx) => $idx - 1)
      }

      history.update(($history) => {
        const b = structuredClone(get(store))
        const idx = get(index)
        if (idx < $history.length - 1) return $history.slice(0, idx + 1).concat(b)
        return [...$history, b]
      })

      index.update(($idx) => $idx + 1)
    },

    undo() {
      index.update(($idx) => {
        if ($idx === 0) return $idx
        const val = get(history)[$idx - 1]
        store.set(structuredClone(val))
        return $idx - 1
      })
    },

    redo() {
      index.update(($idx) => {
        const h = get(history)
        if ($idx === h.length - 1) return $idx
        const val = h[$idx + 1]
        store.set(structuredClone(val))
        return $idx + 1
      })
    },
  }
}
