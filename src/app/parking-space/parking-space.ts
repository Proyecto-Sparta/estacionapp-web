export class ParkingSpace {

  constructor(public shape: string,
              public x: number,
              public y: number,
              public width: number,
              public height: number,
              public angle: number,
              public occupied: boolean = false) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.occupied = occupied;
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toggleOccupancy() {
    this.occupied = !this.occupied;
  }

  applyScale(scale) {
    this.x = this.x * scale;
    this.y = this.y * scale;
    this.height = this.height * scale;
    this.width = this.width * scale;

    return this;
  }
}
