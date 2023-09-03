import { HubConnectionBuilder, HttpTransportType } from "@aspnet/signalr"

class CallHub {
  constructor() {
    this.client = new HubConnectionBuilder().withUrl(process.env.VUE_APP_WEBSOCKET_URL, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();
  }

  async start() {
    await this.client.start();
  }

  async stop() {
    await this.client.stop();
  }
}

export default new CallHub();