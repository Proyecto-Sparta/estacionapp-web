import {Socket, Channel} from 'phoenix';

export class NotificationStream {

  channel: Channel;
  id: String;

  constructor(id : String, callback : any){

    let socket = new Socket("ws://localhost:4000/socket", {});
    socket.connect();

    this.id = id;
    this.channel = socket.channel(`garage:${id}`, {});

    this.channel.on("request", callback);

    this.channel.join()
      .receive("ok", resp => { console.log("Garage joined successfully") })
      .receive("error", resp => { console.log("Unable to join", resp) });
  }


  public accept(driver){
    this.channel.push(`accept:${this.id}`, { driver_name : driver });
  }

  public deny(driver){
    this.channel.push(`deny:${this.id}`, { driver_name : driver } );
  }
}
