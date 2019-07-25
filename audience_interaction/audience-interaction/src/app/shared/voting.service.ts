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
  //we pass the data when someone votes
  messageVote(messageId) {
    this.messages.next(messageId);
  }
}
