import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import { Subject } from "rxjs";

@Injectable()
export class VotingService {
  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect("vote");
  }

  messageVote(messageId) {
    this.messages.next(messageId);
  }
}
