export class Point {
  constructor(public x: number,
              public y: number) {
    this.x = x;
    this.y = y;
  }

  applyScale(scale) {
    return new Point(this.x * scale, this.y * scale);
  }
}
