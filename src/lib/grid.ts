import { Point } from "../point"

export interface Cell {
  x: number
  y: number
}

export function distance (cell1: Cell, cell2: Cell) {
  const x = Math.pow(cell2.x - cell1.x, 2);
  const y = Math.pow(cell2.y - cell1.y, 2);
  return Math.floor(Math.sqrt(x + y));
};

export function idToCell(id: string) {
  const coords = id.split(",");
  return { x: parseInt(coords[0], 10), y: parseInt(coords[1], 10) };
}

export function tunnelBetween(start: Point, end: Point): Point[] {
  const coords: Point[] = []
  let x1 = start.x
  let y1 = start.y
  const x2 = end.x
  const y2 = end.y

  // Bresenham - https://www.redblobgames.com/grids/line-drawing.html
  const dx = x2 - x1
  const dy = y2 - y1

  let nx = Math.abs(dx)
  let ny = Math.abs(dy)
  let sign_x = dx > 0? 1 : -1
  let sign_y = dy > 0? 1 : -1

  let p: Point = new Point(x1, y1)
  coords.push(p.duplicate())
  for (let ix = 0, iy = 0; ix < nx || iy < ny;) {
      if ((0.5+ix) / nx < (0.5+iy) / ny) {
          // next step is horizontal
          p.x += sign_x;
          ix++;
      } else {
          // next step is vertical
          p.y += sign_y;
          iy++;
      }
      coords.push(p.duplicate());
  }

  return coords
}