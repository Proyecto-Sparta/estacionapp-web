import {Socket, Channel} from 'phoenix';
import {Component} from '@angular/core';
import {NotificationsService} from "../notifications/notifications.service";

@Component({
  selector: 'channel-driver-mock',
  template: `<button (click)="joinGarage()" id="driver-mock">Add driver</button>`,
})
export class ChannelDriverMockComponent {

  channel: Channel;
  id: String;


  constructor(private notificationsService : NotificationsService){

  }

  joinGarage() {

    this.id = '666';

    let socket = new Socket("ws://localhost:4000/socket", {});
    socket.connect();

    this.channel = socket.channel("garage:123", {driver_name: this.id});

    this.channel.on("accept:" + this.id, payload => {
      console.log("aceptado " + this.id);
    });

    this.channel.join()
      .receive("ok", resp => {
        console.log(`Driver ${this.id} joined successfully`, resp);
        this.notificationsService.pushNotification(this.id); // TODO this should be in notifications service
      })
      .receive("error", resp => {
        console.log("Unable to join", resp)
      })
  }
}
