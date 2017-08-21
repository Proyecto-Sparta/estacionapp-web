export class ParkingSpace {


  constructor(public shape : string,
              public x: number,
              public y: number,
              public width: number,
              public height: number,
              public angle: number) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }

  updatePosition(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

}
