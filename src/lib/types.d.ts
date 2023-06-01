
export type BoardCell = SwatchXY | null
export type BoardRow = BoardCell[]
export type Board = BoardRow[]

export type Hue = number
export type Lum = number
export type Opacity = number
export type Swatch = [Hue, Lum, Opacity?]
export type PaletteRow = Swatch[]
export type Palette = PaletteRow[]

export type BoardStore = ReturnType<typeof makeStores>['boardStore']
export type PaletteStore = ReturnType<typeof makeStores>['paletteStore']
export type StateStore = ReturnType<typeof makeStores>['stateStore']
export type Stores = ReturnType<typeof makeStores>
