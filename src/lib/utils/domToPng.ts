import domtoimage from 'dom-to-image'

async function domToPng(sourceEl: HTMLElement) {
  if (!sourceEl) throw new Error('No source element')
  const dataUrl = await domtoimage.toPng(sourceEl)
  const img = new Image()
  img.src = dataUrl
  return img
}

export default domToPng
