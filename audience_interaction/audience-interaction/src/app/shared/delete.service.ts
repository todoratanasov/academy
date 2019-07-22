import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";
import { Subject } from "rxjs";

@Injectable()
export class DeleteService {
  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect("delete");
  }

  deleteMsg(msg) {
    this.messages.next(msg);
  }
}
