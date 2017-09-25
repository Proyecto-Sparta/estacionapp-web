export class Notification {

  //Tipos de notificaciones
  static driverOnTheWay: Number = 1;

  constructor(public type: Number,
              public data: Number) {
    this.type = type;
    this.data = data;
  }
}
