import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class MessengerGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage("messageToServer")
  handleMessage(client: Socket, payload: string): void {
    this.server.emit("messageToClient", payload);
  }
}
