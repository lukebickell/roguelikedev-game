export const GridDimensions: { width: number, height: number } = {
  width: 48,
  height: 28
}

export const TilePixelSize: { width: number, height: number } = {
  width: 32,
  height: 32
}

export const CanvasSize: { width: number, height: number } = {
  width: GridDimensions.width * TilePixelSize.width,
  height: GridDimensions.height * TilePixelSize.height
}