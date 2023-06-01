import domtoimage from 'dom-to-image'
import { get } from 'svelte/store'
import { assertString } from './asserts'

/**./asserts
 * @export
 * @param {(HTMLElement | null)} node
 * @returns {Promise<void>}
 */
export async function downloadAsPng(node) {
  if (!node) {
    console.error('downloadAsPng: No node provided')
    return
  }

  try {
    const dataUrl = await domtoimage.toPng(node)
    const dateStr = formatDate(new Date())
    downloadBase64File(dataUrl, dateStr + '.png')
  } catch (error) {
    console.error('Something went wrong...', error)
  }
}

/**
 * @export
 * @param {import('$lib/types').Stores} stores
 * @returns {Promise<void>}
 */
export async function downloadAsSvg(stores) {
  const board = get(stores.boardStore)
  const palette = get(stores.paletteStore)
  const sat = stores.paletteStore.sat

  return downloadSvgStr(boardToSvgStr(board, palette, sat))
}

/**
 *
 *
 * @param {string} svgCode
 * @param {string} [fileName='image.svg']
 * @returns {void}
 */
function downloadSvgStr(svgCode, fileName = 'image.svg') {
  const svgBlob = new Blob([svgCode], { type: 'image/svg+xml' })
  const reader = new FileReader()
  reader.onloadend = () => {
    const base64Data = reader.result
    assertString(base64Data)
    downloadBase64File(base64Data, fileName)
  }
  reader.readAsDataURL(svgBlob)
}

/**
 *
 *
 * @param {Date} date
 * @return {*}
 */
function formatDate(date) {
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}_${hour}:${minute}:${seconds}`
}

/**
 *
 *
 * @param {string} base64Data
 * @param {string} fileName
 */
function downloadBase64File(base64Data, fileName) {
  const downloadLink = document.createElement('a')
  downloadLink.href = base64Data
  downloadLink.download = fileName
  downloadLink.click()
  downloadLink.remove()
}

/**
 *
 *
 * @param {import('$lib/types').Board} board
 * @param {import('$lib/types').Palette} palette
 * @param {number} sat
 * @return {*}
 */
function boardToSvgStr(board, palette, sat) {
  let svgstr = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">`
  console.log('boardToSvgStr', board, palette, sat)

  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const swatch = cell ? palette[cell[0]][cell[1]] : null

      svgstr += `
        <rect 
          x="${cellIndex * 10}"
          y="${rowIndex * 10}"
          width="10"
          height="10"
          fill="${swatch ? `hsl(${swatch[0]} ${sat}% ${swatch[1]}%)` : 'transparent'}"
        />
      `
    })
  })

  svgstr += `</svg>`

  return svgstr
}
