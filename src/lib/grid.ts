export interface Cell {
  x: number
  y: number
}

export const distance = (cell1: Cell, cell2: Cell) => {
  const x = Math.pow(cell2.x - cell1.x, 2);
  const y = Math.pow(cell2.y - cell1.y, 2);
  return Math.floor(Math.sqrt(x + y));
};

export const idToCell = (id: string) => {
  const coords = id.split(",");
  return { x: parseInt(coords[0], 10), y: parseInt(coords[1], 10) };
};