import domtoimage from 'dom-to-image'

export async function downloadAsPng(node: HTMLElement | null) {
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

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}_${hour}:${minute}:${seconds}`
}

function downloadBase64File(base64Data: string, fileName: string) {
  const downloadLink = document.createElement('a')
  downloadLink.href = base64Data
  downloadLink.download = fileName
  downloadLink.click()
  downloadLink.remove()
}
