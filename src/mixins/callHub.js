import { HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr"
import Store from '@/state/index'

class CallHub {
  constructor() {
    this.client = new HubConnectionBuilder().withUrl("https:///localhost:7216/game-room", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => {
        return Store.getters.getUserId;
      }
    }).build();
  }

  start() {
    this.client.start();
  }
}

export default new CallHub();