import {Socket, Channel} from 'phoenix';

export class PhoenixSocket {

  channel: Channel;
  id: String;

  constructor(){
    let socket = new Socket("ws://localhost:4000/socket", {});
    socket.connect();

    this.channel = socket.channel("garage:123", {});

    this.channel.on("request", (payload) => {
      this.channel.push("accept:" + payload.driver_name);
    });

    this.channel.join()
      .receive("ok", resp => { console.log("Garage joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) });
  }

}
