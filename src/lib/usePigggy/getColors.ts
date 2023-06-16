import { derived, writable } from 'svelte/store'

export default function (hues = 8, lums = 8, lumPad = 30) {
  const hue = (i: number) => getHue(i, lums, hues)
  const lum = (i: number) => getLum(i, lums, hues, lumPad)

  const sat = writable(50)
  const op = writable(100)

  const values = derived([sat, op], ([$sat, $op]) =>
    Array.from({ length: lums * hues }).map((_, i) => {
      return `hsla(${hue(i)}, ${$sat}%, ${lum(i)}%, ${$op / 100})`
    })
  )

  return { sat, op, values }
}

function getHue(i: number, lums: number, hues: number) {
  return (Math.floor(i / lums) * 360) / hues
}

function getLum(i: number, lums: number, hues: number, lumPad: number) {
  return lumPad + ((100 - lumPad) / lums) * (i % hues)
}
