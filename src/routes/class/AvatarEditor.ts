import { writable, type Writable } from 'svelte/store'

type Color = string

interface PixelArt {
  grid: Color[][][]
}
const SIZE = 16

export class AvatarEditor {
  layers: Color[][][]
  activeLayer: number
  currentColor: Color
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  isDrawing: boolean
  pixelArtStore: Writable<PixelArt>

  constructor(canvas: HTMLCanvasElement) {
    this.layers = [Array.from({ length: SIZE }, () => new Array<Color>(SIZE).fill('#eee'))]
    this.activeLayer = 0
    this.currentColor = '#000000'
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.pixelArtStore = writable(this.getPixelArt())
    this.isDrawing = false
    this.drawGrid()
    this.attachEvents()
  }

  createLayer() {
    this.layers.push(Array.from({ length: SIZE }, () => new Array<Color>(SIZE).fill('#eeeeee66')))
    this.activeLayer = this.layers.length - 1
    this.drawGrid()
  }

  switchLayer(index: number) {
    this.activeLayer = index
    this.drawGrid()
  }

  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (let l = 0; l < this.layers.length; l++) {
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (this.layers[l][i][j] !== '#FFFFFF') {
            this.ctx.fillStyle = this.layers[l][i][j]
            this.ctx.fillRect(i * 10, j * 10, 10, 10)
          }
        }
      }
    }
    this.pixelArtStore.set(this.getPixelArt())
  }

  attachEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDrawing = true
      const x = Math.floor(e.offsetX / 10)
      const y = Math.floor(e.offsetY / 10)
      this.layers[this.activeLayer][x][y] = this.currentColor
      this.drawGrid()
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing) return
      const x = Math.floor(e.offsetX / 10)
      const y = Math.floor(e.offsetY / 10)
      this.layers[this.activeLayer][x][y] = this.currentColor
      this.drawGrid()
    })

    this.canvas.addEventListener('mouseup', () => {
      this.isDrawing = false
    })

    const colorButtons = document.querySelectorAll('.color-btn') as NodeListOf<HTMLButtonElement>
    colorButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.currentColor = btn.style.backgroundColor
      })
    })

    const layerButtons = document.querySelectorAll('.layer-btn') as NodeListOf<HTMLButtonElement>
    layerButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.switchLayer(index)
      })
    })

    document.querySelector('#new-layer-btn')?.addEventListener('click', () => {
      this.createLayer()
    })
  }

  getPixelArt(): PixelArt {
    return { grid: this.layers }
  }

  getPixelArtStore(): Writable<PixelArt> {
    return this.pixelArtStore
  }
}
