import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import { Subject } from "rxjs";

@Injectable()
export class ChatService {
  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect("message");
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
}
