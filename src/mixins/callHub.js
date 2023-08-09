import { HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr"

class CallHub {
  constructor() {
    this.client = new HubConnectionBuilder().withUrl("https:///localhost:7216/game-room", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();
  }

  start() {
    this.client.start();
  }
}

export default new CallHub();