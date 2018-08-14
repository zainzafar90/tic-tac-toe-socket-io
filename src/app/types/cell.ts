import { Mark } from './mark';

export class Cell {
  mark: Mark;
  x: number;
  y: number;
  public constructor(y: number, x: number) {
    this.x = x;
    this.y = y;
    this.mark = Mark.NONE;
  }
}
