import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/internal/Observable";
import * as Rx from "rxjs/Rx";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class WebsocketService {
  // Our socket connection
  private socket;

  constructor() {}

  connect(emit: string): Subject<MessageEvent> {
    this.socket = io("http://localhost:5001");

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observableMessage = new Observable(observer => {
      this.socket.on(emit, data => {
        console.log("Received message from Websocket Server");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observerMessage = {
      next: (data: Object) => {
        this.socket.emit(emit, JSON.stringify(data));
      }
    };
    const messageWS = Subject.create(observerMessage, observableMessage);
    // we return our Rx.Subject which is a combination
    // of both an observer and observable.

    return messageWS;
  }
}
