export class PendingDriver {
  constructor(public name: string,
              public plate: string,
              public waiting: boolean,
              public parkingSpace: number) {
  }
}
