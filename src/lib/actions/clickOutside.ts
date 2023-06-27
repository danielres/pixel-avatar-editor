export default function (element: HTMLElement, cb: () => void) {
  function onClick(event: Event) {
    if (!element.contains(event.target as Node)) cb()
  }

  document.body.addEventListener('click', onClick)

  return {
    update: (newCb: () => void) => (cb = newCb),
    destroy: () => document.body.removeEventListener('click', onClick),
  }
}
